import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from './api';
import * as actionTypes from './actionTypes';

export function* empty() {
  yield put({ type: actionTypes.EMPTY_SUCCESS });
}

export function* get({ id, payload }) {
  try {
    yield put({ type: actionTypes.GET_REQUEST });
    const detail = yield call(api.get, id, payload);
    yield put({ type: actionTypes.GET_SUCCESS, detail });
  } catch (error) {
    yield put({ type: actionTypes.GET_ERROR, error });
  }
}

export function* watchDetailEmpty() {
  yield takeLatest(actionTypes.EMPTY, empty);
}

export function* watchDetailGet() {
  yield takeLatest(actionTypes.GET, get);
}
