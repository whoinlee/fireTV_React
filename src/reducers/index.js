import { combineReducers } from 'redux-immutable';
import keyboard from './keyboard';
//import pause from './pause';


const rootReducer = combineReducers({
  //pause,
  keyboard,
});

export default rootReducer;
