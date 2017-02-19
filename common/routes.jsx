import React from 'react';
import { Route } from 'react-router';

import AppComponent from '../components/app.jsx';
import IndexComponent from '../components/index.jsx';
import AboutComponent from '../components/about.jsx';

export default (
  <Route path="" component={AppComponent}>
    <Route path='/' component={IndexComponent} />
    <Route path='/about' component={AboutComponent} />
  </Route>
);
