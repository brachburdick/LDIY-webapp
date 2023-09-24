import React, {useState} from 'react';
import ChannelDropdown from './defineUniverse/ChannelDropdown';
import { useDispatch, useSelector } from 'react-redux';
import {stateStoreType} from '../../redux/reducers/index'
import {stateStageType} from '../../redux/reducers/stageReducer'
import { updateFixtureProfilesAC, updateOutgoingUniverseAC } from '../../redux/actions/actions';



const DefineUniverse: React.FC = () => {
    const dispatch = useDispatch();
    const mFPs= useSelector((state:stateStoreType) => state.stage.myFixtureProfiles);
    let uni = JSON.parse(JSON.stringify(useSelector((state:stateStoreType)=> state.stage.outgoingUniverse)))
    

    const onProfileChange = (homeAddress, newID, oldID) => {
        let oldFix = Number.isInteger(oldID)? JSON.parse(JSON.stringify(mFPs[oldID])): null;
        let newFix = Number.isInteger(newID)? JSON.parse(JSON.stringify(mFPs[newID])): null;
     

        console.log(mFPs[newID])
        console.log(`profile change triggered. mFPs ${mFPs}  homeAddress ${homeAddress} newFix ${newID}: ${newFix} oldFix ${oldID}:${oldFix}`)
        if(!newID || !oldID){console.log('edge cases wrt falsey vals of profile ids')}
        if(oldFix){
            //If overwritting an old ID, remove link in state address to old profile
            
            oldFix.homeAddys = oldFix.homeAddys.filter((ele)=>ele!=homeAddress)
            //remove previously reserved channels
            //Thought: potentially continue until empty to prevent overwriting?
            for(let i = homeAddress; i<homeAddress+oldFix.numChannels; i++){
                console.log();
                uni[i] = {identifier: "", parentId:"", value:""};
            }
            dispatch(updateFixtureProfilesAC(oldFix))
        }

        //add new profile to state address
        if(newFix){
            console.log('within newID, ', )
            newFix.homeAddys.push(parseInt(homeAddress));

            //overwrite channels
            for(let property in newFix){
                console.log(property)
                if(property == "r" || property == 'g' || property == 'b' || property == 'dimmer' || property == 'misc' ){        
                    let relativeAddress = parseInt(newFix[property]);
                    //console.log(`setting uni[${homeAddress+relativeAddress - 1}] equal to ${{identifier: property, parentId: newID, value: 0}}`)
                    uni[homeAddress+relativeAddress-1] = {identifier: property, parentId: newID, value: 0}
                }
            }

            dispatch(updateFixtureProfilesAC(newFix))

        
        } 
        console.log('new Uni', uni)
        
        dispatch(updateOutgoingUniverseAC(uni))

    

    }

    let uniKeys = Object.keys(uni);


    let dropdowns = uniKeys.map((chInd)=> {
        let chObj = uni[chInd]
        let name =  chObj.parentID ? (mFPs[chObj.parentID].name + " - " + chObj.identifier + "Channel") : ""
        
        return(
                <div key={`CH${parseInt(chInd)}`} className="channel-row">
                    Ch {parseInt(chInd)} : 
                    <ChannelDropdown channel={parseInt(chInd)}  name = {name} parentID = {chObj.parentID} onProfileChange = {onProfileChange}/>
                </div>
    )})
 

    return (
        <div className="column">
            <h2 className="column-header">Define Universe</h2>
            <div className = "universe-channel-scroll-box">

                {dropdowns}
                    
            
            </div>
        </div>
    );
}


export default DefineUniverse;
