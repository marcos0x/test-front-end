import { fetchApi } from '../../services/api';

const endPoints = {
  get: '/items/:id',
};

export const get = (id, payload) => fetchApi(endPoints.get.replace(':id', id), payload, 'get');
