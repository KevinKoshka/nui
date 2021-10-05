
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Login from './Login/Login';

function App() {
    return (
        <Switch>
            <Route exact path='/index'>
                <Login />
            </Route>
            <Route exact path='/'>
                <Redirect to="/index" />
            </Route>
        </Switch>
    );
}

export default App;
