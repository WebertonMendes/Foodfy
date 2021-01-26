const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    async allRecipes(limit) {
        try {
            const limitDisplayed = `LIMIT ${limit}`
            
            let query = `
                SELECT
                    recipes.id AS recipe_id,
                    recipes.title AS title,
                    recipes.ingredients AS ingredients,
                    recipes.preparation AS preparation,
                    recipes.information AS information,
                    ARRAY (
                        SELECT
                            SUBSTR(files.path,7) AS image
                        FROM
                            files
                        LEFT JOIN recipe_files
                            ON (files.id = recipe_files.file_id)
                        WHERE
                            recipe_files.recipe_id = recipes.id
                        GROUP BY
                            files.path,
                            recipe_files.recipe_id
                    ) AS recipe_images,
                    users.id AS user_id,
                    users.name AS user_name,
                    chefs.id AS chef_id,
                    chefs.name AS chef_name,
                    recipes.created_at,
                    recipes.updated_at
                FROM
                    recipes
                LEFT JOIN chefs
                    ON (chefs.id = recipes.chef_id)
                LEFT JOIN users
                    ON (users.id = recipes.user_id)
                GROUP BY
                    chefs.id,
                    users.id,
                    recipes.id
                ORDER BY
                    recipes.created_at DESC
            `

            if (limit) {
                query += `${limitDisplayed}`
            }

            return await db.query(query)
        } catch(err) {
            console.error(err)
        }
    },
    async recipesFilter(params) {
        try {
            const { filter, limit, offset } = params

            let query = "",
                filterQuery = "",
                totalQuery = `(
                    SELECT COUNT(*) FROM recipes
                ) AS total`
            
            if ( filter ) {
                filterQuery = `
                    WHERE recipes.title ILIKE '%${filter}%'
                `
                totalQuery = `(
                    SELECT COUNT(*) FROM recipes
                    ${filterQuery}
                ) AS total`
            }

            query = `
                SELECT
                    recipes.id AS recipe_id,
                    recipes.title AS title,
                    recipes.ingredients AS ingredients,
                    recipes.preparation AS preparation,
                    recipes.information AS information,
                    ARRAY (
                        SELECT
                            SUBSTR(files.path,7) AS image
                        FROM
                            files
                        LEFT JOIN recipe_files
                            ON (files.id = recipe_files.file_id)
                        WHERE
                            recipe_files.recipe_id = recipes.id
                        GROUP BY
                            files.path,
                            recipe_files.recipe_id
                    ) AS recipe_images,
                    ${totalQuery},
                    chefs.id AS chef_id,
                    chefs.name AS chef_name,
                    recipes.created_at,
                    recipes.updated_at
                FROM
                    recipes
                LEFT JOIN chefs
                    ON (chefs.id = recipes.chef_id)
                ${filterQuery}
                ORDER BY
                    recipes.updated_at DESC
                LIMIT $1
                OFFSET $2
            `

            return await db.query(query, [limit, offset])
        } catch(error) {
            console.error(error)
        }
    },
    async findRecipe(id) {
        try {
            return await db.query(`
                SELECT
                    recipes.id AS recipe_id,
                    recipes.title AS title,
                    recipes.ingredients AS ingredients,
                    recipes.preparation AS preparation,
                    recipes.information AS information,
                    ARRAY (
                        SELECT
                            SUBSTR(files.path,7) AS image
                        FROM
                            files
                        LEFT JOIN recipe_files
                            ON (files.id = recipe_files.file_id)
                        WHERE
                            recipe_files.recipe_id = recipes.id
                        GROUP BY
                            files.path,
                            recipe_files.recipe_id
                    ) AS recipe_images,
                    chefs.id AS chef_id,
                    chefs.name AS chef_name,
                    recipes.user_id,
                    recipes.created_at,
                    recipes.updated_at
                FROM
                    recipes
                LEFT JOIN chefs
                    ON (chefs.id = recipes.chef_id)
                WHERE
                    recipes.id = $1
                GROUP BY
                    chefs.id,
                    recipes.id
            `, [id])
        } catch(err) {
            console.error(err)
        }
    },
    async findRecipesFromChef(id) {
        try {
            return await db.query(`
                SELECT
                    recipes.id AS recipe_id,
                    recipes.title AS title,
                    recipes.ingredients AS ingredients,
                    recipes.preparation AS preparation,
                    recipes.information AS information,
                    ARRAY (
                        SELECT
                            SUBSTR(files.path,7) AS image
                        FROM
                            files
                        LEFT JOIN recipe_files
                            ON (files.id = recipe_files.file_id)
                        WHERE
                            recipe_files.recipe_id = recipes.id
                        GROUP BY
                            files.path,
                            recipe_files.recipe_id
                    ) AS recipe_images,
                    chefs.id AS chef_id,
                    chefs.name AS chef_name,
                    (SELECT
                        SUBSTR(files.path,7) AS image
                    FROM
                        files
                    LEFT JOIN chefs
                        ON (files.id = chefs.file_id)
                    WHERE
                        files.id = chefs.file_id
                        AND chefs.id = $1) AS chef_image,
                    recipes.created_at,
                    recipes.updated_at
                FROM
                    recipes
                LEFT JOIN chefs
                    ON (chefs.id = recipes.chef_id)
                WHERE
                    chefs.id = $1
                GROUP BY
                    chefs.id,
                    recipes.id
            `, [id])
        } catch(err) {
            console.error(err)
        }
    },
    async findRecipeImages(id) {
        try {
            return await db.query(`
                SELECT
                    files.id,
                    SUBSTR(files.path,7) AS path
                FROM
                    files
                LEFT JOIN recipe_files
                    ON (files.id = recipe_files.file_id)
                WHERE
                    recipe_files.recipe_id = ${id}
            `)
        } catch(err) {
            console.error(err)
        }
    },
    async findAllImagesOfRecipe(id) {
        return await db.query(`
            SELECT
                recipes.id,
                chefs.id AS chef_id,
                UNNEST(ARRAY (SELECT recipe_files.file_id AS files_id
                    FROM recipe_files LEFT JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                WHERE recipes.id = ${id})) AS files_id,
                UNNEST(ARRAY (SELECT recipe_files.id AS files_id
                    FROM recipe_files LEFT JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                WHERE recipes.id = ${id})) AS recipe_files_id,
                UNNEST(ARRAY (SELECT COUNT(recipe_files.file_id)
                    FROM recipe_files LEFT JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                WHERE recipes.id = ${id})) AS qtd_files
            FROM
                recipes
            LEFT JOIN chefs
                ON (chefs.id = recipes.chef_id)
            WHERE
                recipes.id = ${id}
            GROUP BY
                chefs.id,
                recipes.id
        `)
    },
    async create(data, userId) {
        try {
            const query = `
                INSERT INTO recipes (
                    title,
                    chef_id,
                    user_id,
                    ingredients,
                    preparation,
                    information,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id`

            const values = [
                data.title,
                data.chef_id,
                userId,
                data.ingredients,
                data.preparation,
                data.information,
                date(Date.now()).iso
            ]

            return await db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    async update(data) {
        try {
            const query = `
                UPDATE recipes SET
                    title=($1),
                    chef_id=($2),
                    ingredients=($3),
                    preparation=($4),
                    information=($5)
                WHERE id = $6`

            const values = [
                data.title,
                data.chef_id,
                data.ingredients,
                data.preparation,
                data.information,
                data.id
            ]

            return await db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    async delete(id) {
        try {
            return await db.query(`DELETE FROM recipes WHERE id = $1`, [id])
        } catch(err) {
            console.error(err)
        }
    },
    // async allUserRecipes(id) {
    //     try {
    //         return await db.query(`
    //             SELECT
    //             recipes.id AS recipe_id,
    //             recipes.title AS title,
    //             recipes.ingredients AS ingredients,
    //             recipes.preparation AS preparation,
    //             recipes.information AS information,
    //             ARRAY (
    //                 SELECT
    //                     SUBSTR(files.path,7) AS image
    //                 FROM
    //                     files
    //                 LEFT JOIN recipe_files
    //                     ON (files.id = recipe_files.file_id)
    //                 WHERE
    //                     recipe_files.recipe_id = recipes.id
    //                 GROUP BY
    //                     files.path,
    //                     recipe_files.recipe_id
    //             ) AS recipe_images,
    //             users.id AS user_id,
    //             users.name AS user_name,
    //             chefs.id AS chef_id,
    //             chefs.name AS chef_name,
    //             recipes.created_at,
    //             recipes.updated_at
    //             FROM
    //                 recipes
    //             LEFT JOIN chefs
    //                 ON (chefs.id = recipes.chef_id)
    //             LEFT JOIN users
    //                 ON (users.id = recipes.user_id)
    //             WHERE
    //                 recipes.user_id = ${id}
    //             GROUP BY
    //                 chefs.id,
    //                 users.id,
    //                 recipes.id
    //             ORDER BY
    //                 recipes.created_at DESC
    //         `)
    //     } catch(err) {
    //         console.error(err)
    //     }
    // },
    // async chefsSelectOptions() {
    //     try {
    //         return await db.query(`SELECT * FROM chefs`)
    //     } catch(err) {
    //         console.error(err)
    //     }
    // },
    // async files(id) {
    //     try {
    //         return await db.query(`
    //             SELECT
    //             recipes.id AS recipe_id,
    //             recipes.title AS recipe_title,
    //             chefs.name AS chef_name,
    //             files.id AS file_id,
    //             SUBSTR(files.path,7) AS file_path
    //             FROM recipes
    //             LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    //             LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
    //             LEFT JOIN files ON (files.id = recipe_files.file_id)
    //             WHERE recipes.id = $1
    //             GROUP BY chefs.id, recipes.id, files.path, files.id
    //             ORDER BY chefs.name`, [id]
    //         )
    //     } catch(err) {
    //         console.error(err)
    //     }
    // }
}