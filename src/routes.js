import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from "react-router-redux";

import App from './components/App/App';

import history from "./helpers/history";

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route component={App} />
      </div>
    </Router>
  )
};

export default Routes;
