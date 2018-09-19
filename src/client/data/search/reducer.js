import * as actionTypes from './actionTypes';

export const initialState = {
  query: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE:
      return {
        query: action.query
      };
    default:
      return state;
  }
}
