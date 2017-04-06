// import { createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';

export function getConfigureStore ({ reducerPath, reducer }) {
  // const store = createStore(reducer, initialState, enhancer);
  const store = createStore(reducer);

  if (module.hot) {
    module.hot.accept(reducerPath, () => (
      store.replaceReducer(reducer)
    ));
  }

  return store;
}

