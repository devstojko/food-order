import { SET_USER, LOG_OUT } from '../actions/types.js';

export default function authReducer(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
}
