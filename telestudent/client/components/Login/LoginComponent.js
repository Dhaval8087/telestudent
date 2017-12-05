/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { Grid, Cell, Textfield, Button, Checkbox } from 'react-mdl';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import Loader from '../Common/Loader';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import {
  getcognitoUser,
  getAutheticationDetails,
  getCredentials,
  makeRequest
} from '../Common/getAWSSettings';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoad: false
    }
    this.autheticateAWS = this.autheticateAWS.bind(this);
  }
  autheticateAWS() {
    if (this.state.username != '' && this.state.password != '') {

      this.setState({ isLoad: true });
      var cognitoUser = getcognitoUser(this.state.username);
      cognitoUser.authenticateUser(getAutheticationDetails(this.state.username, this.state.password), {
        onSuccess: (result) => {
          getCredentials(result.getIdToken().getJwtToken(), () => {
            toastr.success('success');
            this.setState({ isLoad: false });
            this.context.router.push('/books');
          })
        },
        onFailure: (err) => {
          toastr.error(err);
          this.setState({ isLoad: false });
        },
      });
    }
    else {
      toastr.error('Please enter the required details !!');
    }
  }
  render() {
    return (
      <div className="loading">
        {this.state.isLoad ? <Loader /> : null}
        <Page heading='Sign in to continue to TeleStudent' >
          <div style={{ width: '70%', margin: 'auto' }} >
            <Grid>
              <div style={{ margin: 'auto' }}>
                <Cell col={12}>
                  <Textfield onChange={(event) => { this.setState({ username: event.target.value }) }} label='Username' />
                </Cell>
                <Cell col={12}>
                  <Textfield onChange={(event) => { this.setState({ password: event.target.value }) }} label='Password' type='password' />
                </Cell>
                <Cell col={12} style={{ textAlign: 'left' }}>
                  <Button primary raised accent onClick={this.autheticateAWS}>Login</Button>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
               <Link to='/signup'> <Button style={{ textAlign: 'right' }} primary raised accent >SignUp</Button></Link>
                </Cell>
              </div>
            </Grid>
          </div>
        </Page>
      </div>

    );
  }
}
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
