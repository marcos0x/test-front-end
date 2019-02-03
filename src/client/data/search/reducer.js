import * as actionTypes from './actionTypes';

export const initialState = {
  query: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET:
      // console.log('searchSet');
      return { ...state };
    case actionTypes.SET_SUCCESS:
      // console.log('searchSetSuccess');
      return {
        query: action.query
      };
    default:
      return state;
  }
}
