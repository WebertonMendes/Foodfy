const User = require('../models/User')
const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

async function permissionChefsRoutes (req, res, next) {
    const userIsAdmin = req.session.userIsAdmin

    const results = await Chef.allChefs() 
    const chefs = results.rows

    if(userIsAdmin == false) return res.render('admin/chefs/index', {
        chefs,
        error: 'Acesso negado, procure o administrador do sistema.'
    })

    next()
}

async function permissionRecipesRoutes (req, res, next) {
    const userIsAdmin = req.session.userIsAdmin
    const loggedUser = req.session.userId
    
    const results = await Recipe.findRecipe(req.params.id)
    const recipe = results.rows[0]
    const recipeUser = recipe.user_id

    const findRecipes = await Recipe.allRecipes()
    const recipes = findRecipes.rows
    
    if(recipeUser != loggedUser && userIsAdmin == false) return res.render('admin/recipes/index', {
        recipes,
        error: 'Acesso negado, procure o administrador do sistema.'
    })

    req.recipe = recipe
    next()
}

async function permissionUsersRoutes (req, res, next) {
    const userIsAdmin = req.session.userIsAdmin

    const userFind = await User.findUser(req.session.userId)
    const userLogged = userFind.rows[0]

    if(userIsAdmin == false) return res.render('admin/users/profile',{
        user: userLogged,
        error: 'Acesso negado, procure o administrador do sistema.'
    })    
    
    next()
}

module.exports = {
    permissionChefsRoutes,
    permissionRecipesRoutes,
    permissionUsersRoutes
}