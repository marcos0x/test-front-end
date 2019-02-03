import * as actionTypes from './actionTypes';

export const searchResultsEmptySuccess = () => ({ type: actionTypes.EMPTY_SUCCESS });
export const searchResultsGetRequest = () => ({ type: actionTypes.GET_REQUEST });
export const searchResultsGetSuccess = data => ({ type: actionTypes.GET_SUCCESS, data });
export const searchResultsGetError = error => ({ type: actionTypes.GET_ERROR, error });

export const searchResults = payload => ({ type: actionTypes.GET, payload });
export const searchResultsEmpty = () => ({ type: actionTypes.EMPTY });
