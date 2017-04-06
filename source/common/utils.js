import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'

export function getConfigureStore ({ reducerPath, reducer }) {
  const store = createStore(reducer, applyMiddleware(logger));

  if (module.hot) {
    module.hot.accept(reducerPath, () => (
      store.replaceReducer(reducer)
    ));
  }

  return store;
}

