import * as actionTypes from './actionTypes';

export const detailEmpty = () => ({ type: actionTypes.EMPTY });
export const detailGet = (id, payload = {}) => ({ type: actionTypes.GET, id, payload });
