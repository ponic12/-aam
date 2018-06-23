import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GlobalService {
    private vars: any = {};

    constructor(private storage: Storage) {
        console.log("GlobalService constructor ");
    }


    async get(alias: string, def?: any,bs?:boolean) {
        var x = this.vars[alias];
        if (x&&x.value) 
            return this.vars[alias].value;

        var elem = await this.storage.get(alias);
        if (elem) 
            return this.processVal(alias, elem.value, elem.bs);
        else 
            return this.processVal(alias, def, bs);
    }

    private processVal(key,v,bs){
        var x:any;
        if (bs == true)
            x = new BehaviorSubject<any>(v);
        else
            x = v;
        this.set(key, x);
        return x;
    }

    getVar(alias){
        return this.vars[alias] ? this.vars[alias].value : "" ;
    }
    set(alias: string, v: any): void {
        var x = { value: v};
        this.vars[alias] = x;
    }
    save(alias: string, v: any): void {
        this.set(alias, v);
        var x = { value: v};
        this.storage.set(alias, x);
    }
    saveBS(alias: string, v: any, bs?:boolean): void {
        var x = { value: v, bs:bs };
        this.storage.set(alias, x);
    }
    // clearChildren(alias: string) {
    //     Object.keys(this.vars).forEach(key => {
    //         if (this.vars[key].parent == alias){
    //             delete this.vars[key];
    //             this.storage.remove(key);
    //         }
    //     });
    // }
}