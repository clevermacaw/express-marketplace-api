const { userType } = require('../constants/EnumConst');
const { failResponse } = require('../helpers/Helper');

const StoreMiddleware = {
    store: (req, res, next) => {
        const { auth } = req;

        if (auth.type !== userType.store || !auth.store && !auth.store.id) {
            return failResponse(res, 'Unauthorized.');
        }

        next();
    }
}

module.exports = StoreMiddleware;
