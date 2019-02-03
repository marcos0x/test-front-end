import * as actionTypes from './actionTypes';

export const searchResults = payload => ({ type: actionTypes.GET, payload });
export const searchResultsEmpty = () => ({ type: actionTypes.EMPTY });
