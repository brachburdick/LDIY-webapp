import { bindActionCreators } from "redux";

export const initialState = { 
   connected: false,
   port: null,
   name: null
  };

const interfaceReducer = (state = initialState, action) => {

    console.log('INTERFACE REDUCER', action);
    switch (action.type) {
        case 'interface/connect':
          return {
            ...state,
            connected: true,
            interfaceDetails: action.payload,
          };
        // handle other action types...
       
        default:
          return state; // Ensure that current state is returned by default
      }

}

  
  export default interfaceReducer;
  