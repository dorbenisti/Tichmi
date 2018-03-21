import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from "react-router-redux";
import { connect } from 'react-redux';

import App from './components/App/App';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TeacherDetailsView from  './components/TeacherDetailsView/TeacherDetailsView';

import history from "./helpers/history";

export function requireAuth(nextState, replace, next){
    if (!this.props.user) {
        replace({
            pathname: "/login",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={App}  onEnter={this.requireAuth}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/teacherDetails/:id" component={TeacherDetailsView} />
      </div>
    </Router>
  )
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(Routes);
