const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const { modelError, responseSuccess, responseFail } = require('../../../helpers/Helper');

const AuthController = {
    register: (req, res) => {
        const body = req.body;
        User.create({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, salt),
            type: 'Customer',
        })
        .then(function(item) {
            responseSuccess(res, 'Successfully register.');
        })
        .catch(function (error) {
            var errors = modelError(error);
            res.status(400).json(errors);
        });
    },

    login: async (req, res) => {
        const body = req.body;
        const user = await User.findOne({ where: {email: body.email, type: 'Customer'} });
        if (!user) {
            return responseFail(res, 'Email not found.', 'email');
        }

        var check = bcrypt.compareSync(body.password, user.password);
        if (!check) {
            return responseFail(res, 'Password is invalid.', 'password');
        }

        var token_data = user.get();
        delete token_data.password;

        var token = jwt.sign(token_data, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return responseSuccess(res, null, token);
    }
};

module.exports = AuthController;
