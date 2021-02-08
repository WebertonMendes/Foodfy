const Chef = require('../models/Chef')

async function searchChef(req, res, next) {
    const results = await Chef.findChef(req.params.id)
    const chef = results.rows[0]

    if(!chef) return res.redirect('/admin/chefs')

    req.chef = chef
    next()
}

async function chefDelete(req, res, next) {
    const chef = req.chef

    if (chef.total_recipes > 0) {
        return res.render('admin/chefs/edit', {
            userAdmin: req.session.userIsAdmin,
            chef,
            error: "Chefe não pôde ser excluído, exitem receitas vinculadas à ele!"
        })
    }
    
    req.chef = chef
    next()
}

module.exports = {
    searchChef,
    chefDelete
}