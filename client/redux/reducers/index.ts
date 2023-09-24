
import { combineReducers } from 'redux';
import stageReducer from './stageReducer';
import interfaceReducer from './interfaceReducer';
import {stateStageType} from './stageReducer';


export type stateStoreType = {
   stage: any,
   interface: any
}

const reducers = combineReducers({
   stage: stageReducer,
   interface: interfaceReducer
});

export default reducers;

