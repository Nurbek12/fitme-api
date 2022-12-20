import { Router } from 'express'
import { register, login, admin, verify } from '../controllers/authController.js'

export default Router()
    .post('/register', register)
    .post('/login', login)
    .post('/verify', verify)
    .post('/adminlogin', admin)

// success