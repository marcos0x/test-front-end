import _ from 'lodash';
import store from '../../config/store';

export const get = () => store.getState().data.detail;
export const getSortedDesc = () => ({
  ...get().detail,
  detailDescription: _.orderBy(get().detailDescription, ['tx_id'], ['desc']),
});
export const getSortedByDate = () => {
  const detailDescription = {};
  getSortedDesc().detailDescription.map((item) => {
    const [year, month, day] = (item.tx_date || '2017-12-01').split('-');
    detailDescription[year] = detailDescription[year] || {};
    detailDescription[year][month] = detailDescription[year][month] || [];
    return detailDescription[year][month].push(item);
  });
  return { ...get().detail, detailDescription };
};
