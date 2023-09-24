import { Middleware } from 'redux';
import { EnttecUSBDMXProDriver } from 'dmx-ts';

export const dmxMiddleware: Middleware = store => next => async action => {
  next(action);

  const state = store.getState();

  if (action.type === 'UPDATE_OUTGOING_UNIVERSE' || action.type === 'UPDATE_CURRENT_COLOR') {
    try {
      const outgoingUniverse = {};
      const uni = state.stage.outgoingUniverse;
      for (let each in uni) {
        if (parseInt(each)) {
          outgoingUniverse[parseInt(each)] = parseInt(uni[each].value);
        }
      }

      // Use the DMX manager instance from the state
      state.interface.dmxManager.update('demo', outgoingUniverse);

    } catch (err) {
      console.error('Failed to update DMX:', err);
    }
  }

  if (action.type === 'CONNECT_TO_INTERFACE') {
    try {
      const serialPort = await (window as any).navigator.serial.requestPort();
      await serialPort.open({
        'baudRate': 250000,
        'dataBits': 8,
        'stopBits': 2,
        'parity': 'none',
      });

      const enttecDriver = new EnttecUSBDMXProDriver(serialPort);
      const universe = await state.interface.dmxManager.addUniverse('demo', enttecDriver);

      // store.dispatch({
      //   type: 'updateConnection',
      //   payload: {
      //     connection: true,
      //     serialPort: serialPort
      //   }
      // });

      // store.dispatch({
      //   type: 'updateUniverse',
      //   payload: {
      //     universe: universe
      //   }
      // });

    } catch (err) {
      console.error('Failed to connect:', err);
      store.dispatch({
        type: 'updateConnection',
        payload: {
          connection: false,
          serialPort: null
        }
      });
    }
  }

  return next(action);
};
