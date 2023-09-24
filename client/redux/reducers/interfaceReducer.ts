import { bindActionCreators } from "redux";
const { DMX, EnttecUSBDMXProDriver } = require("../../../dmx-ts/src/index");
let dmx = new DMX();

export type initialStateType = { 
   connected: boolean,
   name: string,
   serialPort: any,
   universe: any,
   dmxManager: typeof dmx;
  };

export const initialState: initialStateType = { 
  connected: false,
  name: "demo",
  serialPort: null,
  universe: null,
  dmxManager: dmx

 };

const interfaceReducer = (state = initialState, action) => {

    // console.log('INTERFACE REDUCER', action);
    switch (action.type) {
        case 'connectToInterface':
          // const enttecDriver = new EnttecUSBDMXProDriver(serialPort);



        return {
          ...state,
          connected: action.payload.connection,
          serialPort: action.payload.serialPort
        };

        // case 'updateConnection':


        //   return {
        //     ...state,
        //     connected: action.payload.connection,
        //     serialPort: action.payload.serialPort
        //   };
        
        // case 'updateUniverse':


        //   return{
        //     ...state,
        //     universe: action.payload.universe
        //   }
        
       
        default:
          return state; 
      }

}

  
  export default interfaceReducer;
  