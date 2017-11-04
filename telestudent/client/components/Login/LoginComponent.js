/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { Grid, Cell, Textfield, Button, Checkbox } from 'react-mdl';
import Page from '../Page/PageComponent';
import toastr from 'toastr';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    if (this.state.username === 'admin' && this.state.password === "admin") {
      this.context.router.push('/home');
    }
    else {
      toastr.error('Please enter the required details !!');
    }

  }
  render() {
    return (
      <Page heading='Sign in to continue to TeleStudent'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <Grid>
            <div style={{ margin: 'auto' }}>
              <Cell col={12}>
                <Textfield onChange={(event) => { this.setState({ username: event.target.value }) }} label='Username' />
              </Cell>
              <Cell col={12}>
                <Textfield onChange={(event) => { this.setState({ password: event.target.value }) }} label='Password' type='password' />
              </Cell>
              <Cell col={12} style={{ textAlign: 'left' }}>
                <Button primary raised accent onClick={this.handleLogin}>Login</Button>
              </Cell>
            </div>
          </Grid>
        </div>
      </Page>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};
