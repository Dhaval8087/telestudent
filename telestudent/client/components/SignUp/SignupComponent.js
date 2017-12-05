import React from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { getcognitoUser, getUserPool } from '../Common/getAWSSettings';
import Loader from '../Common/Loader';

export default class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      repassword: '',
      isLoad: false
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.cancel = this.cancel.bind(this)
  }
  handleSignUp() {
    if (this.state.password != this.state.repassword) {
      toastr.error('Password not matched !!');
    }
    else {
      this.setState({ isLoad: true });
      const userPool = getUserPool(this.state.username);
      const email = this.state.username;
      const password = this.state.password;
      const attributeList = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        })
      ];
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          toastr.error(err);
          return;
        }
        toastr.success('user is created ' + result.user.getUsername());
        this.setState({ isLoad: false });
        this.context.router.push({    // use push
          pathname: `/auth/${result.user.getUsername()}`,
        });
      });
    }
  }
  cancel() {
    this.context.router.push('/');
  }
  render() {
    return (
      <div className="loading">
        {this.state.isLoad ? <Loader /> : null}
        <Page heading='Signup'>
          <div style={{ width: '70%', margin: 'auto' }}>
            <Grid>
              <Cell col={12}>
                <Textfield onChange={(event) => { this.setState({ username: event.target.value }) }} label='Email' />
              </Cell>
              <Cell col={12}>
                <Textfield onChange={(event) => { this.setState({ password: event.target.value }) }} label='Password' type='password' />
              </Cell>
              <Cell col={12}>
                <Textfield onChange={(event) => { this.setState({ repassword: event.target.value }) }} label='Re-Password' type='password' />
              </Cell>
              <Cell col={12}>
                <Button primary onClick={this.handleSignUp}>Sign up</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button primary onClick={this.cancel}>Cancel</Button>
              </Cell>
            </Grid>
          </div>
        </Page>
      </div>
    );
  }
}
Signup.contextTypes = {
  router: PropTypes.object.isRequired
};
