import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import combineNumberReducers from '../reducers/_combinedReducer';
import routes from '../common/routes.jsx';
import { getConfigureStore } from '../common/utils';
import './base.css';

function render (store) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router routes={routes} history={createBrowserHistory()} />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}

// const store = createStore(combineNumberReducers, applyMiddleware())
// const store = createStore(combineNumberReducers);
//
// render(store);
//
// if (module.hot) {
//   module.hot.accept('../common/routes.jsx', () => render(store));
// }

render(getConfigureStore({
  reducerPath: '../reducers/_combinedReducer',
  reducer: combineNumberReducers
}));

