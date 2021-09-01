const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { User } = require('../../../../models');

const UserValidator = {
    update: [
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email can not be empty.')
			.bail()
			.normalizeEmail()
			.isEmail()
			.withMessage('Invalid email address.')
			.custom(async (value, {req, loc, path}) => {
				const user = await User.findOne({
					where: {
						email: value,
						id: {
			                [Op.not]: req.auth.id
			            }
			        }
		        });
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
	],

	changePassword: [
		check('password')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Password can not be empty.')
			.bail()
			.isLength({min: 6})
			.withMessage('Minimum 6 characters required.'),
		check('new_password')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('New password can not be empty.')
			.bail()
			.isLength({min: 6})
			.withMessage('Minimum 6 characters required.'),
		check('new_password_confirmation')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Password confirmation can not be empty.')
			.bail()
			.custom((value, {req, loc, path}) => {
	            if (value !== req.body.new_password) {
	                throw new Error('Password confirmation is not match.');
	            } else {
	                return value;
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

module.exports = UserValidator;
