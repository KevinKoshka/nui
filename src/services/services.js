import {
    baseApiURL,
    fetchAPI
} from '../helpers/helpers';

const STATUS = {
    ACCEPTED: 202,
    UNAUTHORIZED: 401
}

function loginPOST(username, password) {
    const url = baseApiURL.concat('/index/login');
    const reqParams = JSON.stringify({
        "username": username,
        "password": password
    });
    return fetchAPI(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: reqParams,
    });
}

export {
    STATUS,
    loginPOST
};