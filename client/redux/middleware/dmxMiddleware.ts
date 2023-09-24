import { Middleware } from 'redux';

export const dmxMiddleware: Middleware = ({ getState }) => next => async action => {
  next(action);
  
  if (action.type === 'UPDATE_OUTGOING_UNIVERSE' || action.type === 'UPDATE_CURRENT_COLOR') {
    try {
      const state = getState();
      const outgoingUniverse ={};
      const uni = state.stage.outgoingUniverse
      for(let each in uni){
        if(parseInt(each)){
        outgoingUniverse[parseInt(each)] = parseInt(uni[each].value)}
      }

      const response = await fetch('/dmx/on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outgoingUniverse }),
      });
      
      const text = await response.text();
      console.log(text);
    } catch (err) {
      console.error('Failed to update DMX:', err);
    }
  }
};
