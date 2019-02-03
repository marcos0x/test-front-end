import { all, call, fork, spawn } from 'redux-saga/effects';
import { sagaSearchSetQuery } from '../data/search/saga';
import { sagaSearchResultsEmpty, sagaSearchResultsGet } from '../data/search/results/saga';
import { sagaSearchPaginationGetPage } from '../data/search/pagination/saga';
import { sagaDetailEmpty, sagaDetailGet } from '../data/detail/saga';

export default function* saga() {
  const sagas = [
    sagaSearchSetQuery,
    sagaSearchResultsEmpty,
    sagaSearchResultsGet,
    sagaSearchPaginationGetPage,
    sagaDetailEmpty,
    sagaDetailGet,
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
