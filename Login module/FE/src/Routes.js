import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Login from './Login'
import Signup from './Signup'
import PrivateContent from './PrivateContent'
import ForgotPassword from './ForgotPassword'
import resetPassword from './ResetPassword'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/content" component={PrivateContent} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/resetPassword/:resetToken" component={resetPassword} />
                <Route path="*" component={() => 'Development in progress...'} />
            </Switch>
        </Router>
    );

}

export default Routes;