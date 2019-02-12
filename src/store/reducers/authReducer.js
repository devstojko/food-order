import { SIGN_IN, LOG_OUT } from '../actions/types.js';

export default function authReducer(state = null, action) {
  switch (action.type) {
    case SIGN_IN:
      return action.user;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
}
