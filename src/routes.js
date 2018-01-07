import React from 'react';
import App from './containers/AppContainer';
import About from './components/About/About';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import TeacherMain from "./components/Teacher/TeacherMain";
import Register from "./components/Login/Register";
import LoginPage from "./components/Login/LoginPage";

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/about" component={About} />
          <Route exact path="/teacher" component={TeacherMain} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginPage} />
      </div>
    </Router>
  )
};

export default Routes;
