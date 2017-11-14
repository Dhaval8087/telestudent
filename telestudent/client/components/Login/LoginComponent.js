/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { Grid, Cell, Textfield, Button, Checkbox } from 'react-mdl';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { getcognitoUser, 
  getAutheticationDetails, 
  getCredentials, 
  streamToString,
  makeRequest
} from '../Common/getAWSSettings';

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
    /* if (this.state.username === 'admin' && this.state.password === "admin") {
       this.context.router.push('/home');
     }
     else {
       toastr.error('Please enter the required details !!');
     }*/
    this.autheticateAWS();

  }
  autheticateAWS() {
    var that=this;
    var cognitoUser = getcognitoUser(this.state.username);
    cognitoUser.authenticateUser(getAutheticationDetails(this.state.username, this.state.password), {
      onSuccess: function (result) {
          getCredentials(result.getIdToken().getJwtToken(),()=>{
           toastr.success('success');
           that.context.router.push('/home');
           makeRequest();
          })
      },

      onFailure: function (err) {
        toastr.error(err);
      },
    });
    
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
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 <Link to='/signup'> <Button style={{ textAlign: 'right' }} primary raised accent >SignUp</Button></Link>
              </Cell>

            </div>
          </Grid>
        </div>
      </Page>
    );
  }
}
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
