import {Quid, QuidCollection} from './Quid'
class Fixture extends Quid{
    tx : number;
    ty: number;
    tz: number
    constructor(id,name, relationships, tx, ty, tz){
        super(id,name, relationships, tx, ty, tz)
     }
    sharedMethod(){

    }

}

export default Fixture;