import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import './index.css';

import { Provider } from 'react-redux';
import store from "./helpers/store";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
