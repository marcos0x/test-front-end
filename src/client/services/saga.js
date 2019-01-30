import { all } from 'redux-saga/effects';
import { watchSearchSetQuery } from '../data/search/saga';
import { watchSearchResultsEmpty, watchSearchResultsGet } from '../data/search/results/saga';
import { watchSearchPaginationGetPage } from '../data/search/pagination/saga';
import { watchDetailEmpty, watchDetailGet } from '../data/detail/saga';

export default function* saga() {
  yield all([
    watchSearchSetQuery(),
    watchSearchResultsEmpty(),
    watchSearchResultsGet(),
    watchSearchPaginationGetPage(),
    watchDetailEmpty(),
    watchDetailGet()
  ]);
}
