import { combineReducers } from 'redux';
import { reducer as searchReducer } from './search/reducer';
import { reducer as searchResultsReducer } from './search/results/reducer';
import { reducer as searchPaginationReducer } from './search/pagination/reducer';
import { reducer as detailReducer } from './detail/reducer';

export const reducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsReducer,
  searchPagination: searchPaginationReducer,
  detail: detailReducer,
});
