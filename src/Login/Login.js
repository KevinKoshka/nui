import { useState } from 'react';
import { setInputValue } from '../helpers/helpers';
import { loginPOST, STATUS } from '../services/services';
import './Login.css';

function Login() {
    const LOGIN_STATUS = {
        ACCEPTED: 'ACCEPTED',
        UNAUTHORIZED: 'UNAUTHORIZED',
        PENDING: 'PENDING'
    };

    let [pwd, setPwd] = useState('');
    let [usr, setUsr] = useState('');
    let [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

    function loginSubmit(event) {
        event.preventDefault();

        loginPOST(usr, pwd).then((res) => {
            if (res.status === STATUS.ACCEPTED) {
                setLoginStatus(LOGIN_STATUS.ACCEPTED);
            } else if (res.status === STATUS.UNAUTHORIZED) {
                setLoginStatus(LOGIN_STATUS.UNAUTHORIZED);
            }
        });
    }

    function validationMsgHandler(status) {
        switch (status) {
            case LOGIN_STATUS.UNAUTHORIZED:
                return (<h5 className="val-msg" id="loginErrorMsg">Login failed</h5>);
            case LOGIN_STATUS.ACCEPTED:
                return (<h5 className="val-msg" id="loginSuccessMsg">Login was succesful</h5>);
            default:
                return;
        }
    }

    return (
        <>
        <div className="container">
            <form id="loginForm" className="login-form">
                <h2 className="login-header-msg">Welcome to nServer</h2>
                <div className="input-group">
                    <label>Username</label>
                    <input id="loginUsername" type="text" value={usr} onChange={setInputValue(setUsr)} required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input id="loginPassword" type="password" value={pwd} onChange={setInputValue(setPwd)} required />
                </div>
                <button id="loginSubmit" onClick={loginSubmit}>Send</button>
            </form>
        
            {validationMsgHandler(loginStatus)}
        </div>
        </>
    );
}

export default Login;