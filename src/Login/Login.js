import { useState } from 'react';
import { setInputValue } from '../helpers/helpers';
import { loginPOST, STATUS } from '../services/services';
import './Login.css';
import MkLogo from '../helpers/MkLogo';
// Store Imports
import { useDispatch } from 'react-redux';
import { allow, deny } from '../slices/loginSlice';

function Login() {
    const LOGIN_STATUS = {
        ACCEPTED: 'ACCEPTED',
        UNAUTHORIZED: 'UNAUTHORIZED',
        PENDING: 'PENDING'
    };
    const storeDispatch = useDispatch();

    let [pwd, setPwd] = useState('');
    let [usr, setUsr] = useState('');
    let [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

    function loginSubmit(event) {
        event.preventDefault();

        loginPOST(usr, pwd).then((res) => {
            if (res.status === STATUS.ACCEPTED) {
                setLoginStatus(LOGIN_STATUS.ACCEPTED);
                storeDispatch(allow());
            } else if (res.status === STATUS.UNAUTHORIZED) {
                setLoginStatus(LOGIN_STATUS.UNAUTHORIZED);
                storeDispatch(deny());
            }
        });
    }

    function validationMsgHandler(status) {
        switch (status) {
            case LOGIN_STATUS.UNAUTHORIZED:
                return (<h5 className="val-msg" id="loginErrorMsg">Usuario y/o contraseña inválido.</h5>);
            case LOGIN_STATUS.ACCEPTED:
                return (<h5 className="val-msg" id="loginSuccessMsg">Login was succesful</h5>);
            default:
                return;
        }
    }

    return (
        <>
            <div className="container">
                <div className="login-logo">
                    <MkLogo />
                </div>
                <form id="loginForm" className="login-form">
                    <div className="input-group">
                        <input id="loginUsername" type="text" value={usr} onChange={setInputValue(setUsr)} required />
                        <label>Usuario</label>
                    </div>
                    <div className="input-group">
                        <input id="loginPassword" type="password" value={pwd} onChange={setInputValue(setPwd)} required />
                        <label>Contraseña</label>
                    </div>
                    <a className="button primary-button" id="loginSubmit" onClick={loginSubmit}>Ingresar</a>
                    <a href="#" className="button plain-button">Registrarse</a>
                    {validationMsgHandler(loginStatus)}
                </form>
            </div>
        </>
    );
}

export default Login;