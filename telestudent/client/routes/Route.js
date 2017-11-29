import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import AppComponent from '../components/App/AppComponent';
import LoginComponent from '../components/Login/LoginComponent';
import SignupComponent from '../components/Signup/SignupComponent';
import AutheticateByCode from '../components/SignUp/AutheticateByCode';
import BooksContainer from '../components/Books/BooksContainer';
import ViewBook from '../components/Books/ViewBook';
export default (
  <Route path='/' component={AppComponent} >
    <IndexRoute component={LoginComponent}  />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/auth/:email' component={AutheticateByCode} />
    <Route path='/books' component={BooksContainer} />
    <Route path='/view/:book' component={ViewBook} />
  </Route>
);

