import { Router } from "express"
import { auth } from '../middleware/authMilddleware.js'
import { getAll, add } from '../controllers/foodCController.js'

export default Router()
    .get('/all', auth, getAll)
    .post('/add', auth, add)