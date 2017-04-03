import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import routes from '../common/routes.jsx';
import './base.css';

function render () {
  ReactDOM.render(
    <AppContainer>
      <Router routes={routes} history={createBrowserHistory()} />
    </AppContainer>,
    document.getElementById('app')
  );
}

render();

if (module.hot) {
  module.hot.accept('../common/routes.jsx', () => render());
}

