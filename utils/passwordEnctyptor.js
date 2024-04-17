import bcrypt from "bcrypt"

const salt = 10
class PasswordEnctyptor {
    async encryptPassword(password) {
        try {
            return await bcrypt.hash(password, salt);
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error; // Re-throw the error for proper handling
        }
    }

    async compare(reqPassword, password) {
        return await bcrypt.compare(reqPassword, password)
    }
}

export default new PasswordEnctyptor()