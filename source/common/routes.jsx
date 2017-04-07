import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import AppContainers from '../containers/app.jsx';
import IndexComponent from '../components/index.jsx';
import AboutComponent from '../components/about.jsx';
import NumberComponent from '../components/number.jsx';

const App = connect(state => state)(AppContainers);

export default (
  <Route path="" component={App}>
    <Route path="/" component={IndexComponent} />
    <Route path="/about" component={AboutComponent} />
    <Route path="/number" component={NumberComponent} />
  </Route>
);
