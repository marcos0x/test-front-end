import * as actionTypes from './actionTypes';

export const detailEmptySuccess = () => ({ type: actionTypes.EMPTY_SUCCESS });
export const detailRequest = () => ({ type: actionTypes.GET_REQUEST });
export const detailSuccess = detail => ({ type: actionTypes.GET_SUCCESS, detail });
export const detailError = error => ({ type: actionTypes.GET_ERROR, error });

export const detailEmpty = () => ({ type: actionTypes.EMPTY });
export const detailGet = (id, payload = {}) => ({ type: actionTypes.GET, id, payload });
