import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, create, edit, delet } from '../controllers/samplesController.js'

export default Router()
    .get('/all', auth, getAll)

    .post('/add', auth, create)

    .put('/edit/:id', auth, edit)

    .delete('/delete/:id', auth, delet)