import { Component } from "react";
import Typography from '@mui/material/Typography';


class PrivateContent extends Component {

    logoutHandler = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-id");
        this.props.history.push("/")
    }

    render() {
        return (
            <center>
                <Typography>
                    You are viewing private Content page
                </Typography>
                <button onClick={this.logoutHandler}>Logout</button>
            </center>
        );
    }
}

export default PrivateContent;