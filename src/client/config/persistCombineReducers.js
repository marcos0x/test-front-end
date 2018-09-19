import { persistCombineReducers as basePersistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default function persistCombineReducers(key, reducers, options = {}) {
  return basePersistReducer({
    key,
    storage,
    ...options,
  }, reducers);
}
