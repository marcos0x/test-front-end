import { select, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from './api';
import * as actionTypes from './actionTypes';
import { detailEmpty } from '../../detail/actions';
import { searchPaginationGetPage } from '../pagination/actions';

export function* empty() {
  yield put({ type: actionTypes.EMPTY_SUCCESS });
}

export function* getResults({ payload }) {
  try {
    yield put(detailEmpty());
    yield put({ type: actionTypes.GET_REQUEST });
    const data = yield call(api.get, payload);
    yield put({ type: actionTypes.GET_SUCCESS, data });
    yield put(searchPaginationGetPage(1));
  } catch (error) {
    yield put({ type: actionTypes.GET_ERROR, error });
  }
}

export function* watchSearchResultsEmpty() {
  yield takeEvery(actionTypes.EMPTY, empty);
}

export function* watchSearchResultsGet() {
  yield takeEvery(actionTypes.GET, getResults);
}
