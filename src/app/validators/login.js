const User = require('../models/User')
const { compare } = require('bcryptjs')

async function post(req, res, next) {
    try {
        const { email, password } = req.body
        const userResults = await User.emailAlreadyExists(email)
        const user = userResults.rows[0]

        if(!user) return res.render('login/login', {
            errorLogin: 'Usuário não cadastrado.'
        })

        const validPassword = await compare(password, user.password)
        
        if(!validPassword) return res.render('login/login', {
            errorLogin: 'Senha incorreta.'
        })

        req.user = user
        
        next()
        
    } catch (err) {
        console.error(err)
        
    }
}

async function forgot(req, res, next) {
    const { email } = req.body

    try {
        const userResults = await User.emailAlreadyExists(email)
        const user = userResults.rows[0]
        
        if(!user) return res.render('login/forgot', {
            errorLogin: 'Email não cadastrado.'
        })

        req.user = user
    
        next()
    } catch (err) {
        console.error(err)
    }    
}

async function reset(req, res, next) {
    const { email, password, passwordRepeat, token } = req.body

    try {
        const results = await User.emailAlreadyExists(email)
        const user = results.rows[0]

        if(!user) return res.render('login/reset', {
            user: req.body,
            token,
            errorLogin: 'Usuário não cadastrado.'
        })

        if(password != passwordRepeat) return res.render('login/reset', {
            user: req.body,
            token,
            errorLogin: 'A senha e a repetição da senha não são idênticas.'
        })

        if(token != user.reset_token) return res.render('login/reset', {
            user: req.body,
            token,
            errorLogin: 'Token inválido! Solicite uma nova recuperação de senha.'
        })

        let now = new Date()
        now = now.setHours(now.getHours())

        if(now > user.reset_token_expires) return res.render('login/reset', {
            user: req.body,
            token,
            errorLogin: 'Token expirado! Solicite uma nova recuperação de senha.'
        })

        req.user = user
        
        next()
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    post,
    forgot,
    reset
}