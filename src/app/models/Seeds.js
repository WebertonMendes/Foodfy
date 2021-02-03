const { date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {
    async Users({ name, email, password, isAdmin }) {
        try {
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id`
            
            const values = [
                name,
                email,
                password,
                isAdmin
            ]

            const results = await db.query(query, values)
            return results.rows[0].id
        } catch (error) {
            console.error(error)
        }
    },
    async Chefs({ name, file_id }) {
        try {
            const query = `
                INSERT INTO chefs (
                    name,
                    file_id,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id`

            const values = [
                name,
                file_id,
                date(Date.now()).iso
            ]

            const results = await db.query(query, values)
            return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    },
    async Recipes(data, userId) {
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

            const results = await db.query(query, values)
            return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    },
    async Files({ name, path }) {
        try {
            const query = 'INSERT INTO files (name, path) VALUES ($1, $2) RETURNING id'
            const values = [name, path]

            const results = await db.query(query, values)
            return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    },
    async RecipeFiles({ recipe_id, file_id }) {
        try {
            const query = 'INSERT INTO recipe_files (recipe_id, file_id) VALUES ($1, $2) RETURNING id'
            const values = [recipe_id, file_id]

            return await db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
}