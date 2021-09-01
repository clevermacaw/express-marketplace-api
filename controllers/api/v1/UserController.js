const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const { User } = require('../../../models');
const { successResponse } = require('../../../helpers/Helper');

const UserController = {
    profile: async (req, res) => {
        const auth = req.auth;
        var user = await User.findOne({ where: {id: auth.id} });
        if (!user) {
            throw new Error('Data not found.');
        }

        successResponse(res, null, user.toJSON());
    },
};

module.exports = UserController;
