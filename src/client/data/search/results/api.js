import { fetchApi } from '../../../services/api';

const endPoints = {
  get: '/items',
};

export const get = payload => fetchApi(endPoints.get, payload, 'get');
