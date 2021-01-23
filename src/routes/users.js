const express = require('express')
const routes = express.Router()

const { routeOnlyAdmins } = require('../app/middlewares/session')

const UsersController = require('../app/controllers/UsersController')

const ValidatorAccess = require('../app/validators/access')
const ValidatorUser = require('../app/validators/user')

// Routes - Users
routes.get('/', routeOnlyAdmins, UsersController.index) // Admin - Index Visualizar a Lista de Usuários
routes.get('/create', ValidatorAccess.permissionUsersRoutes, UsersController.create) // Admin - Criar um Novo Usuário
routes.get('/:id/edit', ValidatorAccess.permissionUsersRoutes, UsersController.edit) // Admin - Editar um Usuário
routes.get('/:id/delete', ValidatorUser.userDelete, UsersController.delete) // Admin - Deletando um Usuário (Botão da página Index)
routes.post('/', ValidatorUser.userCreate, UsersController.post) // Admin - Enviando Dados do Novo Usuário
routes.put('/:id', ValidatorUser.userUpdate, UsersController.put) // Admin - Enviando Dados Alterados no Usuário
routes.delete('/:id', ValidatorUser.userDelete, UsersController.delete) // Admin - Deletando um Usuário

module.exports = routes