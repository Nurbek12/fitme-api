import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getMy, create, edit, delet } from '../controllers/scheduleController.js'

export default Router()
    .get('/my', auth, getMy)
    .put('/create/:id', auth, create)
    .put('/edit/:id', auth, edit)
    .delete('/delete/:id', auth, delet)