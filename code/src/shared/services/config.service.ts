import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {
    private configRef: AngularFirestoreDocument<any>; 
    config: Observable<any>; 
    
    constructor(private afs:AngularFirestore ){
        this.configRef = this.afs.doc<any>('config/settings');
        this.config = this.configRef.valueChanges();
    }
    
    updateConfig(s){
        this.configRef.update(s)
        .then(function() {
            console.log("Update config ok");
        })
        .catch(function(error) {
            console.error("Error Updating config: ", error);
        });
    }
    
    handleError(error):void {
        console.log('Error: ',error);
    }
}

