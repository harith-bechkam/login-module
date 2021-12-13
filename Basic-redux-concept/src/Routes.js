
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home'
import Content from './Content'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/content" component={Content} />
                <Route path="*" component={() => 'Development in progress...'} />
            </Switch>
        </Router>
    );

}

export default Routes;