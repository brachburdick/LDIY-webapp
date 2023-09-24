import React from 'react';
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentColorAC, updateOutgoingUniverseAC } from '../../../redux/actions/actions'; // Adjust the path to your actions
import {stateStoreType} from '../../../redux/reducers/index'

const ColorPicker = () => {
  const dispatch = useDispatch();
  const stageState = useSelector((state:stateStoreType) => state.stage);
  const currentColor = stageState.currentColor;
  let currentUniverse = JSON.parse(JSON.stringify(stageState.outgoingUniverse))
  const handleChangeComplete = (color) => {
    const { r, g, b, a } = color.rgb;
    dispatch(updateCurrentColorAC({ r, g, b, a }));
   
  };

  return <ChromePicker className = "widget" color={currentColor} onChangeComplete={handleChangeComplete} />;
};

export default ColorPicker;
