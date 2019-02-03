import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from './api';
import { searchResultsEmptySuccess, searchResultsGetRequest, searchResultsGetSuccess, searchResultsGetError } from './actions';
import * as actionTypes from './actionTypes';
import { detailEmpty } from '../../detail/actions';
import { searchPaginationGetPage } from '../pagination/actions';

export function* empty() {
  yield put(searchResultsEmptySuccess());
}

export function* getResults({ payload }) {
  try {
    yield put(detailEmpty());
    yield put(searchResultsGetRequest());
    const data = yield call(api.get, payload);
    yield put(searchResultsGetSuccess(data));
    yield put(searchPaginationGetPage(1));
  } catch (error) {
    yield put(searchResultsGetError(error));
  }
}

export function* sagaSearchResultsEmpty() {
  yield takeEvery(actionTypes.EMPTY, empty);
}

export function* sagaSearchResultsGet() {
  yield takeEvery(actionTypes.GET, getResults);
}
