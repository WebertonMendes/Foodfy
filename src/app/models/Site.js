const db = require('../../config/db')

module.exports = {
    // allRecipes(callback) {
    //     try {
    //         db.query(`
    //             SELECT
    //             recipes.*,
    //             chefs.name AS chef_name
    //             FROM recipes
    //             LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    //             GROUP BY chefs.id, recipes.id
    //             ORDER BY created_at DESC`, function(err, results) {
    //             if(err) throw `Database Error! ${err}`
            
    //             callback(results.rows)
    //         })
    //     } catch(error) {
    //         console.error(error)
    //     }
    // },
    // mostAccessed(callback) {
    //     try {
    //         db.query(`
    //             SELECT
    //             recipes.*,
    //             chefs.name AS chef_name
    //             FROM recipes
    //             LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    //             GROUP BY chefs.id, recipes.id
    //             ORDER BY recipes.updated_at DESC
    //             LIMIT 6 OFFSET 0`, function(err, results) {
    //             if(err) throw `Database Error! ${err}`
            
    //             callback(results.rows)
    //         })
    //     } catch(error) {
    //         console.error(error)
    //     }
    // },
    // findRecipe(id, callback) {
    //     try {
    //         db.query(`
    //             /*
    //             SELECT
    //             recipes.*,
    //             chefs.id AS chef_id,
    //             chefs.name AS chef_name
    //             FROM recipes
    //             LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    //             WHERE recipes.id = $1
    //             GROUP BY chefs.id, recipes.id
    //             */
    //             SELECT
    //             recipes.*,
    //             chefs.id AS chef_id,
    //             chefs.name AS chef_name,
    //             SUBSTR(files.path,7) AS image
    //             FROM recipes
    //             LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    //             LEFT JOIN recipe_files ON (recipe_files.recipe_id = recipes.id)
    //             LEFT JOIN files ON (files.id = recipe_files.file_id)
    //             WHERE recipes.id = $1
    //             GROUP BY chefs.id, recipes.id, files.path
    //             LIMIT 1
    //             `, [id], function(err, results) {
    //                 if(err) throw `Database Error! ${err}`
    //                 callback(results.rows[0])
    //             }
    //         )
    //     } catch(error) {
    //         console.error(error)
    //     }
    // },
    // allChefs(callback) {
    //     try {
    //         db.query(`
    //             SELECT chefs.name,
    //             SUBSTR(files.path,7) AS image,
    //             COUNT(recipes) AS total_recipes
    //             FROM chefs
    //             LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    //             LEFT JOIN files ON (files.id = chefs.file_id)
    //             GROUP BY chefs.name, files.path`, function(err, results) {
    //                 if(err) throw `Database Error! ${err}`
    //                 callback(results.rows)
    //             }
    //         )
    //     } catch(error) {
    //         console.error(error)
    //     }
    // },
    // async search(filter) {
    //     try {
    //         return await db.query(`
    //             SELECT
    //             recipes.*,
    //             chefs.name AS chef_name
    //             FROM recipes
    //             LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    //             WHERE recipes.title ILIKE '%${filter}%'
    //             GROUP BY recipes.id, chefs.id
    //             ORDER BY recipes.updated_at DESC
    //         `)
    //     } catch(error) {
    //         console.error(error)
    //     }
    // }
}