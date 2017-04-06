import path from 'path';
import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackClientConfig from '../../webpack/config.client';
import routes from '../common/routes.jsx';
import { port } from '../common/configs';
import { getConfigureStore } from '../common/utils';
import { helmet } from '../components/head.jsx';
import combineNumberReducers from '../reducers/_combinedReducer';

const compiler = webpack(webpackClientConfig);
const app = express();
const store = getConfigureStore({
  reducerPath: '../reducers/_combinedReducer',
  reducer: combineNumberReducers
});

// set dev-middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackClientConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// set template engine
app.set('view engine', 'ejs');
app.set('views', './source/views/');

// set assets file path
app.use(express.static('dist'));

// api
const apiRouter = express.Router();
apiRouter.get('/', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json([1, 2, 3, 4, 5]);
});
app.use('/api', apiRouter);

// all routes
app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const markup = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );
      const { title, htmlAttributes, meta, link, script, style } = helmet.rewind();
      res.render('index', { markup, title, htmlAttributes, meta, link, script, style });
    } else {
      res.sendStatus(404);
    }
  });
});

// server start
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => console.log(`Listening on ${port}`));

