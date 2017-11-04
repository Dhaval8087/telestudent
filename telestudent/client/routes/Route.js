import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import ViewerQuery from './ViewerQuery';
import AppComponent from '../components/App/AppComponent';
import LoginComponent from '../components/Login/LoginComponent';
import HomeContainer from '../components/Home/HomeContainer';

export default (
  <Route path='/' component={AppComponent} >
    <IndexRoute component={LoginComponent}  />
    <Route path='/home' component={HomeContainer} queries={ViewerQuery}/>
  </Route>
);

