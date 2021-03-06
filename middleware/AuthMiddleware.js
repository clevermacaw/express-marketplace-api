const jwt = require('jsonwebtoken');
const { auth, failResponse } = require('../helpers/Helper');

const AuthMiddleware = {
    auth: (req, res, next) => {
        var headers = req.headers;
        var bearer_token = headers.authorization;

        if (!bearer_token) {
            return failResponse(res, 'Unauthorized.');
        }

        bearer_token = bearer_token.replace('Bearer ', '');

        try {
            var decoded = jwt.verify(bearer_token, process.env.TOKEN_SECRET);

            // pass data to request
            req.auth = decoded;
        } catch(err) {
            return failResponse(res, 'Invalid token.');
        }

        next();
    }
}

module.exports = AuthMiddleware;
