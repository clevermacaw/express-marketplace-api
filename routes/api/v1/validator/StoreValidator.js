const { check, validationResult } = require('express-validator');
const { City, Store } = require('../../../../models');

const StoreValidator = {
    register: [
		check('name')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Store name can not be empty.')
			.bail()
			.isLength({min: 2})
			.withMessage('Minimum 2 characters required.')
			.bail()
			.custom(async (value) => {
				const store = await Store.findOne({
					where: {
						name: value
			        }
		        });
	            if (store) {
	                throw new Error('Store name has been taken.');
	            }
	        }),
		check('domain')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Store domain can not be empty.')
			.bail()
			.isLength({min: 2})
			.withMessage('Minimum 2 characters required.')
			.bail()
			.custom(async (value) => {
				const store = await Store.findOne({
					where: {
						domain: value
			        }
		        });
	            if (store) {
	                throw new Error('Store domain has been taken.');
	            }
	        }),
		check('city_id')
			.trim()
			.notEmpty()
			.withMessage('City can not be empty.')
			.bail()
			.custom(async (value) => {
				const city = await City.findOne({
					where: {
						id: value
			        }
		        });
	            if (!city) {
	                throw new Error('City not found.');
	            }
	        }),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({errors: errors.array()});
			next();
		},
	],
};

module.exports = StoreValidator;
