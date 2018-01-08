import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from "react-router-redux";

import App from './components/App/App';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import history from "./helpers/history";

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  )
};

export default Routes;
