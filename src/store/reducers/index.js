import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducer from './authReducer';

export default combineReducers({
  toastr: toastrReducer,
  authUser: authReducer
});
