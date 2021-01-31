const fs = require('fs')

const db = require('../../config/db')

module.exports = {
    async create({ name, path }) {
        try {
            const query = 'INSERT INTO files (name, path) VALUES ($1, $2) RETURNING id'
            const values = [name, path]

            const results = await db.query(query, values)
            return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    },
    async createRecipeFiles({ recipe_id, file_id }) {
        try {
            const query = 'INSERT INTO recipe_files (recipe_id, file_id) VALUES ($1, $2) RETURNING id'
            const values = [recipe_id, file_id]

            return await db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    async updateChefFile({ file_id, chef_id }) {
        try {
            const query = 'UPDATE chefs SET file_id = $1 WHERE id = $2'
            const values = [file_id, chef_id]

            return await db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    async deletePathImage(id) {
        try {
            const result = await db.query('SELECT * FROM files WHERE id = $1', [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)
        } catch(err) {
            console.error(err)
        }
    },
    async deleteImageOnFiles(id) {
        try {
            return await db.query('DELETE FROM files WHERE id = $1', [id])
        } catch(err) {
            console.error(err)
        }
    },
    async deleteImagesOnRecipeFiles(id) {
        try {
            return await db.query('DELETE FROM recipe_files WHERE recipe_id = $1 OR file_id = $1', [id])
        } catch(err) {
            console.error(err)
        }
    }
}