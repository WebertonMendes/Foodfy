const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/ProfileController')

const ValidatorProfile = require('../app/validators/user')

// Routes - Profiles
routes.get('/', ValidatorProfile.profileShow, ProfileController.index) // Formulário com Dados do Usuário Logado
routes.put('/', ValidatorProfile.profileUpdate, ProfileController.put) // Enviando Dados Alterados do Usuário Logado

module.exports = routes