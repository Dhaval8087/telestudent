import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import RootContainer from './RootContainer';
import Login from './Authetication/Login';
import Home from './Home/Home';
class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
      <Route path="/" component={RootContainer}>
        <IndexRoute component={Login}></IndexRoute>
        <Route path="/home"  component={Home}></Route>
      </Route>
    </Router>
    );
  }
}

export default App;