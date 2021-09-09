const { Store, User, sequelize } = require('../../../models');
const { modelError, successResponse, failResponse } = require('../../../helpers/Helper');
const { uploadFile, removeFile } = require('../../../helpers/FileHelper');
const { userImage } = require('../../../constants/UploadPathConst');
const { userType, storeStatus } = require('../../../constants/EnumConst');

const StoreController = {
    register: async (req, res) => {
        const { auth, body } = req;
        var user = await getUser(res, auth.id, userType.customer);

        try {
            await sequelize.transaction(async (t) => {
                await Promise.all([
                    // create store
                    Store.create({
                        user_id: user.id,
                        name: body.name,
                        domain: body.domain,
                        city_id: body.city_id,
                        status: storeStatus.active,
                    }),

                    // update user type
                    user.update({
                        type: userType.store
                    })
                ]);
            });

            successResponse(res, 'Successfully register store.');

        } catch (error) {
            res.status(400).json(error);
        }
    },

    profile: async (req, res) => {
        const { auth } = req;

        var store = await Store.findByPk(auth.Store.id, {
            include: 'city',
            attributes: { exclude: ['user_id', 'UserId', 'cityId'] }
        });

        if (!store) {
            return failResponse(res, 'Data not found.');
        }

        successResponse(res, null, store);
    }
};

const getUser = async (res, id, type=userType.store) => {
    var user = await User.findOne({
        where: {
            id: id,
            type: type
        },
        include: 'Store'
    });

    if (!user) {
        return failResponse(res, 'Data not found.');
    }

    return user;
}

module.exports = StoreController;
