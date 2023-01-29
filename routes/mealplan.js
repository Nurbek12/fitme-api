import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, getPlan, create, 
    addMyDetails, removeMyDetails, getMy,
    createChild, editChild, removeChild, 
    edit, delet } from '../controllers/mealplanController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, getPlan)
    
    .post('/add', auth, create)

    .post('/child/add', auth, createChild)
    .put('/child/edit/:id', auth, editChild)
    .put('/child/delete/:id', auth, removeChild)

    .get('/my', auth, getMy)
    .put('/addmy/:id', auth, addMyDetails)
    .put('/delmy/:id', auth, removeMyDetails)

    .put('/edit/:id', auth, edit)

    .delete('/delete/:id', auth, delet)

// !!!