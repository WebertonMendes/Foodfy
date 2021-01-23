const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
    async index(req, res) {  
        try {
            const recipesLimitDisplayed = 6

            let results = await Recipe.allRecipes(recipesLimitDisplayed)
            const recipes = results.rows

            return res.render("site/index", { recipes })
        } catch(error) {
            console.error(error)
        }
    },
    about(req, res) {
        return res.render("site/about")
    },
    async search(req, res) {
        try {
            let { filter, page, limit } = req.query

            page = page || 1
            limit = limit || 6

            let offset = limit * (page -1)

            const params = {
                filter,
                page,
                limit,
                offset
            }
            
            
            const results = await Recipe.recipesFilter(params)
            const recipes = results.rows
                
            const pagination = {
                total: Math.ceil(recipes[0].total/ limit),
                page
            }

            return res.render("site/recipes", { recipes, pagination, filter })
        } catch(error) {
            console.error(error)
        }
    },
    async allRecipes(req, res) {
        try {
            let { filter, page, limit } = req.query

            page = page || 1
            limit = limit || 6

            let offset = limit * (page -1)

            const params = {
                filter,
                page,
                limit,
                offset
            }
                
            const results = await Recipe.recipesFilter(params)
            const recipes = results.rows
                    
            const pagination = {
                total: Math.ceil(recipes[0].total/ limit),
                page
            }

            return res.render("site/recipes", { recipes, pagination, filter })
        } catch(error) {
            console.error(error)
        }

    },
    async viewRecipe(req, res) {
        try {
            let results = await Recipe.findRecipe(req.params.id)
            const recipe = results.rows[0]

            if (!recipe) return res.render("site/recipe-details", {
                recipe,
                error: "Receita não encontrada!"
            })
            
            return res.render("site/recipe-details", { recipe })
          } catch(error) {
            console.error(error)
          }
    },
    async allChefs(req, res) {
        try {
            let results = await Chef.allChefs()
            const chefs = results.rows

            return res.render("site/chefs", { chefs })
        } catch (error) {
            console.error(error)
        }
        
    }
}