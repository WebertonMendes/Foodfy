const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    async allChefs() {
        try {
            return await db.query(`
                SELECT
                    chefs.id,
                    chefs.name,
                    chefs.file_id,
                    SUBSTR(files.path,7) AS image,
                    COUNT(recipes.id) AS total_recipes
                FROM chefs
                    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                    LEFT JOIN files ON (chefs.file_id = files.id)
                GROUP BY
                    chefs.id, chefs.file_id, files.path
                ORDER
                    BY chefs.name
            `)
        } catch(err) {
            console.error(err)
        }
    },
    async findChef(id) {
        try {
            return await db.query(`
                SELECT
                    chefs.id,
                    chefs.name,
                    chefs.file_id,
                    SUBSTR(files.path,7) AS path,
                    (SELECT
                        COUNT(recipes)
                    FROM
                        chefs
                    LEFT JOIN recipes
                        ON (recipes.chef_id = chefs.id)
                    WHERE
                        chefs.id = $1
                    GROUP BY
                        chefs.id) AS total_recipes
                FROM chefs
                    LEFT JOIN recipes
                        ON (recipes.chef_id = chefs.id)
                    LEFT JOIN files
                        ON (files.id = chefs.file_id)
                WHERE
                    chefs.id = $1
                GROUP BY
                    chefs.id,
                    files.path
            `, [id])
        } catch(err) {
            console.error(err)
        }
    },
    async create(data) {
        try {
            const query = `
                INSERT INTO chefs (
                    name,
                    file_id,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id`

            const values = [
                data.name,
                data.file_id,
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
                UPDATE chefs SET
                    name=($1),
                    file_id=($2)
                WHERE id = $3`

            const values = [
                data.name,
                data.file_id,
                data.id
            ]
            
            return await db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    async delete(id) {
        try {
            return await db.query('DELETE FROM chefs WHERE id = $1', [id])
        } catch(err) {
            console.error(err)
        }
    }
}