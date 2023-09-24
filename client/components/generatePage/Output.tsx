import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stateStoreType} from '../../redux/reducers/index'

// Import necessary actions and selectors

const Output: React.FC = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state:stateStoreType) => state.stage.outgoingUniverse);
  const interfaceState = useSelector((state:stateStoreType)=>state.interface);
  const connectionStatus = interfaceState.connection
  const handleInterfaceSelection = () => {
    // Implement the logic to handle interface selection
  };

  const handleSliderChange = (channelIndex, newValue) => {
    dispatch({
      type: 'UPDATE_OUTGOING_UNIVERSE',
      payload: {
        ...channels,
        [channelIndex]: {
          ...channels[channelIndex],
          value: parseInt(newValue, 10),
        },
      },
    });
  };
  let chKeys = Object.keys(channels)
  let chSliders =   chKeys.map((chKey, index) => {
    let chObj = channels[chKey]
    return(
    <div key={index} className="channel-row">
      <span>{chKey} {chObj.name}</span>
      <input
        type="range"
        min="0"
        max="255"
        value={chObj.value||0}
        onChange={(e) => handleSliderChange(index, e.target.value)}
      />
      {/* <span>{chObj.value}</span> */}
    </div>
  )})

  return (
    <div className="column">
      <h2 className="column-title">Output</h2>
     
      <div className="universe-channel-scroll-box">
        {chSliders}
      </div>
    </div>
  );
};

export default Output;
