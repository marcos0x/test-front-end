import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as results from '../results';

export function* getPage({ page, items }) {
  try {
    yield put({ type: actionTypes.GET_PAGE_REQUEST, page });
    const data = yield results.getPage(page, items);
    yield put({ type: actionTypes.GET_PAGE_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_PAGE_ERROR, error });
  }
}

export function* watchSearchPaginationGetPage() {
  yield takeLatest(actionTypes.GET_PAGE, getPage);
}
