const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const { Op } = require('sequelize');
const { User } = require('../../../models');
const { successResponse, failResponse } = require('../../../helpers/Helper');

const UserController = {
    profile: async (req, res) => {
        const auth = req.auth;
        var user = await getUser(auth.id, res);

        successResponse(res, null, user.toJSON());
    },

    update: async (req, res) => {
        const { auth, body } = req;

        var user = await getUser(auth.id, res);
        user.update({
            email: body.email,
            name: body.name
        })
        .then( updatedRecord => {
            successResponse(res, null, updatedRecord.toJSON());
        });
    },

    changePassword: async (req, res) => {
        const { auth, body } = req;

        var user = await getUser(auth.id, res);
        var check = bcrypt.compareSync(body.password, user.password);
        if (!check) {
            return failResponse(res, 'Password is invalid.', 'password');
        }

        user.update({
            password: bcrypt.hashSync(body.new_password, salt),
        })
        .then( updatedRecord => {
            successResponse(res, 'Successfully change password.');
        });
    },
};

const getUser = async (id, res) => {
    var user = await User.findOne({
        where: {
            id: id,
            type: {
                [Op.or]: ['Customer', 'Merchant']
            }
        }
    });

    if (!user) {
        return failResponse(res, 'Data not found.');
    }

    return user;
}

module.exports = UserController;
