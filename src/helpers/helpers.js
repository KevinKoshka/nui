const baseApiURL = 'http://localhost:8000';
Object.freeze(baseApiURL);
const CORS = {
    "Access-Control-Allow-Origin": baseApiURL,
    "Access-Control-Allow-Methods": "POST, GET, PATCH, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true"
};
Object.freeze(CORS);

function setInputValue(valueSetter) {
    return (event) => {
        valueSetter(event.target.value);
    }
}

function fetchAPI(input, init) {
    init.headers = { ...init.headers, ...CORS };
    return fetch(input, init);
}

export {
    baseApiURL,
    CORS,
    setInputValue,
    fetchAPI
}