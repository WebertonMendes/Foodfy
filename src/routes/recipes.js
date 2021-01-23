const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const RecipesController = require('../app/controllers/RecipesController')

const ValidatorAccess = require('../app/validators/access')
const ValidatorRecipe = require('../app/validators/recipe')

// Routes - Recipes
routes.get('/', RecipesController.index) // Admin - Index Visualizar a Lista das Receitas
routes.get('/create', RecipesController.create) // Admin - Criar uma Nova Receita
routes.get('/:id', RecipesController.show) // Admin - Visualizar Detalhes da Receita
routes.get('/:id/edit', ValidatorAccess.permissionRecipesRoutes, RecipesController.edit) // Admin - Editar uma Receita
routes.post('/', ValidatorAccess.permissionRecipesRoutes, multer.array('recipe-image', 5), RecipesController.post) // Admin - Enviando Dados da Nova Receita
routes.put('/:id', ValidatorAccess.permissionRecipesRoutes, multer.array('recipe-image', 5), RecipesController.put) // Admin - Enviando Dados Alterados na Receita
routes.delete('/:id', ValidatorAccess.permissionRecipesRoutes, ValidatorRecipe.deleteRecipe, RecipesController.delete) // Admin - Deletando uma Receita

module.exports = routes