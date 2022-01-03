import { Component } from "react";
import { connect } from 'react-redux';
import { forgotPassword } from './store/actions'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';





class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            error_text: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const datas = {}
        datas.email = data.get('email')
        this.props.dispatch(forgotPassword(this, datas))
    };

    render() {

        return (
            // <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    {this.state.error_text === false ? <h3 style={{ color: "green" }}>{this.props.forgot.message}</h3> : <h3 style={{ color: "red" }}>{this.state.error_text}</h3>}
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Email
                        </Button>
                    </Box>
                </Box>
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.loggedReducer.q,
        forgot: state.loggedReducer.forgot
    }
}

export default connect(
    mapStateToProps
)(ForgotPassword);


