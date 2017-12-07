/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../components/Login/LoginComponent';
import SignupComponent from '../components/SignUp/SignupComponent';
import AutheticateByCode from '../components/SignUp/AutheticateByCode';
import BooksContainer from '../components/Books/BooksContainer';
import ViewBook from '../components/Books/ViewBook';
export default class RouteComponent extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact component={Login} />
          <Route path='/signup' component={SignupComponent} />
          <Route path='/auth/:email' component={AutheticateByCode} />
          <Route path='/books' component={BooksContainer} />
          <Route path='/view/:book' component={ViewBook} />
        </div>
      </Router>
    );
  }
}
