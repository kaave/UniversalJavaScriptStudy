import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackClientConfig from '../webpack/config.client';
import routes from '../common/routes.jsx';
import { port } from '../common/configs';
import { helmet } from '../components/head.jsx';

const compiler = webpack(webpackClientConfig);
const app = express();

// set dev-middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackClientConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// set template engine
app.set('view engine', 'ejs');

// set assets file path
app.use(express.static('dist'));

// routes
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    console.log(req.url);
    console.log(routes);
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const markup = renderToString(<RouterContext {...props} />);
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

