import * as Actions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Register from '../components/Register/Register';

function mapStateToProps(state) {
  return { 
      user: state.userInput.user,
      password: state.userInput.password
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
