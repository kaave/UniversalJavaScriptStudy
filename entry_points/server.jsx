import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
//import Fetchr from 'fetchr';

import routes from '../common/routes.jsx';
import { port } from '../common/configs';
import { helmet } from '../components/head.jsx';

const app = express();

// set template engine
app.set('view engine', 'ejs');

// set assets file path
app.use(express.static('dist'));

// api
//Fetchr.registerService({
//  name: 'RandomService',
//  read: (_req, _resource, _params, _config, callback) => {
//    callback(null, { num: Math.random() });
//  }
//});
//app.use('/api', Fetchr.middleware());
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

