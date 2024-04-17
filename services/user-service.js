import db from "../config/db.js";
import PasswordEnctyptor from "../utils/passwordEnctyptor.js";



class UserService {
    async registration(first_name, last_name, role, email, password) {
        const encryptedPassword = await PasswordEnctyptor.encryptPassword(password)
        await db.query(`INSERT INTO users (first_name, last_name, role, email, password) 
                        values ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, role, email, encryptedPassword])

    }

    async findAll() {
        const result = await db.query("SELECT * FROM users")
        return result.rows[0]
    }

    async findById(id) {
        const res = await db.query("SELECT * FROM users WHERE id=$1", [id])
        return res.rows[0]
    }

    async findByUsername(email) {
        const res = await db.query("SELECT * FROM users WHERE email=$1", [email])
        return res.rows[0]
    }
}

export default new UserService()