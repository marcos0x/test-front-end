import * as actionTypes from './actionTypes';

export const searchSetQuerySuccess = query => ({ type: actionTypes.SET_SUCCESS, query });

export const searchSetQuery = query => ({ type: actionTypes.SET, query });
