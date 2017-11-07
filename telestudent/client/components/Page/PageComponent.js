import React from 'react';
import styles from './Page.scss';
import PropTypes from 'prop-types';

export default class Feature extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <h1 className={styles.heading}>
          {this.props.heading}
        </h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
