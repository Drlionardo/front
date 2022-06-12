import Login from "./Login";
import {useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Alert, Box, Container} from "@mui/material";

const LoginForm = () => {
    const [principal, setPrincipal] = useState('');
    const [password, setPassword] = useState('');
    const [isSecondStage, setSecondStage] = useState(false)
    const [otp, setOtp] = useState('')
    const [statusMessage, setStatusMessage] = useState(null);


    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>

                    <Login password={password} setPassword={setPassword} principal={principal}
                           setPrincipal={setPrincipal}
                           isSecondStage={isSecondStage} setSecondStage={setSecondStage} otp={otp} setOtp={setOtp}
                           statusMessage={statusMessage} setStatusMessage={setStatusMessage}
                    />

                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default LoginForm