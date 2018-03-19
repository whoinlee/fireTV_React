import { combineReducers } from 'redux-immutable';
import left from './left';
import right from './right';
import down from './down';
import up from './up';
import enter from './enter';

const keyboardReducer = combineReducers({
  left,
  right,
  down,
  up,
  enter,
});

export default keyboardReducer;
