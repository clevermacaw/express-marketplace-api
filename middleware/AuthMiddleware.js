const jwt = require('jsonwebtoken');
const { auth, responseFail } = require('../helpers/Helper');

const AuthMiddleware = {
    auth: (req, res, next) => {
        var headers = req.headers;
        var bearer_token = headers.authorization;
        bearer_token = bearer_token.replace('Bearer ', '');

        try {
            var decoded = jwt.verify(bearer_token, process.env.TOKEN_SECRET);

            // pass data to request
            req.auth = decoded;
        } catch(err) {
            console.log('err', err)
            return responseFail(res, 'Invalid token.');
        }

        next();
    }
}

module.exports = AuthMiddleware;
