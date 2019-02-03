import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { searchPaginationGetPageRequest, searchPaginationGetPageSuccess, searchPaginationGetPageError } from './actions';
import * as actionTypes from './actionTypes';
import * as results from '../results';

export function* getPage({ page, items }) {
  try {
    yield put(searchPaginationGetPageRequest(page));
    const data = yield results.getPage(page, items);
    yield put(searchPaginationGetPageSuccess(data));
  } catch (error) {
    yield put(searchPaginationGetPageError(error));
  }
}

export function* sagaSearchPaginationGetPage() {
  yield takeEvery(actionTypes.GET_PAGE, getPage);
}
