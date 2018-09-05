let jwt = require('jsonwebtoken');
let SECRET = require('../config/config.json').secret;

exports.generateTokenForUser = (userData) => {
    return jwt.sign(
        {
            username: userData.username
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    );
}

exports.getUserId = (authorization) => {
    let username = null;
    let token = parseAuthorization(authorization);
    if (token) {
        try {
            let jwtToken = jwt.verify(token, SECRET);
            if (jwtToken) {
                username = jwtToken.username;
            }
        } catch (err) {
            // Log error
        }
    }
    return username;
}

const parseAuthorization = (authorization) => {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
}