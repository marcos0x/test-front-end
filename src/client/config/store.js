import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'remote-redux-devtools'; // remote
import { composeWithDevTools } from 'redux-devtools-extension'; // extension
import { persistStore } from 'redux-persist';
import persistCombineReducers from './persistCombineReducers';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import * as persistActions from '../services/persist/actions';
import saga from '../services/saga';

const appReducer = persistCombineReducers('root', { services: servicesReducer, data: dataReducer });
// const enhancer = composeWithDevTools({ hostname: 'localhost', port: 5680 }); // remote

const sagaMiddleware = createSagaMiddleware();

// const store = createStore(appReducer, enhancer(applyMiddleware(thunk))); // remote
const store = createStore(appReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))); // extension

export const persistor = persistStore(store, null, () => {
  store.dispatch(persistActions.update({ isHydrated: true }));
});

sagaMiddleware.run(saga);

export default store;
