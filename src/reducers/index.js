import { combineReducers } from 'redux';
import login from './login';
import init from './init';

export default combineReducers({
  login,
  init
});
