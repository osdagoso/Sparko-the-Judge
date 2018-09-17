import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            username: '',
            password: '',
            attemptedLogin: false,
            openSnackbar: false,
            snackbarMessage: '',
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.loginChange = this.loginChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
    }

    handleLogin () {
        const { username, password } = this.state;
        this.setState({attemptedLogin: true})
        axios.post('http://127.0.0.1:5000/AuthenticateUser',{
            username: username,
            password: password
        })
        .then(response => {
            if (response.data.status === 200){
                this.setState({userId: response.data.UserId})
            }
            else if (response.data.status === 100){
                this.setState({openSnackbar: true, snackbarMessage: response.data.message})
            }
        })
        .then(response => {
            this.props.loginChanged(this.state.userId !== '')
        })
        .catch((error) => {
              console.log(error);
        });
    }

    handleClose() {
        this.setState({openSnackbar: false})
    }

    loginChange (event) {
        this.setState({username: event.target.value})
    }

    passwordChange (event) {
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <center>
            <Card style={{raised: true, width: '25%', margin: '50px'}} >
                <CardHeader
                  style={{titleColor: "inherit", color: "inherit"}}
                  title="Login"
                />
                <CardContent>
                    <TextField
                        id="login"
                        label="Username"
                        margin="none"
                        error={this.state.username === "" && this.state.attemptedLogin}
                        helperText={this.state.username === "" && this.state.attemptedLogin ? "Username is required" : ""}
                        style = {{width: '90%'}}
                        onChange={this.loginChange}
                    />
                    <br/>
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        margin="none"
                        error={this.state.password === "" && this.state.attemptedLogin}
                        helperText={this.state.password === "" && this.state.attemptedLogin ? "Password is required" : ""}
                        style = {{width: '90%'}}
                        onChange={this.passwordChange}
                    />
                    <br/>
                    <br/>
                    <Button
                        variant="contained"
                        margin="normal"
                        color="primary"
                        type="submit"
                        style= {{width: '30%', backgroundColor: "#0F2027", titleColor: "#FFFFFF"}}
                        onClick={this.handleLogin.bind()}
                    >
                    Login
                    </Button>
                    <br/>
                    <br/>
                    <Button
                        variant="contained"
                        margin="normal"
                        color="primary"
                        type="submit"
                        style= {{width: '30%', backgroundColor: "#0F2027", titleColor: "#FFFFFF"}}
                    >
                    Create Account
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={this.state.openSnackbar}
                onClose={this.handleClose}
                autoHideDuration={4000}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.snackbarMessage}</span>}
            />
            </center>
        );
      }
}

export default Login;