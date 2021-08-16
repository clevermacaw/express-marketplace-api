const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const { User } = require('../../../models');
const { modelError } = require('../../../helpers/Helper');

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
            var data = {
                status: 'success',
                message: 'Successfully register'
            }
            res.json(data);
        })
        .catch(function (error) {
            var errors = modelError(error);
            res.status(400).json(errors);
        });
    },

    login (req, res) {
		res.json('login');
    }
};

module.exports = AuthController;
