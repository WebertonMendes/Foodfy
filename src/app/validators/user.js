const { compare } = require('bcryptjs')

const User = require('../models/User')

function checkAllFields(body, userAdmin) {
    const keys = Object.keys(body)

    for (key of keys) {
        if(body[key] == ""){
            return {
                userAdmin,
                user: body,
                error: 'Por favor, preencha todos os campos.'
            }
        }
    }
}

async function userCreate(req, res, next) {
    const userAdmin = req.session.userIsAdmin
    const fillAllFields = checkAllFields(req.body, userAdmin)
    
    if(fillAllFields) {
        return res.render('admin/users/create', fillAllFields)
    }

    const email = req.body.email
    
    const user = await User.emailAlreadyExists(email)
    
    if(user.rowCount > 0) return res.render('admin/users/create', {
        userAdmin,
        error: 'Usuário já cadastrado.'
    })

    next()
}

async function userUpdate(req, res, next) {
    const userAdmin = req.session.userIsAdmin
    const fillAllFields = checkAllFields(req.body, userAdmin)
    
    if(fillAllFields) {
        return res.render('admin/users/edit', fillAllFields)
    }

    let results = await User.findUser(req.params.id)
    
    const email = results.rows[0].email
    const newEmail = req.body.email

    if(newEmail != email) {
        const user = await User.emailAlreadyExists(newEmail)
    
        if(user.rowCount > 0) return res.render('admin/users/edit', {
            userAdmin,
            user: req.body,
            error: 'Email já cadastrado, tente novamente.'
        })
    }

    next()
}

async function userDelete(req, res, next) {
    const userAdmin = req.session.userIsAdmin

    let results = await User.findUser(req.params.id)
    const user = results.rows[0]
    
    results = await User.findUser(req.session.userId)
    const userLogged = results.rows[0]

    results = await User.allUsers()
    const allUsers = results.rows    
    
    if(!user && userLogged.is_admin == true) return res.render('admin/users/index', {
        userAdmin,
        users: allUsers,
        error: 'Usuário não cadastrado.'
    })

    if(!user && userLogged.is_admin == false) return res.render('admin/users/profile', {
        userAdmin,
        user: userLogged,
        error: 'Usuário não cadastrado.'
    })

    if(user.id == userLogged.id && userLogged.is_admin == true) return res.render('admin/users/index', {
        userAdmin,
        users: allUsers,
        error: 'Usuário não pode ser excluído!'
    })

    if(user.id == userLogged.id && userLogged.is_admin == false) return res.render('admin/users/profile', {
        userAdmin,
        user: userLogged,
        error: 'Usuário não pode ser excluído!'
    })

    if(userLogged.is_admin == false) return res.render('admin/users/profile', {
        userAdmin,
        user: userLogged,
        error: 'Usuário logado não tem permissão para excluir.'
    })

    req.user = user
    
    next()
}

async function profileShow(req, res, next) {
    const results = await User.findUser(req.session.userId)
    const user = results.rows[0]

    if(!user) return res.render('admin/users/profile', {
        error: 'Usuário não encontrado.'
    })

    req.user = user
    next()
}

async function profileUpdate(req, res, next) {
    const id = req.session.userId
    const { password } = req.body

    const results = await User.findUser(id)
    const user = results.rows[0]
    
    if(!password) return res.render('admin/users/profile', {
        user,
        error: 'Informe a senha para atualizar.'
    })

    const validPassword = await compare(password, user.password)
    
    if(!validPassword) return res.render('admin/users/profile', {
        user,
        error: 'Senha incorreta, tente novamente.'
    })

    dataUser = user
    userId = id

    next()
}

module.exports = {
    userCreate,
    userUpdate,
    userDelete,
    profileShow,
    profileUpdate
}