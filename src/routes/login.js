const express = require('express')
const routes = express.Router()

const LoginController = require('../app/controllers/LoginController')
const ValidatorLogin = require('../app/validators/login')

// Routes - Login, Logout
routes.get('/', LoginController.login)
routes.post('/', ValidatorLogin.post, LoginController.post)
routes.post('/logout', LoginController.logout)

// Routes - Forgot, Reset Password 
routes.get('/forgot', LoginController.forgotForm)
routes.get('/reset', LoginController.resetForm)
routes.post('/forgot', ValidatorLogin.forgot, LoginController.forgot)
routes.post('/reset', ValidatorLogin.reset, LoginController.reset)

module.exports = routes