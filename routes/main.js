var router = require('express').Router()
var vulnDict = require('../config/vulns')
var authHandler = require('../core/authHandler')

module.exports = function (passport) {
	router.get('/', function (req, res) {
		res.render('home')
	})
	return router
}
