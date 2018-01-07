import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Finder from "./Finder";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Teachers from "./Teachers";
import FlatButton from 'material-ui/FlatButton';

class App extends Component {


  /*render() {
    return (
      <div className={styles.App}>
        <div className={styles['App-header']}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
          <h2>Welcome to React bar- Fullstack!</h2>
        </div>
        <p className={styles["App-intro"]}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='about'><button>Test React Router</button></Link>
        <Link to='register'><button>To register</button></Link>
        <Link to='login'><button>To login</button></Link>
        <br />
        <br />
        <button onClick={this.props.actions.expressTest}>Test if Express is working</button>
        <br />
        <br />
        {
          this.props.expressTestPending && (<h1>loading</h1>)
        }
        { !this.props.expressTestPending && <div style={{ padding: '30px' }}>{this.props.results}</div> }
      </div>
    );
  }*/
  render(){

      const muiTheme = getMuiTheme({
          appBar: {
              height: 50,
          },
          isRtl: true
      });
      // To switch to RTL...

      const rightButtons = (
          <div>
              <Link to='register'>  <FlatButton label="הירשם"  /></Link>
              <Link to='login'> <FlatButton label="התחבר"  /></Link>
          </div>
      );


      return <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Tichmi" iconElementRight={rightButtons}/>
          <Finder/>
          <Teachers/>
      </MuiThemeProvider>;
  }
}

export default App;
