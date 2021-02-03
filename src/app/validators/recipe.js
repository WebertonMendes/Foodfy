const Recipe = require('../models/Recipe')

async function deleteRecipe(req, res, next) {
    const results = await Recipe.findRecipe(req.params.id)
    const recipe = results.rows[0]

    if (recipe.user_id != req.session.userId && !req.session.userIsAdmin) {
        return res.render('admin/recipes/edit', {
            recipe,
            error: "O usuário logado não possui permissão para excluir a Receita!"
        })
    }
    
    req.recipe = recipe
    next()
}

module.exports = {
    deleteRecipe
}