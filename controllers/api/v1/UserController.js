const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const { User } = require('../../../models');
const { successResponse } = require('../../../helpers/Helper');

const UserController = {
    profile: async (req, res) => {
        const auth = req.auth;
        var user = await User.findOne({
            where: {
                id: auth.id
            }
        });

        if (!user) {
            throw new Error('Data not found.');
        }

        successResponse(res, null, user.toJSON());
    },

    update: async (req, res) => {
        const { auth, body } = req;

        User.findOne({
            where: {
                id: auth.id
            }
        })
        .then(record => {
            if (!record) {
                throw new Error('Data not found.')
            }

            record.update({
                email: body.email,
                name: body.name
            })
            .then( updatedRecord => {
                successResponse(res, null, updatedRecord.toJSON());
            });
        })
        .catch((error) => {
            throw new Error('Failed to update user.')
        });
    },
};

module.exports = UserController;
