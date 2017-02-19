import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import routes from '../common/routes.jsx';

render(
  <AppContainer>
    <Router routes={routes} history={createBrowserHistory()} />
  </AppContainer>,
  document.getElementById('app')
);

  /*<AppContainer
    props={{ store }}
  >
    <Router routes={routes} history={createBrowserHistory()} />,
  </AppContainer>*/