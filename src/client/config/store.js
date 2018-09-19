import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore } from 'redux-persist';
import persistCombineReducers from './persistCombineReducers';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import * as persistActions from '../services/persist/actions';

const appReducer = persistCombineReducers('root', { services: servicesReducer, data: dataReducer });
const enhancer = composeWithDevTools({ hostname: 'localhost', port: 5680 });

const store = createStore(appReducer, enhancer(applyMiddleware(thunk)));
export const persistor = persistStore(store, null, () => {
  store.dispatch(persistActions.update({ isHydrated: true }));
});

export default store;
