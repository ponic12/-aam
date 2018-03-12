import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';

import { Client } from '../share/client';
import { Movement } from '../share/movement';
import { Detail } from '../share/detail';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
    clientList: Observable<any[]> = null;
    clients: FirebaseListObservable<Client[]> = null;
    client: FirebaseObjectObservable<Client> = null;
    movements: FirebaseListObservable<Movement[]> = null;
    movement: FirebaseObjectObservable<Movement> = null;  
    details: FirebaseListObservable<Detail[]> = null;
    detail: FirebaseObjectObservable<Detail> = null; 
    sales: Observable<any[]> = null;
    sale: FirebaseObjectObservable<Movement> = null;
    
    constructor(private db:AngularFireDatabase){
    }
    
    //////////////////////
    // CLIENTs Interface
    //////////////////////
    getClients(q):FirebaseListObservable<Client[]>{
        this.clients  = this.db.list('clients',{query:q});
        return this.clients;
    }
    
    getFullClients(q):Observable<any[]>{
       this.sales = this.db.list('/movements')
            .map((moves) => {
                return moves.map(m => {
                    this.db.object('/clients/' + m.idClient)
                    .subscribe(c =>{
                        m.fullName = c.lastName + ', ' + c.firstName;
                    });
                    return m;
                });
            });
        return this.sales;
        // this.clientList = this.db.list('/clients')
        //     .map((clis) => {
        //         return clis.map(c => {
        //             c.fullName = c.lastName + ', ' + c.firstName;
        //             console.log('c:',c);
        //             return c;
        //         });
        //     });
        // return this.clientList;
    }
    
    getClient(key:string): FirebaseObjectObservable<Client>{
        const cliPath = 'clients/$(key)';
        this.client = this.db.object(cliPath);
        return this.client;
    }

    addClient(cli:Client):void{
        this.clients.push(cli)
        .catch(error=>this.handleError(error));
    }
    
    updateClient(cli:Client):void {
        this.clients.update(cli.$key,cli)
        .catch(error=>this.handleError(error));
    }
    
    deleteClient(o:Client):void {
        this.clients.remove(o.$key)
        .catch(error=>this.handleError(error));
    }
    
    deleteAll():void {
        this.clients.remove()
        .catch(error=>this.handleError(error));
    }
    //////////////////////////////////////////////////
    
    
    /////////////////////
    // Movement Interface
    /////////////////////
    getMovementsByCli(q):FirebaseListObservable<Movement[]>{
        this.movements = this.db.list('movements',{query:q});
        return this.movements;
    }
    
    getMovSaleByDay(q):Observable<any[]>{
        this.sales = this.db.list('/movements')
            .map((moves) => {
                return moves.map(m => {
                    this.db.object('/clients/' + m.idClient)
                    .subscribe(c =>{
                        m.fullName = c.lastName + ', ' + c.firstName;
                    });
                    return m;
                });
            });
        return this.sales;
    }
    
    
    addMovement(mov:Movement):void{
        const col = this.db.list('/movements');
        col.push(mov)
        .catch(error=>this.handleError(error));
    }
    updateMovement(o:Movement):void {
        this.movements.update(o.$key, o)
        .catch(error=>this.handleError(error));
    }
    deleteMovement(o:Movement):void {
        //const obj = this.db.object('movements/'+mov.$key);
        this.movements.remove(o.$key)
        .catch(error=>this.handleError(error));
    }
    /////////////////////////////////////////////
   
    //////////////////////
    // DETAILs Interface
    //////////////////////
    getDetailsByMov(q):FirebaseListObservable<Detail[]>{
        this.details = this.db.list('details',{query:q});
        return this.details;
    }
    
    getDetailsByMovId(key:string): FirebaseListObservable<Detail[]>{
        this.details = this.db.list('movements/'+key+'/details');
        return this.details;
    }

    addDetail(d:Detail):void{
        this.details.push(d)
        .catch(error=>this.handleError(error));
    }
    
    updateDetail(d:Detail):void {
        this.details.update(d.$key, d)
        .catch(error=>this.handleError(error));
    }
    
    deleteDetail(d:Detail):void {
        this.details.remove(d.$key)
        .catch(error=>this.handleError(error));
    }
    /////////////////////////////////////////////////
    
    
    //////////////////////
    // Reports Interface
    //////////////////////
    getReportDebts(q):FirebaseListObservable<Client[]>{
        var x = this.db.list('clients',{query:q});
        return x;
    }
    
    
    handleError(error):void {
        console.log('Error: ',error);
    }
}

