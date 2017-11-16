import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import ViewerQuery from './ViewerQuery';
import AppComponent from '../components/App/AppComponent';
import LoginComponent from '../components/Login/LoginComponent';
import HomeContainer from '../components/Home/HomeContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import AutheticateByCode from '../components/SignUp/AutheticateByCode';
import BooksContainer from '../components/Books/BooksContainer';
export default (
  <Route path='/' component={AppComponent} >
    <IndexRoute component={LoginComponent}  />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/auth/:email' component={AutheticateByCode} />
    <Route path='/home' component={HomeContainer} queries={ViewerQuery}/>
    <Route path='/books' component={BooksContainer} />
  </Route>
);

