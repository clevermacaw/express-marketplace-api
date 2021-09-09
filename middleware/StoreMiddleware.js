const { userType } = require('../constants/EnumConst');

const StoreMiddleware = {
    store: (req, res, next) => {
        const { auth } = req;

        if (auth.type !== userType.store && !auth.Store && !auth.Store.id) {
            return failResponse(res, 'Unauthorized.');
        }

        next();
    }
}

module.exports = StoreMiddleware;
