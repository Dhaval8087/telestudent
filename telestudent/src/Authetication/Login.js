import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './login.css';
import toastr from 'toastr';
class Login extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            username: 'admin',
            password: 'admin'
        }
        this.setState({});
    }
    handleClick(event)
    {
        if(this.state.username==='admin' && this.state.password==="admin")
        {
           
        }
        else 
        {
            toastr.error('Please enter the required details !!');
        }

        
    }
    render() {
        return (
            <div className="main">
                <MuiThemeProvider>
                <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title">Sign in to continue to TeleStudent</h1>
                        <div className="account-wall">
                            <img className="profile-img" src={require('../Images/user.png')} />
                            <form className="form-signin">
                             <TextField
                                                    hintText="Enter your Username"
                                                    floatingLabelText="Username"
                                                    onChange={(event, newValue) => this.setState({ username: newValue })}
                                                />
                            <TextField
                                                    type="password"
                                                    hintText="Enter your Password"
                                                    floatingLabelText="Password"
                                                    onChange={(event, newValue) => this.setState({ password: newValue })}
                                                />					
                           
                             <RaisedButton label="Submit" primary={true} className={style} onClick={(event) => this.handleClick(event)} />              
                            </form>
                        </div>
                    
                    </div>
                </div>
            </div>

                </MuiThemeProvider>

            </div>
        );
    }
}
const style = {
    margin: 15,
};

export default Login;