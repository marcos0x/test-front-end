import { all, call, fork, spawn } from 'redux-saga/effects';
import { watchSearchSetQuery } from '../data/search/saga';
import { watchSearchResultsEmpty, watchSearchResultsGet } from '../data/search/results/saga';
import { watchSearchPaginationGetPage } from '../data/search/pagination/saga';
import { watchDetailEmpty, watchDetailGet } from '../data/detail/saga';

export default function* saga() {
  const sagas = [
    watchSearchSetQuery,
    watchSearchResultsEmpty,
    watchSearchResultsGet,
    watchSearchPaginationGetPage,
    watchDetailEmpty,
    watchDetailGet,
  ];

  yield all(sagas.map(item => spawn(function* a() {
    while (true) {
      try {
        yield fork(item);
        break;
      } catch (error) {
        // console.log({ error });
      }
    }
  })));
}
