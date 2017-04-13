import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import epidMiddleware from '../epics/_epicMiddleware';

export function getConfigureStore ({ reducerPath, reducer, initialState }) {
  const store = createStore(reducer, initialState || {}, applyMiddleware(epidMiddleware, logger));

  if (module.hot) {
    module.hot.accept(reducerPath, () => (
      store.replaceReducer(reducer)
    ));
  }

  return store;
}

