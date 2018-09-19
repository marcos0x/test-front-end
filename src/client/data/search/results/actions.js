import * as api from './api';
import * as actionTypes from './actionTypes';

const update = data => ({ type: actionTypes.UPDATE, data });

export const loading = () => ({ type: actionTypes.LOADING });
export const empty = () => ({ type: actionTypes.EMPTY });

export const get = payload => (dispatch) => {
  dispatch(loading());
  return api.get(payload).then(response => dispatch(update(response)));
};
