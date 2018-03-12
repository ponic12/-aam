import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Client } from '../share/entities/client';
import { Movement } from '../share/entities/movement';
import { Detail } from '../share/entities/detail';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
    clientsRef: AngularFirestoreCollection<Client>;
    clients$: Observable<any[]>;
    
    movementsRef: AngularFirestoreCollection<Movement>;
    movements$: Observable<any[]>;
    
    detailsRef: AngularFirestoreCollection<Detail>;
    details$: Observable<any[]>;
    
    movCliRef: AngularFirestoreDocument<Client>;
    movCli:Observable<Client>;
    
    sales$: Observable<any[]>;
    
    constructor(private afs:AngularFirestore){
    }
    
    //////////////////////
    // CLIENTs Interface
    //////////////////////
    
    getClients(sortName, sortDir):Observable<any[]>{
        this.clientsRef = this.afs.collection<Client>('clients',
            ref => ref.orderBy(sortName, sortDir));
        this.clients$ = this.clientsRef.snapshotChanges()
        .map(actions => {
            return actions.map(action => {
                const d = action.payload.doc;
                const item = d.data();
                item.id = d.id;
                item.fullName = item.lastName + ', ' + item.firstName;
                return item;
            });
        });
        return this.clients$;
    }
    
    getClientsAccounts(sortName, sortDir):Observable<any[]>{
        this.clientsRef = this.afs.collection<Client>('clients',
            ref => ref.where('balance','<',0).orderBy('balance').orderBy(sortName, sortDir));
        this.clients$ = this.clientsRef.snapshotChanges()
        .map(actions => {
            return actions.map(action => {
                const d = action.payload.doc;
                const item = d.data();
                item.id = d.id;
                return item;
            });
        });
        return this.clients$;
    }

    getSalesByDate(day:number, sortName, sortDir):Observable<any[]>{
        // extraer hora de day y filtrar
        this.movementsRef = this.afs.collection<Movement>('/movements',
            ref => ref.orderBy(sortName, sortDir));
            // ref => ref.where('datetime', '>', day).orderBy(sortName, sortDir));
        this.sales$ = this.movementsRef.snapshotChanges()
        .map(actions => {
            return actions.map(action => {
                const d = action.payload.doc;
                const mov = d.data();
                mov.id = d.id;
                this.movCliRef = this.afs.doc<Client>('/clients/'+mov.idClient);
                this.movCli = this.movCliRef.valueChanges();
                this.movCli.subscribe(x => {
                    mov.fullName = x.lastName + ', ' + x.firstName;
                });
                return mov;
            }); 
        });
        return this.sales$;
    }

    addClient(o:Client):void{
        this.clientsRef.add({...o})
        .then(function(docRef) {
            console.log("New Client ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error Adding Client: ", error);
        });
    }
    
    updateClient(o):void {
        var u = this.clientsRef.doc(o.id);
        u.update(o)
        .then(function() {
            console.log("Update client ok");
        })
        .catch(function(error) {
            console.error("Error Updating client: ", error);
        });
    }
    
    deleteClient(o):void {
        this.clientsRef.doc(o.id).delete()
        .then(function() {
            console.log("Delete client ok");
        })
        .catch(function(error) {
            console.error("Error Deleting client: ", error);
        });
    }
    
    
    // /////////////////////
    // // Movement Interface
    // /////////////////////
    getMovsByCli(cliId:string, sortName, sortDir):Observable<any[]>{
        // afs.collection('items', ref => {
        //     let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        //     if (size) { query = query.where('size', '==', size) };
        //     if (color) { query = query.where('color', '==', color) };
        //     return query;
        //   }).valueChanges()
          
        this.movementsRef = this.afs.collection<Movement>('movements', 
            ref => ref.where('idClient', '==', cliId).orderBy(sortName, sortDir));
        this.movements$ = this.movementsRef.snapshotChanges()
        .map(actions => {
            return actions.map(action => {
                const d = action.payload.doc;
                const item = d.data();
                item.id = d.id;
                return item;
            });
        });
        return this.movements$;
    }
    
    addMovement(o:Movement):Promise<any>{
        return this.movementsRef.add({...o});
    }
    
    updateMovement(o):void {
        var u = this.afs.doc<Movement>('movements/'+o.id);
        u.update(Object.assign({}, o))
        .then(function() {
            console.log("Update mov ok");
        })
        .catch(function(error) {
            console.error("Error Updating mov: ", error);
        });
    }
    
    deleteMovement(o):void {
        this.movementsRef.doc(o.id).delete()
        .then(function() {
            console.log("Delete mov ok");
        })
        .catch(function(error) {
            console.error("Error Deleting mov: ", error);
        });
    }
    
    // /////////////////////////////////////////////
   
    // //////////////////////
    // // DETAILs Interface
    // //////////////////////
    getDetailsByMov(mov:Movement):Observable<any[]>{
        this.detailsRef = this.afs.collection<Detail>('movements/'+mov.id+'/details');
        this.details$ = this.detailsRef.snapshotChanges()
        .map(actions => {
            return actions.map(action => {
                const d = action.payload.doc;
                const item = d.data();
                item.id = d.id;
                return item;
            });
        });
        return this.details$;
    }

    addDetail(m,d):void{
        this.detailsRef = this.afs.collection<Detail>('movements/'+m.id+'/details');
        this.detailsRef.add({...d})
        .then(function(docRef) {
            console.log("New Det. ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error Adding det: ", error);
        });
    }
    
    updateDetail(m,d):void {
        this.detailsRef = this.afs.collection<Detail>('movements/'+m.id+'/details');
        var u = this.detailsRef.doc(d.id);
        u.update(d)
        .then(function() {
            console.log("Update det ok");
        })
        .catch(function(error) {
            console.error("Error Updating det: ", error);
        });
    }
    
    deleteDetail(o):void {
        this.detailsRef.doc(o.id).delete()
        .then(function() {
            console.log("Delete det ok");
        })
        .catch(function(error) {
            console.error("Error Deleting det: ", error);
        });
    }
    // /////////////////////////////////////////////////
    
    
    // //////////////////////
    // // Reports Interface
    // //////////////////////
    getSalesByMonth():any[]{
      //  const arr = [
      //    {month:1,total:25000},
      //    {month:2,total:36000},
      //    {month:3,total:35000},
      //    {month:4,total:45000},
      //    {month:5,total:35000},
      //    {month:6,total:25000},
      //    {month:7,total:20000},
      //    {month:8,total:25000},
      //  ];
      const arr = [];
      const today = new Date();
      for (var i = 1; i<20; i++){
         var d = this.addDays(today,i);
         var t = d.getTime();
         var v = Math.floor(Math.random() * 50000)+5000;
         var o = {datetime:t, total:v};
         arr.push(o);
      }
      return arr;
    }
    
    handleError(error):void {
        console.log('Error: ',error);
    }
    
   addDays(d, days):Date {
     var dat = d; //new Date(d);
     dat.setDate(dat.getDate() + days);
     return dat;
   }
}

