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

import webpackClientConfig from '../../webpack/client';
import routes from '../common/routes.jsx';
import { port } from '../common/configs';
import { getConfigureStore } from '../common/utils';
import { helmet } from '../components/head.jsx';
//import combineNumberReducers from '../reducers/_combinedReducer';
import rootReducer from '../reducers';

const compiler = webpack(webpackClientConfig);
const app = express();
const store = getConfigureStore({
  reducerPath: '../reducers',
  reducer: rootReducer
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
  res.json(Array.from(Array(Math.ceil(Math.random() * 100))).map(() => Math.floor(Math.random() * 100)));
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
      // すべてのコンポーネントのうち、初期化処理が入っているものを絞込んですべて実行する・・・微妙感あるな・・・
      // 少なくともflowtypeかTypeScriptでinterface実装したくなるなぁ・・・
      // 参考: http://qiita.com/hmarui66/items/4f75e624c4f70d596873#%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%81%A7%E5%8F%96%E5%BE%97%E3%81%97%E3%81%9F%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-2
      const components = props.components.filter(component => component.fetchData);
      Promise.all(components.map(component => store.dispatch(component.fetchData())))
        .then(() => {
          const markup = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );
          const { title, htmlAttributes, meta, link, script, style } = helmet.rewind();
          res.render('index', { markup, title, htmlAttributes, meta, link, script, style, appState: JSON.stringify(store.getState()) });
        }).catch(error => {
        res.status(500).send(error.message);
      });
    } else {
      res.sendStatus(404);
    }
  });
});

// server start
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => console.log(`Listening on ${port}`));

