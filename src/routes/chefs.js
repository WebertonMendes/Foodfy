const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const ChefsController = require('../app/controllers/ChefsController')

const ValidatorAccess = require('../app/validators/access')
const ValidatorChef = require('../app/validators/chef')

// Routes - Chefs
routes.get('/', ChefsController.index) // Admin - Index Visualizar a Lista dos Chefs
routes.get('/create', ValidatorAccess.permissionChefsRoutes, ChefsController.create) // Admin - Criar um Novo Chef
routes.get('/:id', ValidatorChef.searchChef, ChefsController.show) // Admin - Visualizar Detalhes do Chef
routes.get('/:id/edit', ValidatorAccess.permissionChefsRoutes, ValidatorChef.searchChef, ChefsController.edit) // Admin - Editar um Chef
routes.post('/', ValidatorAccess.permissionChefsRoutes, multer.array('avatar', 1), ChefsController.post) // Admin - Enviando Dados do Novo Chef
routes.put('/:id', ValidatorAccess.permissionChefsRoutes, multer.array('avatar', 1), ChefsController.put) // Admin - Enviando Dados Alterados no Chef
routes.delete('/:id', ValidatorAccess.permissionChefsRoutes, ValidatorChef.searchChef, ValidatorChef.chefDelete, ChefsController.delete) // Admin - Deletando um Chef

module.exports = routes