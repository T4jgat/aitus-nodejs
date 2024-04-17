
import Validation from "../utils/validation.js";
import UserService from "../services/user-service.js";
import PasswordEnctyptor from "../utils/passwordEnctyptor.js";

const OK = 200
const CONFLICT_ERROR = 409
const NOT_FOUND_ERROR = 404
const BAD_REQUEST = 400

class AuthConrtoller {
    async createUser(req, res) {
        const {
            email,
            password,
            first_name,
            last_name,
            role
        } = req.body

        if (await Validation.usernameValidation(email)) {
            console.error(`(${CONFLICT_ERROR}) Error: User with username ${email} is already exists`)
            return res.status(CONFLICT_ERROR).json({error: `User with username ${email} is already exists`})
        }

        await UserService.registration(first_name, last_name, role, email, password)
        console.log(`(${OK}) Registration successful: ${email}`)
        return res.json({message: "Registration successful!"})
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await UserService.findByUsername(email)

        if (!user) {
            console.error(`(${NOT_FOUND_ERROR}) Error: User ${email} is not exists`)
            return res.status(NOT_FOUND_ERROR).json({message: "User is not exists"})
        }

        const passwordIsMatch = await PasswordEnctyptor.compare(password, user.password)

        if (passwordIsMatch) {
            console.log(`(${OK}) Login successful: ${email}`)
            return res.status(OK).json({message: "Login successful"})
        } else {
            return res.status(BAD_REQUEST).json({message: 'Invalid credentials'});
        }

    }

    async getUsers(req, res) {
        const users = await UserService.findAll()
        return res.status(200).send(users)
    }

    async getUserById(req, res) {
        const {id} = req.params
        const user = await UserService.findById(id)
        return res.status(200).send(user)
    }
}

export default new AuthConrtoller()
