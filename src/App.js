
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import './App.css';
import Login from './Login/Login';
import Landing from './MkApp/Landing';
// Store imports
import { useSelector } from 'react-redux';
import { LOGIN_STATUS } from './slices/loginSlice';
import store from './store';

function App(props) {
    const storeLoginStatus = useSelector((state) => state.login.value);
    let history = useHistory();
    let location = useLocation();
    let [loginStatus, setLoginStatus] = useState(storeLoginStatus);
    function handleLogin() {
        if (loginStatus !== storeLoginStatus) {
            setLoginStatus(storeLoginStatus);
        }
    }
    const unsubscribe = props.store.subscribe(handleLogin);

    useEffect(() => {
        if ((loginStatus === LOGIN_STATUS.AUTHORIZED) && (location.pathname === '/index')) {
            history.push('/landing');
        }
        return () => {
            unsubscribe();
        }
    });

    function loginSwitch() {
        switch (loginStatus) {
            case LOGIN_STATUS.UNAUTHORIZED:
                return (
                    <Switch>
                        <Route exact path="/index">
                            <Login />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/index" />
                        </Route>
                    </Switch>
                );
            case LOGIN_STATUS.AUTHORIZED:
                return (
                    <Route exact path="/landing">
                        <Landing store={props.store}/>
                    </Route>
                );
        }
    }
    return (
        <>
        {loginSwitch()}
        <footer className="feet">Copyright © 2021 - Kevin Coscarelli</footer>
        </>
    );
}

export default App;
