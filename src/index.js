import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import './index.css';

import { Provider } from 'react-redux';
import store from "./helpers/store";
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    appBar: {
        height: 50,
    },
    isRtl: true
});
// To switch to RTL...

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
          <Routes />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);