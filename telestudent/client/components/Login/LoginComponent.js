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
  streamToString,
  makeRequest,
  getAllBucket
} from '../Common/getAWSSettings';
var that;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'erdhavalpatel@yahoo.com',
      password: 'Thomson123*',
      isLoad: false
    }
    that = this;
    this.autheticateAWS = this.autheticateAWS.bind(this);
  }
  autheticateAWS() {
    if (this.state.username != '' && this.state.password != '') {

      that.setState({ isLoad: true });
      var cognitoUser = getcognitoUser('erdhavalpatel@yahoo.com');
      cognitoUser.authenticateUser(getAutheticationDetails('erdhavalpatel@yahoo.com', 'Thomson123*'), {
        onSuccess: function (result) {
          getCredentials(result.getIdToken().getJwtToken(), () => {
            toastr.success('success');
            that.setState({ isLoad: false });
            that.context.router.push('/books');
          })
        },
        onFailure: function (err) {
          toastr.error(err);
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
