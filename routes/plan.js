import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, getPlan, create, edit, delet } from '../controllers/planController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, getPlan)
    
    .post('/add', auth, create)

    .put('/edit/:id', auth, edit)

    .delete('/delete/:id', auth, delet)

// !!!