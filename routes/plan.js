import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, getPlan, create, edit, delet, addProduct, removeProduct } from '../controllers/planController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, getPlan)
    
    .post('/add', auth, create)

    .put('/edit/:id', auth, edit)

    .put('/addprod/:id/:time', auth, addProduct)
    .put('/removeprod/:id/:time', auth, removeProduct)

    .delete('/delete/:id', auth, delet)

// !!!