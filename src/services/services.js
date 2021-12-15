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

function mealsGET() {
    const url = baseApiURL.concat('/get-meals');
    return fetchAPI(url, {
        method: 'get',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json());
}

export {
    STATUS,
    loginPOST,
    mealsGET
};