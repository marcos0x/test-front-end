import * as actionTypes from './actionTypes';
import * as results from '../results';

export const getPageRequest = page => ({ type: actionTypes.GET_PAGE_REQUEST, page });
export const getPageSuccess = ({ items, pagination }) => ({ type: actionTypes.GET_PAGE_SUCCESS, items, pagination });
export const getPageFailure = error => ({ type: actionTypes.GET_PAGE_FAILURE, error });
export const getPage = (page, items) => (dispatch) => {
  dispatch(getPageRequest(page));
  return results.getPage(page, items)
    .then(result => dispatch(getPageSuccess(result)))
    .catch(error => dispatch(getPageFailure(error)));
};
