import { Router } from "express"
import { auth } from '../middleware/authMilddleware.js'
import { get, getAll, add, edit, delet } from '../controllers/categoryController.js'

export default Router()
    .get('/find', auth, get)

    .get('/all', auth, getAll)


    .get('/get', auth, getAll)

    .post('/add', auth, add)
    .put('/edit/:id', auth, edit)
    .delete('/delete/:id', auth, delet)

// success