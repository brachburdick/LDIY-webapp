import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFixtureProfileAC, removeFixtureProfileAC, updateFixtureProfilesAC} from '../../../redux/actions/actions';

import {stateStoreType} from '../../../redux/reducers/index'
interface Props {
    channel: number;
    name: string;
    parentID: any;
    onProfileChange: (homeAddress:number, oldID:number, newID :number) => void;
}

const ChannelDropdown: React.FC<Props> = ({ channel, name, parentID, onProfileChange }) => {
    let [oldID,setOldID] = useState(null)
    const mFPs = useSelector((state:stateStoreType) => state.stage.myFixtureProfiles);
    
    let parFix = Number.isInteger(parentID) ? mFPs[parentID] : null;
    let oldParFix = Number.isInteger(oldID) ? mFPs[oldID] : null;

    const options = [
      //set default value to be the name (either an actual name or a null value)
        <option key="default" value="">
           {name}
        </option>,
        //provide a list of all our fixture profiles
        //what is the key attribute? Did I set this or is it a react thing? like the key to the mFP property?
        ...Object.keys(mFPs).map((pID) => (
          //reserach the html option element
          <option key={pID} value={pID}>
            {mFPs[pID].name}
          </option>
        )),
      ];

        //research e and React.changeEVent  and setting f desc in onChange attr.
      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //e is the newly selected profile ID
        let newID = parseInt(e.target.value);
        console.log(channel, newID, oldID)
        onProfileChange(channel, newID, oldID)
        setOldID(newID)
    };

    return (
        //reserach the select element
        <select value = {oldID} onChange = {handleChange}>
            {options}
        </select>
    );
}

export default ChannelDropdown;
