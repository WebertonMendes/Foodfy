const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

const User = require('../models/User')

module.exports = {
    login(req, res) {
        return res.render('login/login')
    },
    post(req, res) {
        req.session.userId = req.user.id
        req.session.userIsAdmin = req.user.is_admin

        if(req.session.userIsAdmin == true) return res.redirect('admin/users')
    
        if(req.session.userIsAdmin == false) return res.redirect('admin/profile')
    },
    forgotForm(req, res) {
        return res.render('login/forgot')
    },
    async forgot(req, res) {
        try {
            const user = req.user
            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.updateProfile(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Password Recovery Foodfy',
                html: `
                    <!DOCTYPE html>
                    <html xmlns="http://www.w3.org/1999/xhtml" lang="pt-br">
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <title>Foodfy</title>
                    </head>
                    <body style="margin: 0; padding: 0;">
                        <table style="width: 100%; ">
                            <tr>
                                <td>
                                    <table style="border-collapse: collapse; width: 500px; margin: 0 auto; border: 1px solid #ccc;">
                                        <tr>
                                            <td style="padding: 40px 0 40px 0; background: #111;">
                                                <img src="http://localhost:3000/assets/logo_white.png" alt="Foodfy" style="display: block; margin: 0 auto;" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 40px 30px 40px 30px;">
                                                <img src="http://localhost:3000/assets/chef.png" alt="Foodfy" style="display: block; margin: 0 auto; width: 180px;" />
                                                <h3 style="text-align: center;">Olá ${user.name},</h3>
                                                <h4 style="text-align: center;">Perdeu a sua senha?</h4>
                                                <p style="text-align: center;">Não se preocupe, <br> clique no link abaixo para recuperar seu acesso.</p>
                                                <table style="width: 100%;;">
                                                    <tr>
                                                        <td style="padding: 20px 0 20px 0; text-align: center;">
                                                            <a href="http://localhost:3000/login/reset?token=${token}" target="_blank">RECUPERAR SENHA</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 50px 0 8px 30px;">
                                                            Atenciosamente, a equipe Foodfy.
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `
            })

            return res.render('login/forgot', {
                successLogin: "Verifique seu email para resetar a sua senha."
            })
            
        } catch (err) {
            console.error(err)
            return res.render('login/forgot', {
                errorLogin: "Erro inesperado, tenta novamente!"
            })
        }
    },
    resetForm(req, res) {
        return res.render('login/reset', { token: req.query.token })
    },
    async reset(req, res) {
        const user = req.user
        const { password, token } = req.body

        try {
            const newPassword = await hash(password, 8)

            await User.updateProfile(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            return res.render('login/login', {
                user: req.body,
                successLogin: "Senha atualizada com sucesso! Faça o login."
            })
        } catch (err) {
            console.error(err)
            return res.render('login/reset', {
                user: req.body,
                token,
                errorLogin: "Erro inesperado, tenta novamente!"
            })
        }
    },
    logout(req, res) {
        req.session.destroy()

        return res.redirect('/login')
    }
}