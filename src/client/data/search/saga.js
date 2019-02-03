import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';

export function* setQuery({ query }) {
  yield put({ type: actionTypes.SET_SUCCESS, query });
}

export function* watchSearchSetQuery() {
  yield takeEvery(actionTypes.SET, setQuery);
}
