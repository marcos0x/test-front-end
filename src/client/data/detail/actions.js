import * as api from './api';
import * as actionTypes from './actionTypes';

const update = detail => ({ type: actionTypes.UPDATE, detail });

export const loading = () => ({ type: actionTypes.LOADING });
export const empty = () => ({ type: actionTypes.EMPTY });

export const get = (id, payload = {}) => (dispatch) => {
  dispatch(loading());
  return api.get(id, payload).then(response => dispatch(update(response)));
};
