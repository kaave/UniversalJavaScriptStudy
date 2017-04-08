import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import './base.css';
//import combineNumberReducers from '../reducers/_combinedReducer';
import rootReducer from '../reducers';
import routes from '../common/routes.jsx';
import { getConfigureStore } from '../common/utils';

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

const configureStore = getConfigureStore({
  reducerPath: '../reducers',
  //reducer: combineNumberReducers,
  reducer: rootReducer,
  initialState: window.APP_STATE || {}
});

render(configureStore);

if (module.hot) {
  module.hot.accept('../common/routes.jsx', () => render());
}
