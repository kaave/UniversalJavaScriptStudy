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

const configureStore = getConfigureStore({
  reducerPath: '../reducers/_combinedReducer',
  reducer: combineNumberReducers,
  initialState: window.APP_STATE || {}
});

render(configureStore);
