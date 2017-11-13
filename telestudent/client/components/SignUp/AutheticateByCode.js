import React from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import appConfig from "../../config";
Config.region = appConfig.region;

Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
});

export default class AutheticateByCode extends React.Component {
    constructor() {
        super()
        this.state = {
            authcode: '',

        }
        this.handleAuthetication = this.handleAuthetication.bind(this);
    }
    handleAuthetication() {
        var userData = {
            Username: this.props.params.email,
            Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(this.state.authcode, true, function (err, result) {
            if (err) {
                toastr.error(err);
                return;
            }
            else {
                this.context.router.push('/home');
            }

        }.bind(this));
    }
    render() {
        return (
            <Page heading='OTP Autetication'>
                <div style={{ width: '70%', margin: 'auto' }}>
                    <Grid>
                        <Cell col={12}>
                            <Textfield onChange={(event) => { this.setState({ authcode: event.target.value }) }} label='Enter OTP' />
                        </Cell>
                        <Cell col={12}>
                            <Button primary onClick={this.handleAuthetication}>Autheticate</Button>
                        </Cell>
                    </Grid>
                </div>
            </Page>
        );
    }
}
AutheticateByCode.contextTypes = {
    router: PropTypes.object.isRequired
};
