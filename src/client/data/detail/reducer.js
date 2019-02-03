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
    case actionTypes.GET:
      // console.log('detailGet');
      return state;
    case actionTypes.GET_REQUEST:
      // console.log('detailGetRequest');
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_SUCCESS:
      // console.log('detailGetSuccess');
      return {
        ...action.detail,
        isLoading: false,
      };
    case actionTypes.GET_ERROR:
      // console.log('detailGetError');
      return initialState;
    case actionTypes.EMPTY:
      // console.log('detailEmpty');
      return state;
    case actionTypes.EMPTY_SUCCESS:
      // console.log('detailEmptySuccess');
      return initialState;
    default:
      return state;
  }
};
