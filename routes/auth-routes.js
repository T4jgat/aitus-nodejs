import Router from 'express'
import AuthConrtoller from "../controllers/AuthController.js";

const router = new Router()

router.get('/', AuthConrtoller.getUsers);
router.get('/:id', AuthConrtoller.getUserById)
router.post('/registration', AuthConrtoller.createUser)
router.post('/login', AuthConrtoller.login)

export default router