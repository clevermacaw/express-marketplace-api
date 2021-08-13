var express = require('express');

const AuthController = {
    register (req, res) {
		res.json('reg');
    },

    login (req, res) {
		res.json('login');
    }
};

module.exports = AuthController;
