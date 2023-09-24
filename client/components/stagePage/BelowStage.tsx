//import { json } from 'express';
import React from 'react';
import {useSelector} from 'react-redux';
import { QuidCollection } from '../../models/Quid';
import {initialState} from '../../redux/reducers/stageReducer'
const BelowStage = () => {
const state:any= useSelector((state)=> state);
console.log(state, Object.keys(state))
const projectors:any = state.stage.projectors.byId;
const groups:any = state.stage.groups.byId;
const fixtures:any = state.stage.fixtures.byId;
const pList = [];
const fList = [];
const gList = [];

for (let each in projectors){

  pList.push(<div>{JSON.stringify(projectors[each])}</div>)
}
for (let each in fixtures){
  fList.push(<div>{JSON.stringify(fixtures[each])}</div>)
}
for (let each in groups){
  gList.push(<div>{JSON.stringify(groups[each])}</div>)
}

    return (    
    <div id = 'belowstage'>THIS IS BELOW STAGE
      {pList}
      {gList}
      {fList}
        {/* <button id = 'testButton' onClick={() => handleOtherClick('/')}>Add Fixture</button>
        <button id = 'testButton' onClick={() => handleClick('/contact')}>Add Group</button>
        <button id = 'testButton' onClick={() => handleClick('/retrieve')}>Add Animation</button>
        <button id = 'testButton' onClick={() => handleClick('/disconnect')}>Reset Stage</button> */}
      </div>)
}




export default BelowStage