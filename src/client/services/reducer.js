import { combineReducers } from 'redux';
import { reducer as persistReducer } from './persist/reducer';
import { reducer as routeHistoryReducer } from './routeHistory/reducer';

export const reducer = combineReducers({
  persist: persistReducer,
  routeHistory: routeHistoryReducer,
});
