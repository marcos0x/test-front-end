import * as actionTypes from './actionTypes';

const initialState = {
  categories: [],
  items: [],
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET:
      console.log('searchResultsGet');
      return state;
    case actionTypes.GET_REQUEST:
      console.log('searchResultsGetRequest');
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_SUCCESS:
      console.log('searchResultsGetSuccess');
      return {
        categories: [
          ...action.data.categories
        ],
        items: [
          ...action.data.items
        ],
        isLoading: false,
      };
    case actionTypes.GET_ERROR:
      console.log('searchResultsGetError');
      return initialState;
    case actionTypes.EMPTY:
      console.log('searchResultsEmpty');
      return state;
    case actionTypes.EMPTY_SUCCESS:
      console.log('searchResultsEmptySuccess');
      return initialState;
    default:
      return state;
  }
};
