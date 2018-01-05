// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './style.css';

export default class About extends Component {
  render() {
    return (
      <div className={classnames('About')}>
        <h1 className={classnames(styles.bla, styles.bla2)}>
          React Router working!
        </h1>
      </div>
    );
  }
}
