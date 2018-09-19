import * as actionTypes from './actionTypes';

const initialState = {
  author: {
    name: '',
    lastname: '',
  },
  item: {
    id: '',
    title: '',
    price: {
      currency: 'ARS',
      amount: 0,
      decimals: 0,
    },
    picture: '',
    condition: '',
    free_shipping: false,
    sold_quantity: 0,
    description: '',
  },
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
        ...action.detail,
        isLoading: false,
      };
    case actionTypes.EMPTY:
      return initialState;
    default:
      return state;
  }
};
