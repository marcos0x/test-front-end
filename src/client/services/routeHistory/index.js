import _ from 'lodash';
import store from '../../config/store';
import * as actions from './actions';

export const get = () => store.getState().services.routeHistory.items;
export const current = () => ((get().length) ? _.last(get()) : null);
export const previous = () => ((get().length) ? get()[get().length - 2] : null);
export const push = route => store.dispatch(actions.push(route));
