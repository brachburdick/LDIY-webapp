import {Quid, QuidCollection} from './Quid'
class Group extends Quid{
    constructor(id,name, relationships, tx, ty, tz){
        super(id,name, relationships, tx, ty, tz)
     }
    sharedMethod(){

    }

}

export default Group;