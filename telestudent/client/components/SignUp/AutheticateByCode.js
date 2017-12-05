import React from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { getcognitoUser } from '../Common/getAWSSettings';
import Loader from '../Common/Loader';
export default class AutheticateByCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authcode: '',
            isLoad: false
        }
        this.handleAuthetication = this.handleAuthetication.bind(this);
        this.resendOTP = this.resendOTP.bind(this);
    }
    handleAuthetication() {
        this.setState({ isLoad: true });
        var cognitoUser = getcognitoUser(this.props.params.email);
        cognitoUser.confirmRegistration(this.state.authcode, true, function (err, result) {
            this.setState({ isLoad: false });
            if (err) {
                toastr.error(err);
                return;
            }
            else {
                this.context.router.push('/');
            }
        }.bind(this));
    }
    resendOTP() {
        var cognitoUser = getcognitoUser(this.props.params.email);
        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                toastr.error(err);
                return;
            }
            else {
                toastr.success("Re send successfully !!");
            }
        });
    }
    render() {
        return (
            <div className="loading">
                {this.state.isLoad ? <Loader /> : null}
                <Page heading='OTP Autetication'>
                    <div style={{ width: '70%', margin: 'auto' }}>
                        <Grid>
                            <Cell col={12}>
                                <Textfield onChange={(event) => { this.setState({ authcode: event.target.value }) }} label='Enter OTP' />
                            </Cell>
                            <Cell col={12}>
                                <Button primary onClick={this.handleAuthetication}>Autheticate</Button>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <Button onClick={this.resendOTP}>Re-Send</Button>
                            </Cell>
                        </Grid>
                    </div>
                </Page>
            </div>
        );
    }
}
AutheticateByCode.contextTypes = {
    router: PropTypes.object.isRequired
};
