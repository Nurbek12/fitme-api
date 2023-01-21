import { Router } from "express"
import { auth } from '../middleware/authMilddleware.js'
import { getAll, add, getMonthly, edit } from '../controllers/foodCController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/month/:yy/:mm', auth, getMonthly)
    .post('/add', auth, add)
    .put('/edit/:id', auth, edit)