const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const { Op } = require('sequelize');
const { User } = require('../../../models');
const { successResponse, failResponse } = require('../../../helpers/Helper');
const { uploadFile, removeFile } = require('../../../helpers/FileHelper');
const { userImage } = require('../../../constants/UploadPathConst');
const { userType } = require('../../../constants/EnumConst');

const UserController = {
    profile: async (req, res) => {
        const auth = req.auth;
        var user = await getUser(auth.id, res);

        successResponse(res, null, user.toJSON());
    },

    update: async (req, res) => {
        const { auth, body } = req;
        var user = await getUser(auth.id, res);
        var image = req.files && req.files.image ? req.files.image : null;
        var imageName = null;
        try {
            imageName = uploadFile(image, userImage);
        } catch(e) {
            return failResponse(res, e.message, 'image');
        }

        // old image
        if (!image && user.image) {
            imageName = user.image;
        }

        user.update({
            email: body.email,
            name: body.name,
            image: imageName
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

    deviceToken: async (req, res) => {
        const { auth, body } = req;

        var user = await getUser(auth.id, res);
        user.update({
            device_token: body.device_token
        })
        .then( updatedRecord => {
            successResponse(res, 'Successfully update device token');
        });
    }
};

const getUser = async (id, res) => {
    var user = await User.findByPk(id, {
        where: {
            type: {
                [Op.or]: [userType.customer, userType.store]
            }
        }
    });

    if (!user) {
        return failResponse(res, 'Data not found.');
    }

    return user;
}

module.exports = UserController;
