import React,{ useState, useEffect, useRef, useMemo } from 'react';
import {stateStoreType} from '../../../redux/reducers/index';
import { useSelector, useDispatch } from 'react-redux';
import { addFixtureProfileAC, removeFixtureProfileAC, updateFixtureProfilesAC, updateOutgoingUniverseAC} from '../../../redux/actions/actions';
import TagInput from './TagInput';
import { isEqual } from 'lodash';


interface Props {
    id: string;
    // ... more props as needed, for instance dropdown options, checkbox state, etc.
}

const FixtureProfileSelectionBox: React.FC<Props> = ({ id }) => {

      //TODO: move to state
      let defaultProfile = {
        id: id,
        name: "",
        numChannels: null,
        r: null,
        g: null,
        b: null,
        dimmer: null,
        misc: "",
        frontLight: false,
        homeAddys: []
      }
      
    const dispatch = useDispatch(); 
    let allFixtures = useSelector((state:stateStoreType) => state.stage.allFixtureProfiles)
    let allFixtureNames = Object.keys(allFixtures)
    let uni = JSON.parse(JSON.stringify(useSelector((state:stateStoreType)=> state.stage.outgoingUniverse)))
    const [profile, setProfile] = useState(defaultProfile);
    const channelSelectionArray = useMemo(() => produceChannelArray(profile.numChannels), [profile.numChannels]);
    const prevProfileRef = useRef(defaultProfile)
    const [homeAddys, setHomeAddys] = useState<number[]>(profile.homeAddys);
    const [tempInputValues, setTempInputValues] = useState({ r: "", g: "", b: "", dimmer: "" });

    function produceChannelArray(numChannels = profile.numChannels){
      console.log('in production of channel array');
      console.log(numChannels);
      if(numChannels){
        return ([
          <option value="" key="default">
            -
          </option>,
          ...[...Array(profile.numChannels).keys()].map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))
        ]);
      }else{
        return [
          <option value="" key="default">
            -
          </option>
        ];
      }
    }
    

    const handleModelChange = (e) => {
        console.log('handle model change', e)
        const selectedModel = e.target.value;

      };

      function updateProfile(e){
        const {name, value} = e.target;
        
        let newVal = name === "numChannels" ? parseInt(value, 10) : value === "" ? null : value;
        console.log('updating profile');
        console.log(prevProfileRef.current[name]);
        console.log(newVal);
        if(!isEqual(prevProfileRef.current[name], newVal)){
          console.log('inequality detected; updating local profile')
          setProfile((profile) => ({
            ...profile,
            [name]: newVal,
          }));
        } 
      };
      


      function handleInputChange(e) {
        const { name, value } = e.target;
        setTempInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }


      useEffect(() => {
        console.log('in the useEffect for a change in profile');
        
        if (!isEqual(profile, prevProfileRef.current)) {
          console.log("updating global state from FP");
          prevProfileRef.current = JSON.parse(JSON.stringify(profile));
          dispatch(updateFixtureProfilesAC(JSON.parse(JSON.stringify(profile))));
        }
      }, [profile, dispatch]);
  

  function updateProfileFL(e){
    const {name,checked} = e.target;
    
    setProfile((profile)=>({
        ...profile,
        [name]:checked,
    }));

  };



 


  function handleUpdate(e) {
    console.log('handleUpdate')

  }
  function handleDelete(e) {
    console.log('handleDelete')

  }

   const modelOptions = [ <option key="default" value="">
    - 
    </option>,
 ...Object.keys(allFixtures).map((f) => (
   <option key={f} value={f}>
     {f}
   </option>))]




return (
  <div id="fixture-profile-box" >
    

      
       
          <input name="name"type="text" placeholder="Your Fixture Name" value={profile.name}  className="misc-input"  onInput={updateProfile} />
   

          <div className = "fixture-profile-channel-selection-box">
              <span className="input-description"># of Channels:</span>
              <span className="input-description">R Ch:</span>
              <span className="input-description">G Ch:</span>
              <span className="input-description">B Ch:</span>
              <span className="input-description">Dimmer:</span>

              <input name="numChannels" type="number" className ="channel-selector" placeholder="# of Channels" value={profile.numChannels} onChange={handleInputChange} onBlur={updateProfile}  />
              <select 
                name="r" 
                placeholder="R channel" 
                className="channel-selector" 
                value={tempInputValues.r || profile.r} 
                onChange={handleInputChange} 
                onBlur={updateProfile}  
              >
                {channelSelectionArray}
              </select>
              <select 
                name="g" 
                placeholder="G channel" 
                className="channel-selector" 
                value={tempInputValues.g || profile.g} 
                onInput={handleInputChange} 
                onBlur={updateProfile}  // Add onBlur handler here
              >
                {channelSelectionArray}
              </select>
              <select 
                name="b" 
                placeholder="B channel" 
                className="channel-selector" 
                value={tempInputValues.b || profile.b} 
                onInput={handleInputChange} 
                onBlur={updateProfile}  // Add onBlur handler here
              >
                {channelSelectionArray}
              </select>
              <select 
                name="dimmer" 
                placeholder="Dimmer channel" 
                value={tempInputValues.dimmer || profile.dimmer} 
                className="channel-selector" 
                onInput={handleInputChange} 
                onBlur={updateProfile}  // Add onBlur handler here
              >
                {channelSelectionArray}
              </select>

</div>
       
      
      
       
          <TagInput homeAddys = {profile.homeAddys} updateProfile={updateProfile} />
       
      <button className = "button" onClick={handleDelete}>Delete</button>
  </div>
);


};

export default FixtureProfileSelectionBox;
