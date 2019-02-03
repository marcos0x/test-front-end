import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from './api';
import { detailEmptySuccess, detailRequest, detailSuccess, detailError } from './actions';
import * as actionTypes from './actionTypes';

export function* empty() {
  yield put(detailEmptySuccess());
}

export function* get({ id, payload }) {
  try {
    yield put(detailRequest());
    const detail = yield call(api.get, id, payload);
    yield put(detailSuccess(detail));
  } catch (error) {
    yield put(detailError(error));
  }
}

export function* sagaDetailEmpty() {
  yield takeEvery(actionTypes.EMPTY, empty);
}

export function* sagaDetailGet() {
  yield takeEvery(actionTypes.GET, get);
}
