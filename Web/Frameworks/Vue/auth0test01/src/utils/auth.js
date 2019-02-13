import auth0 from "auth0-js";

const webAuth = new auth0.WebAuth({
    domain: 'kurtil01.eu.auth0.com',
    clientID: 'jTWbDfwLg22gEZNB6oeRSgOPr2UCl2lN',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
});

let token = {};
let userProfile  = {};

const login = () => {
    webAuth.authorize();
};

const handleAuth = cb => {
    webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            token.accessToken = authResult.accessToken;
            token.idToken = authResult.idToken;
            token.expiry = (new Date()).getTime() + authResult.expiresIn * 1000;
            userProfile = authResult.idTokenPayload;
            cb();
        } else {
            // eslint-disable-next-line
            console.log(err);
        }
    });
};

const getProfile = () => {
    return userProfile;
}

const isLoggedIn = () => {
    return token.accessToken && (new Date()).getTime() < token.expiry
}

const logout = () => {
    token = {};
    // [Object.keys(token)].forEach(key => token[key] = null);
};

export {
    login,
    handleAuth,
    isLoggedIn,
    logout,
    getProfile,
};