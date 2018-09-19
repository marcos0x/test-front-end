import _ from 'lodash';
import store from '../../../config/store';

export const perPage = 4;

export const get = () => store.getState().data.searchResults;
export const getSortedByTitle = () => _.orderBy(get().items, ['title'], ['asc']);
export const getPage = (page, array) => new Promise((resolve) => {
  const items = array || get().items;
  const totalCount = items.length;
  const pageIndex = page - 1;
  const pageItems = items.slice((pageIndex * perPage), (page * perPage));
  const pageCount = Math.min((totalCount - (pageIndex * perPage)), perPage);
  const pagination = { page, perPage, pageCount, totalCount };
  resolve({ pagination, items: pageItems });
});
