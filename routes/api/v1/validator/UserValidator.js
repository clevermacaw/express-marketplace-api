const { check, validationResult } = require('express-validator');
const { User } = require('../../../../models');

const UserValidator = {
    update : [
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email can not be empty.')
			.bail()
			.normalizeEmail()
			.isEmail()
			.withMessage('Invalid email address.')
			.custom(async (value) => {
				const user = await User.findOne({ where: {email: value} });
	            if (user) {
	                throw new Error('Email has been taken.');
	            }
	        }),
		check('name')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Name can not be empty.')
			.bail()
			.isLength({min: 2})
			.withMessage('Minimum 2 characters required.'),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({errors: errors.array()});
			next();
		},
	]
};

module.exports = UserValidator;
