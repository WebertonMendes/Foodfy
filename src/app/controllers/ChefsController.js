const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const File = require('../models/File')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const results = await Chef.allChefs()
            const chefs = results.rows

            return res.render("admin/chefs/index", { chefs, userAdmin })
        } catch(error) {
            console.error(error)
        }
    },
    create(req, res) {
        const userAdmin = req.session.userIsAdmin
        return res.render("admin/chefs/create", { userAdmin })
    },
    async post(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const keys = Object.keys(req.body)

            for(key of keys) {
                if(req.body[key] == "") {
                    return res.render('admin/chefs/create', {
                        userAdmin,
                        chef: req.body,
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }
            const { name } = req.body
            
            const results = await Chef.create(name)
            const chefId = results.rows[0].id

            const filesPromise = req.files.map(file => File.create(file))
            const resultFiles = await Promise.all(filesPromise)

            const PromiseFilesChef = resultFiles.map(file => {
                const fileId = file.rows[0].id
                File.updateChefFile({ file_id: fileId, chef_id: chefId })
            })
            
            await Promise.all(PromiseFilesChef)

            return res.redirect(`/admin/chefs/${chefId}`)
        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            let results = await User.findUser(req.session.userId)
            const userAdmin = results.rows[0].is_admin

            const chef = req.chef

            results = await Recipe.findRecipesFromChef(req.params.id)
            const recipes = results.rows

            return res.render("admin/chefs/show", { chef, recipes, userAdmin })
        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const chef = req.chef

            return res.render("admin/chefs/edit", { chef, userAdmin })
        } catch (error) {
            console.error(error)
        }

    },
    async put(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const keys = Object.keys(req.body)

            for(key of keys) {
                if(req.body[key] == "") {
                    return res.render('admin/chefs/create', {
                        userAdmin,
                        chef: req.body,
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }
            
            let results = await Chef.findChef(req.params.id)
            const ChefId = results.rows[0].id
            const fileIdOld = results.rows[0].file_id

            const newFilesPromise = req.files.map(file => File.create(file))
            resultFiles = await Promise.all(newFilesPromise)

            await Chef.update(req.body)

            if (fileIdOld !== null && req.files.length > 0) {
                await File.deletePathImage(fileIdOld)
                await File.deleteImageOnFiles(fileIdOld)
            }
            
            if (fileIdOld !== null && req.files.length == 0) {
                File.updateChefFile({ file_id: fileIdOld, chef_id: ChefId })
            } else {
                const newFilesPromiseChef = resultFiles.map(file => {
                    const fileId = file.rows[0].id
                    File.updateChefFile({ file_id: fileId, chef_id: ChefId })
                })
                await Promise.all(newFilesPromiseChef)
            }

            return res.redirect(`/admin/chefs/${req.body.id}`)
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        try {
            const chef = req.chef

            await Chef.delete(chef.id)
            await File.deletePathImage(chef.file_id)
            await File.deleteImageOnFiles(chef.file_id)

            const results = await Chef.allChefs()
            const chefs = results.rows

            return res.render("admin/chefs/index", { 
                chefs,
                userAdmin: req.session.userIsAdmin,
                success: "Chef excluído com sucesso!"
            })           
        } catch (error) {
            console.error(error)
        }
    }
}