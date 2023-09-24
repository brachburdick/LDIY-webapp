//quid roughly means "thing" or "what"
//didn't know what else to call this

import { initGenerator } from "@webpack-cli/generators";
import { number } from "prop-types";
import internal from "stream";
interface QuidConstructor {
    new (arg1: Quid | number, arg2?: string): Quid;
    createInstance(source: Quid): Quid;
  }

export class Quid{
    id:string;
    name:string;
    relationships: null | { [key: string]: string[] } = null;
    tx: number;
    ty: number;
    tz: number;

    constructor(id:string, name:string, relationships: { [key: string]: string[]},tx: number =0, ty:number=0, tz: number =0) {
          this.id = id;
          this.name = name;
          this.relationships = relationships;
          this.tx = tx;
          this.ty = ty;
          this.tz = tz;
    }
    // static createInstance(source: Quid): Quid {
    //     return new this(source);
    //   }
    
    //   setName(newName: string): Quid {
    //     const newQuid = (this.constructor as QuidConstructor).createInstance(this);
    //     newQuid.name = newName;
    //     return newQuid;
    //   }
      
    // move(newTx:number|null = null, newTy:number|null = null, newTz:number|null = null):Quid {
    //     let updatedQuid = (this.constructor as QuidConstructor).createInstance(this);
    //     updatedQuid.tx = newTx;
    //     updatedQuid.ty = newTy;
    //     updatedQuid.tz = newTz;
    //     return updatedQuid;
    // }


    relate(){

    }
}



type QuidDictionary<T> = null | { [key: string]: T };



export class QuidCollection<T extends Quid>{
    byId: QuidDictionary<T> = null
    //This is unconventional for TS but I want to allow for future, unforseen categories; so I am generalizing quidCollection category
    //category is a constructor which will return an instance of type T
    category: new (id:string, name:string, relationships: { [key: string]: string[]},tx: number, ty:number, tz: number) => T ;
    allIds:null | string[] = null;
    quantity: number;
    tx: number;
    ty: number;
    tz: number;
    
    //instantiating a new collection requires a class and an optional quidDictionary
    constructor( 
        categoryClass: new (id:string, name:string, relationships: { [key: string]: string[]},tx: number, ty:number, tz: number) => T,
         byId:QuidDictionary<T> ){
        this.category = categoryClass;
        this.byId = byId;
        const idArr: string[] = [];
        let txAvg: number = 0;
        let tyAvg: number = 0;
        let tzAvg: number = 0;
        for(let each in byId){
            idArr.push(each);
            txAvg += byId[each].tx;
            tyAvg += byId[each].ty;
            tzAvg += byId[each].tz;
        }
    
        this.allIds = idArr;
        this.quantity = idArr.length;
        if (this.quantity>0){
            txAvg = txAvg/this.quantity;
            tyAvg = tyAvg/this.quantity;
            tzAvg = tzAvg/this.quantity;
        }
        this.tx = txAvg;
        this.ty = tyAvg;
        this.tz = tzAvg;
        
    }

    // I want functionality outside of the context of redux,
    // so I'll be defining methods carefully
    // to ensure data immutability

    // add(quids: T[]): QuidCollection<T> {

    //     const newById = { ...this.byId };
    //     const newAllIds = [...(this.allIds || [])];

    //     for (let quid of quids) {
    //         newById[quid.id] = quid;
    //         newAllIds.push(quid.id);
    //     }

    //     const updatedQC = new QuidCollection(this.category);
    //     updatedQC.byId = newById;
    //     updatedQC.allIds = newAllIds;
    //     updatedQC.quantity = Object.keys(newById).length;

    //     return updatedQC;
    //   }



    //   remove(quids: T[]): QuidCollection<T> {

    //     const newById = { ...this.byId };
    //     const newAllIds = [...(this.allIds || [])];

    //     for (let quid of quids) {
            
    //         delete newById[quid.id]
    //         const index = newAllIds.indexOf(quid.id);
    //         newAllIds.splice(index, 1);
    //     }

    //     const updatedQC = new QuidCollection(this.category);
    //     updatedQC.byId = newById;
    //     updatedQC.allIds = newAllIds;
    //     updatedQC.quantity = Object.keys(newById).length;

    //     return updatedQC;
    //   }


}