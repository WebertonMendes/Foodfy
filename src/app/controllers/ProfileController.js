const User = require('../models/User')

module.exports = {
    async index(req, res) {
        try {
            const user = req.user
            return res.render('admin/users/profile', { user })
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            let { name, email } = req.body

            await User.updateProfile(req.session.userId, {
                name,
                email
            })

            const results = await User.findUser(req.session.userId)
            const user = results.rows[0]

            return res.render('admin/users/profile', { 
                user,
                success: 'Usuário atualizado com sucesso!'
            })
        } catch (err) {
            console.error(err)
            return res.render('admin/users/profile', {
                user,
                error: 'Erro ao atualizar o perfil do usuário!'
            })
        }
    }
}