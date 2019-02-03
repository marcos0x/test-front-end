import * as actionTypes from './actionTypes';

export const searchPaginationGetPageRequest = page => ({ type: actionTypes.GET_PAGE_REQUEST, page });
export const searchPaginationGetPageSuccess = data => ({ type: actionTypes.GET_PAGE_SUCCESS, data });
export const searchPaginationGetPageError = error => ({ type: actionTypes.GET_PAGE_ERROR, error });

export const searchPaginationGetPage = (page, items) => ({ type: actionTypes.GET_PAGE, page, items });
