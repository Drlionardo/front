import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Link from '@mui/material/Link';
import {
    Link as RouterLink,
} from 'react-router-dom';
import LoginService from "../service/LoginService";
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";

const Login = ({
                   password,
                   setPassword,
                   principal,
                   setPrincipal,
                   isSecondStage,
                   setSecondStage,
                   otp,
                   setOtp,
                   statusMessage,
                   setStatusMessage
               }) => {
    const handleOtpChange = (event) => {
        setOtp(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handlePrincipalChange = (event) => {
        setPrincipal(event.target.value)
    }

    function setAuthHeader(body) {
        localStorage.setItem('jwt', body.headers['authorization'])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let requestBody = {};
        if (isEmail(principal)) {
            requestBody.email = principal;
        } else {
            requestBody.username = principal
        }

        if (isSecondStage) {
            requestBody.otp = otp;
        } else {
            requestBody.password = password;
        }

        LoginService.login(requestBody).then((body) => {
            if (isSecondStage) {
                setAuthHeader(body)
            } else {
                setSecondStage(true)
                setStatusMessage({
                    message: 'We want to make sure it is really you. Please fill one time code that was sent to email',
                    status: 'success'
                })
            }
        }).catch((error) => {
            if (isSecondStage) {
                setStatusMessage({message: 'Invalid one time code', status: 'error'})
                setOtp('')
            } else {
                setStatusMessage({message: 'Invalid credentials', status: 'error'})
                setPassword('')
            }
            console.log(error)
        })
    };

    return (
        <div>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    onChange={handlePrincipalChange}
                    value={principal}
                    margin="normal"
                    required
                    fullWidth
                    id="emailOrUsername"
                    label="Email or Username"
                    name="emailOrUsername"
                    autoComplete="email"
                    autoFocus
                    disabled={isSecondStage}
                />

                {isSecondStage ?
                    <TextField
                        onChange={handleOtpChange}
                        value={otp}
                        margin="normal"
                        required
                        fullWidth
                        name="otp"
                        label="Otp"
                        type="password"
                        id="otp"
                    />
                    :
                    <TextField
                        onChange={handlePasswordChange}
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                }
                {statusMessage ? <Alert severity={statusMessage.status}>{statusMessage.message}</Alert> : null}


                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link component={RouterLink} to="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={RouterLink} to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
        ;
}

function isEmail(email) {
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
}

export default Login
