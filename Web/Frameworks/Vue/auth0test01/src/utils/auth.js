import auth0 from "auth0-js";
import Oidc from 'oidc-client';

const mgr = new Oidc.UserManager({
    authority: 'https://login-staging.bimdata.io',
    client_id: '145056',
    redirect_uri: 'http://localhost:8080/callback',
    response_type: 'id_token token',
    scope: 'openid profile',
  });

const webAuth = new auth0.WebAuth({
    domain: 'login-staging.bimdata.io',
    clientID: '145056',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'id_token token',
    scope: 'openid profile'
});

let token = {};
let userProfile  = {};

const login = async function () {
    // eslint-disable-next-line
    await mgr.signinRedirect();
};

const afterLoggedIn = async () => {
    const user = await mgr.signinRedirectCallback();
    token.accessToken = user.access_token;
}

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

const getToken = () => {
    return token;
}

const isLoggedIn = () => {
    return token.accessToken;
}

const logout = () => {
    token.accessToken = null;
    // [Object.keys(token)].forEach(key => token[key] = null);
};

export {
    login,
    handleAuth,
    isLoggedIn,
    logout,
    getProfile,
    afterLoggedIn,
    getToken,
};