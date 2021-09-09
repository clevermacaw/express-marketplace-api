const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../../../models');
const { modelError, successResponse, failResponse } = require('../../../helpers/Helper');
const { userType } = require('../../../constants/EnumConst');

const AuthController = {
    register: (req, res) => {
        const body = req.body;
        User.create({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, salt),
            type: userType.customer,
        })
        .then(function(item) {
            successResponse(res, 'Successfully register.');
        })
        .catch(function (error) {
            var errors = modelError(error);
            res.status(400).json(errors);
        });
    },

    login: async (req, res) => {
        const body = req.body;
        const user = await User.findOne({
            where: {
                email: body.email,
                type: {
                    [Op.or]: [userType.customer, userType.store]
                }
            },
            include: 'Store'
        });
        if (!user) {
            return failResponse(res, 'Email not found.', 'email');
        }

        var check = bcrypt.compareSync(body.password, user.password);
        if (!check) {
            return failResponse(res, 'Password is invalid.', 'password');
        }

        var token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, { expiresIn: '30d' });
        return successResponse(res, null, token);
    }
};

module.exports = AuthController;
