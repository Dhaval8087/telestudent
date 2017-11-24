import React from 'react';
import styles from './Page.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
export default class Feature extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired
  };

  render() {
    var isLogout = 'none';
    if (typeof this.props.isLogout != "undefined") {
      isLogout = 'block'
    }
    return (
      <div>
        <h1 className={styles.heading}>
          {this.props.heading}
        </h1>
        <div style={{ "text-align": "end", display: isLogout }}>
          <Link to="/books">Home</Link>
          &nbsp; &nbsp; &nbsp;
          <Link to="/">Logout</Link>
        </div>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
