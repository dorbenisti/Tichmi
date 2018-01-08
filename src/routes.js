import React from 'react';
import App from './containers/AppContainer';
import About from './components/About/About';
import Login from "./containers/LoginContainer";
import Register from "./containers/RegisterContainer";

import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from "react-router-redux";
import history from "./helpers/history";

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  )
};

export default Routes;
