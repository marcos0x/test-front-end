import store from '../../config/store';

export const get = () => store.getState().data.search;
