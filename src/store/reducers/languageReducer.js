import { SET_EN, SET_SR } from '@actions/types';

export default function languageReducer(state = 'en', action) {
  switch (action.type) {
    case SET_EN:
      return 'en';
    case SET_SR:
      return 'sr';
    default:
      return state;
  }
}
