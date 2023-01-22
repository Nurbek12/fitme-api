import { Router } from "express"
import { auth } from '../middleware/authMilddleware.js'
import { add, get, getAll, remove } from '../controllers/userDetailsController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/get/:id/:detail', auth, get)

    .put('/add/:id/:detail/:did', auth, add)
    .put('/remove/:id/:detail/:did', auth, remove)

    