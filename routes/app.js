var router = require('express').Router()
var appHandler = require('../core/appHandler')
var authHandler = require('../core/authHandler')

module.exports = function() {
  router.post('/user', appHandler.user)
  router.post('/lfi', appHandler.lfi)
  router.post('/sql', appHandler.sql)
  router.post('/xss', appHandler.xss)

  return router
}
