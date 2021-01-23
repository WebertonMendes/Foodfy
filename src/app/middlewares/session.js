const User = require('../models/User')

async function routeOnlyAdmins(req, res, next) {
    let results = await User.findUser(req.session.userId)
    const user = results.rows[0]
    
    if(user.is_admin == false)
    return res.redirect('/admin/profile/')

    next()
}

function redirectToLogin(req, res, next) {
    if(!req.session.userId) return res.redirect('/login')

    next()
}

module.exports = {
    redirectToLogin,
    routeOnlyAdmins
}