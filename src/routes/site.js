const express = require('express')
const routes = express.Router()

const SiteController = require('../app/controllers/SiteController')

// Routes - Site
routes.get('/', SiteController.index) // Site - Página Inicial
routes.get('/about', SiteController.about) // Site - Página Sobre
routes.get('/search', SiteController.search) // Site - Resultado de Busca das Receitas Usando Filtro
routes.get('/recipes', SiteController.allRecipes) // Site - Página Listagem de Todas as Receitas
routes.get('/recipes/:id', SiteController.viewRecipe) // Site - Página de Detalhes de uma Receita
routes.get('/chefs', SiteController.allChefs) // Site - Página de Listagem de Todos os Chefs

module.exports = routes