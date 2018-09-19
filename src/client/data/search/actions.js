import * as actionTypes from './actionTypes';

const update = query => ({ type: actionTypes.UPDATE, query });

export const setQuery = query => dispatch => Promise.resolve(dispatch(update(query)));
