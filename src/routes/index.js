const express = require('express')
const routes = express.Router()

const site = require('./site')
const login = require('./login')
const recipes = require('./recipes')
const chefs = require('./chefs')
const users = require('./users')
const profile = require('./profile')

const { redirectToLogin } = require('../app/middlewares/session')

// Routes - Site
routes.use('/', site)

// Routes - Alias
routes.get('/admin', redirectToLogin)

// Routes - Admin
routes.use('/admin/recipes', redirectToLogin, recipes)
routes.use('/admin/chefs', redirectToLogin, chefs)
routes.use('/admin/users', redirectToLogin, users)
routes.use('/admin/profile', redirectToLogin, profile)

// Routes - Login
routes.use('/login', login)

// Routes - Error 404
routes.use(function(req, res) {
    res.status(404).render('not-found')
})
  
module.exports = routes