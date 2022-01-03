import { Component } from "react";
import { connect } from 'react-redux';
import { resetPassword } from './store/actions'
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





class ResetPassword extends Component {

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
        datas.password = data.get('password')
        this.props.dispatch(resetPassword(this, datas))
    };

    // submit = (event) => {
    //     console.log("submitted"+event)
    // }

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
                        Reset Password
                    </Typography>
                    {this.state.error_text === false ? <h3 style={{ color: "green" }}>{this.props.reset.message}</h3> : <h3 style={{ color: "red" }}>{this.state.error_text}</h3>}
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                        />
                        {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Confirm password"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="new-password"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // onClick={this.submit}
                        >
                            Change
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
        reset: state.loggedReducer.reset
    }
}

export default connect(
    mapStateToProps
)(ResetPassword);


