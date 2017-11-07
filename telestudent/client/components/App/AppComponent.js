import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import styles from './App.scss';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
