import * as actionTypes from './actionTypes';

const initialState = {
  categories: [],
  items: [],
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE:
      return {
        categories: [
          ...action.data.categories
        ],
        items: [
          ...action.data.items
        ],
        isLoading: false,
      };
    case actionTypes.EMPTY:
      return {
        categories: [],
        items: [],
        isLoading: false,
      };
    default:
      return state;
  }
};
