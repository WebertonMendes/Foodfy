const User = require('../models/User')
const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

async function permissionChefsRoutes (req, res, next) {
    const loggedUser = req.session.userId
    const userFind = await User.find(loggedUser)
    const user = userFind.rows[0]

    const results = await Chef.all() 
    const chefs = results.rows

    if(user.is_admin == false) return res.render('admin/chefs/index', {
        chefs,
        error: 'Acesso negado, procure o administrador do sistema.'
    })

    next()
}

async function permissionRecipesRoutes (req, res, next) {
    const userIsAdmin = req.session.userIsAdmin
    const userId = req.session.userId

    const findRecipes = await Recipe.allUserRecipes(userId)
    const recipes = findRecipes.rows

    const findRecipesImg = await Recipe.allImage()
    const photos = findRecipesImg.rows

    if(userIsAdmin == false) return res.render('admin/recipes/index', {
        recipes,
        photos,
        error: 'Acesso negado, procure o administrador do sistema.'
    })
        
    next()
}

async function permissionUsersRoutes (req, res, next) {
    const userIsAdmin = req.session.userIsAdmin

    const userFind = await User.find(req.session.userId)
    const userLogged = userFind.rows[0]

    if(userIsAdmin == false) return res.render('admin/profile/index',{
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