var express = require('express');
const {check, body, validationResult} = require('express-validator');

const AuthValidator = {
    register : [
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email can not be empty.')
			.bail()
			.normalizeEmail()
			.isEmail()
			.withMessage('Invalid email address.'),
		check('name')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Name can not be empty.'),
		check('password')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Password can not be empty.')
			.bail()
			.isLength({min: 6})
			.withMessage('Minimum 6 characters required.'),
		check('password_confirmation')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Password can not be empty.')
			.bail()
			.isLength({min: 6})
			.withMessage('Minimum 6 characters required.')
			.custom((value, {req, loc, path}) => {
	            if (value !== req.body.password) {
	                // trow error if passwords do not match
	                throw new Error('Password confirmation is not match.');
	            } else {
	                return value;
	            }
	        }),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(422).json({errors: errors.array()});
			next();
		},
	],

    login : [
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email can not be empty.')
			.bail()
			.normalizeEmail()
			.isEmail()
			.withMessage('Invalid email address.'),
		check('password')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Password can not be empty.')
			.bail()
			.isLength({min: 6})
			.withMessage('Minimum 6 characters required.'),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(422).json({errors: errors.array()});
			next();
		},
	]
};

module.exports = AuthValidator;
