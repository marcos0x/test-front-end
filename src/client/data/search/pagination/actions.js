import * as actionTypes from './actionTypes';

export const searchPaginationGetPage = (page, items) => ({ type: actionTypes.GET_PAGE, page, items });
