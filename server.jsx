import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { routes } from './routes';

const app = express();

// set template engine
app.set('view engine', 'ejs');

// set assets file path
app.use(express.static('public'));

// routes
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      res.render('index', { markup: renderToString(<RouterContext {...props} />) });
    } else {
      res.sendStatus(404);
    }
  });
});

// server start
const server = http.createServer(app);
server.listen(3003);
server.on('listening', () => console.log('Listening on 3003'));

