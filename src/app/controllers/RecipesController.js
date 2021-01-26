const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const File = require('../models/File')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin

            const results = await Recipe.allRecipes()
            const recipes = results.rows
            
            return res.render("admin/recipes/index", { recipes, userAdmin })
        } catch(error) {
            console.error(error)
        }
    },
    async create(req, res) {
        const userAdmin = req.session.userIsAdmin
        const results = await Chef.allChefs()
        const chefs = results.rows

        return res.render("admin/recipes/create", { chefs, userAdmin })
    },
    async show(req, res) {
        try {
            let results = await User.findUser(req.session.userId)
            const loggedUser = results.rows[0].id
            
            const userAdmin = req.session.userIsAdmin
            
            results = await Recipe.findRecipe(req.params.id)
            const recipe = results.rows[0]

            const recipeUser = recipe.user_id

            return res.render("admin/recipes/show", { recipe, userAdmin, loggedUser, recipeUser })
        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            const userAdmin = req.session.userIsAdmin
            const recipe = req.recipe

            let results = await Recipe.findRecipeImages(req.params.id)
            const images = results.rows

            results = await Chef.allChefs()
            const chefs = results.rows

            return res.render("admin/recipes/edit", { recipe, chefs, images, userAdmin })
        } catch (error) {
            console.error(error)
        }
    },
    async post(req, res) {
        try {
            let results = await Chef.allChefs()
            const chefs = results.rows

            for (i = 0; i < req.body.ingredients.length; i++) {
                if (req.body.ingredients[i] == '') {
                    req.body.ingredients.pop()
                }
            }

            for (i = 0; i < req.body.preparation.length; i++) {
                if (req.body.preparation[i] == '') {
                    req.body.preparation.pop()
                }
            }

            const keys = Object.keys(req.body)

            for(key of keys) {
                if(req.body[key] == "") {
                    return res.render('admin/recipes/create', {
                        chefs,
                        recipe: req.body,
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }

            if (req.files.length == 0) {
                return res.render('admin/recipes/create', {
                    chefs,
                    recipe: req.body,
                    error:"Envie pelo menos uma imagem da receita."
                })
            }

            results = await Recipe.create(req.body, req.session.userId)
            const recipeId = results.rows[0].id

            const filesPromise = req.files.map(file => File.create(file))
            resultFiles = await Promise.all(filesPromise)

            const filesPromiseRecipe = resultFiles.map(file => {
                const fileId = file.rows[0].id
                File.createRecipeFiles({ file_id: fileId, recipe_id: recipeId })
            })

            await Promise.all(filesPromiseRecipe)
            
            return res.redirect(`/admin/recipes/${recipeId}`)
        } catch (error) {
            console.error(error)
        }
    },
    async put(req, res) {
        try {
            for (i = 0; i < req.body.ingredients.length; i++) {
                if (req.body.ingredients[i] == '') {
                    req.body.ingredients.pop()
                }
            }

            for (i = 0; i < req.body.preparation.length; i++) {
                if (req.body.preparation[i] == '') {
                    req.body.preparation.pop()
                }
            }

            let results = await Recipe.findRecipe(req.params.id)
            const recipeId = results.rows[0].recipe_id

            if (req.files.length != 0) {
                const newFilesPromise = req.files.map(file => File.create(file))
                resultFiles = await Promise.all(newFilesPromise)
        
                const newFilesPromiseRecipe = resultFiles.map(file => {
                    const fileId = file.rows[0].id
                    File.createRecipeFiles({ file_id: fileId, recipe_id: recipeId })
                })
                await Promise.all(newFilesPromiseRecipe)
            }
        
            if (req.body.removed_files) {
                const removedFiles = req.body.removed_files.split(",")
                const lastIndex = removedFiles.length - 1
                removedFiles.splice(lastIndex, 1)
        
                const removedImagePromise = removedFiles.map(id => File.deletePathImage(id))
                await Promise.all(removedImagePromise)
        
                const removedFilesPromise = removedFiles.map(id => File.deleteImagesOnRecipeFiles(id))
                await Promise.all(removedFilesPromise)
        
                const removedRecipeFilesPromise = removedFiles.map(id => File.deleteImageOnFiles(id))
                await Promise.all(removedRecipeFilesPromise)
            }

            await Recipe.update(req.body)
        
            return res.redirect(`/admin/recipes/${req.body.id}`)
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        try {
            let results = await Recipe.findAllImagesOfRecipe(req.params.id)
            const recipeImages = results.rows
            const recipeId = recipeImages[0].id
            const countFiles = recipeImages[0].qtd_files

            await File.deleteImagesOnRecipeFiles(recipeId)

            for (i = 0; i < countFiles; i++) {
                const id = recipeImages[i].files_id
        
                await File.deletePathImage(id)
                await File.deleteImageOnFiles(id)
            }
        
            await Recipe.delete(recipeId)
        
            return res.redirect("/admin/recipes")
        } catch (error) {
            console.error(error)
        }
    }
}