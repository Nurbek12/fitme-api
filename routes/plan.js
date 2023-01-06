import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, getPlan, create, addProgramToUser, removeProgramToUser, edit, delet } from '../controllers/planController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, getPlan)
    
    .post('/add', auth, create)

    .put('/addtouser/:id1/:id2', auth, addProgramToUser)
    .put('/removetouser/:id1/:id2', auth, removeProgramToUser)

    .put('/edit/:id', auth, edit)

    .delete('/delete/:id', auth, delet)

// !!!