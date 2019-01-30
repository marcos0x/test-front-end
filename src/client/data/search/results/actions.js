import * as actionTypes from './actionTypes';

export const searchResultsEmpty = () => ({ type: actionTypes.EMPTY });
export const searchResultsGet = payload => ({ type: actionTypes.GET, payload });
