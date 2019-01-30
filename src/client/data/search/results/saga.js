import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from './api';
import * as actionTypes from './actionTypes';

export function* empty() {
  yield put({ type: actionTypes.EMPTY_SUCCESS });
}

export function* getResults({ payload }) {
  try {
    yield put({ type: actionTypes.GET_REQUEST });
    const data = yield call(api.get, payload);
    yield put({ type: actionTypes.GET_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_ERROR, error });
  }
}

export function* watchSearchResultsEmpty() {
  yield takeLatest(actionTypes.EMPTY, empty);
}

export function* watchSearchResultsGet() {
  yield takeLatest(actionTypes.GET, getResults);
}
