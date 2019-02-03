import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { searchSetQuerySuccess } from './actions';
import * as actionTypes from './actionTypes';

export function* setQuery({ query }) {
  yield put(searchSetQuerySuccess(query));
}

export function* sagaSearchSetQuery() {
  yield takeEvery(actionTypes.SET, setQuery);
}
