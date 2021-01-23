const db = require('../../config/db');
const { hash } = require('bcryptjs')

module.exports = {
    async allUsers(){
        try {
            return await db.query('SELECT * FROM users ORDER BY name')
        } catch (err) {
            console.error(err)
        }
    },
    async findUser(id) {
        try {            
            return await db.query('SELECT * FROM users WHERE id = $1', [id])
        } catch (err) {
            console.error(err)
        }
    },
    async emailAlreadyExists(email) {
        try {
            return await db.query('SELECT * FROM users WHERE email = $1', [email])
        } catch (err) {
            console.error(err)
        }
    },
    async create(data, isAdmin, password) {
        try {
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id`
            
            const passwordHash = await hash(password, 8)

            const values = [
                data.name,
                data.email,
                passwordHash,
                isAdmin
            ]

            const results = await db.query(query, values)
            return results.rows[0].id
        } catch (error) {
            console.error(error)
        }
    },    
    async update(data, isAdmin) {
        try {
            const query = `
                UPDATE users SET
                    name=($1),
                    email=($2),
                    is_admin=($3)
                WHERE id = $4`
            
            const values = [
                data.name,
                data.email,
                isAdmin,
                data.id
            ]

            return await db.query(query, values)
        } catch (err) {
            console.error(err)
        }
    },
    async delete(id) {
        try {
            return await db.query('DELETE FROM users WHERE id = $1', [id])
        } catch(err) {
            console.error(err)
        }
    },
    async updateProfile(id, fields) {
        try {
            let query = "UPDATE users SET"

            Object.keys(fields).map((key, index, array) => {
                if((index + 1) < array.length) {
                    query = `${query}
                        ${key} = '${fields[key]}',
                    `
                } else {
                    query = `${query}
                        ${key} = '${fields[key]}'
                        WHERE id = ${id}
                    `
                }
            })

            await db.query(query)
            return
        } catch (err) {
            console.error(err)
        }
    }
}