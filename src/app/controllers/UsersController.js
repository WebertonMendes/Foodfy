const crypto = require('crypto')
const { hash } = require('bcryptjs')

const mailer = require('../../lib/mailer')

const User = require('../models/User')

module.exports = {
    async index(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const results = await User.allUsers()
            const users = results.rows

            return res.render('admin/users/index', { users, userAdmin })
        } catch(error) {
            console.error(error)
        }
    },
    create(req, res) {
        const userAdmin = req.session.userIsAdmin

        return res.render('admin/users/create', { userAdmin })
    },
    async post(req, res) {
        try {
            let isAdmin = req.body.is_admin
            const { name, email } = req.body
    
            if(isAdmin) { isAdmin = true }
            else { isAdmin = false }
            
            const password = crypto.randomBytes(12).toString('hex')
            const hashPassword = await hash(password, 8)

            await User.create({ name, email, isAdmin, password: hashPassword })

            await mailer.sendMail({
                to: req.body.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Password for access to Foodfy',
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
                                                <h3 style="text-align: center;">Olá ${req.body.name},</h3>
                                                <h4 style="text-align: center;">Parabéns! Você agora é um usuário da plataforma Foodfy.</h4>
                                                <table style="width: 100%;;">
                                                    <tr>
                                                        <td style="padding: 20px 0 20px 0; text-align: center;">
                                                            Logo abaixo segue seus dados de acesso:
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 8px 0 8px 0; text-align: center;">
                                                            <strong>Usuário:</strong> ${req.body.email}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 8px 0 8px 0; text-align: center;">
                                                            <strong>Senha:</strong> ${password}
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

            return res.redirect('/admin/users')
        } catch(error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const results = await User.findUser(req.params.id)
            const user = results.rows[0]

            return res.render('admin/users/edit', { user, userAdmin })
        } catch(error) {
            console.error(error)
        }
    },
    async put(req, res) {
        try {
            let isAdmin = req.body.is_admin
    
            if(isAdmin) { isAdmin = true }
            else { isAdmin = false }

            await User.update(req.body, isAdmin)

            let results = await User.findUser(req.params.id)
            const user = results.rows[0]
            
            return res.render('admin/users/edit', {
                user: user,
                success: 'Usuário atualizado com sucesso!'
            })
        } catch(error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        try {
            const user = req.user
            await User.delete(user.id)

            return res.redirect('/admin/users')
        } catch(error) {
            console.error(error)
        }
    }
}