import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import languageReducer from './languageReducer';

export default combineReducers({
  toastr: toastrReducer,
  form: formReducer,
  authUser: authReducer,
  loading: loadingReducer,
  language: languageReducer
});
