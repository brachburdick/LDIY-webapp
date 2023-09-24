import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './redux/reducers/index';
import { dmxMiddleware } from './redux/middleware/dmxMiddleware'; // Adjust the path accordingly


// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  applyMiddleware(dmxMiddleware),
  // composeWithDevTools(),
  
);

export default store;