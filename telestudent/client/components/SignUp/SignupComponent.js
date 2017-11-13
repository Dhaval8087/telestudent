import React from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import appConfig from "../../config";
Config.region = appConfig.region;

Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

export default class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      repassword: ''
    }
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleSignUp() {
    if (this.state.password != this.state.repassword) {
      toastr.error('Password not matched !!');
    }
    else {
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
        this.context.router.push({    // use push
            pathname: `/auth/${result.user.getUsername()}`,
        });
        //this.context.router.push('/auth');
        /*console.log('user name is ' + result.user.getUsername());
        console.log('call result: ' + result);*/
      });
    }
  }
  render() {
    return (
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
            </Cell>
          </Grid>
        </div>
      </Page>
    );
  }
}
Signup.contextTypes = {
  router: PropTypes.object.isRequired
};
