import { bindActionCreators } from 'redux';
import * as types from './actionTypes';

export const addQuidToCollectionAC = marketId => ({
  type: types.ADD_QUID_TO_COLLECTION,
  payload: marketId,
});

export const removeQuidFromCollectionAC = marketId => ({
  type: types.REMOVE_QUID_FROM_COLLECTION,
  payload: marketId,
});

export const RelateQuidAC = marketId => ({
  type: types.RELATE_QUID,
  payload: marketId,
});

export const DisownQuidAC = location => ({
  type: types.DISOWN_QUID,
  payload:location
});

export const selectThingAC = thing => ({
  type: types.SELECT_THING,
  payload: thing,
});
export const moveAC = quid =>({
  type: types.MOVE,
  payload: quid
})
// export const addFixtureProfileCountAC = tbd => ({
//   type: types.ADD_FIXTURE_PROFILE_COUNT,
//   payload: tbd
// })

export const updateFixtureProfilesAC = (profileData) => ({
  type: types.UPDATE_FIXTURE_PROFILES,
  payload: profileData
});

export const addFixtureProfileAC = (profile) => ({
  type: types.ADD_FIXTURE_PROFILE,
  payload: profile,
});

export const removeFixtureProfileAC = (profile) => ({
  type: types.REMOVE_FIXTURE_PROFILE,
  payload: profile,
});

export const updateCurrentColorAC = (color) => {
  return {
    type: 'UPDATE_CURRENT_COLOR',
    payload: color,
  };
};

export const updateOutgoingUniverseAC = (universe) => {
  return {
    type: 'UPDATE_OUTGOING_UNIVERSE',
    payload: universe,
  };
};


