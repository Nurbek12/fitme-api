import { Router } from "express"
import { auth } from '../middleware/authMilddleware.js'
import { addDish, addProduct, deleteDish, editDish, getAllDish, getDish, removeProduct } from '../controllers/dishController.js'

export default Router()
    .get('/find', auth, getDish)
    .get('/all', auth, getAllDish)
    .post('/add', auth, addDish)

    .put('/addProd/:id', auth, addProduct)
    .put('/editProd/:id', auth, addDish)
    .put('/removProd/:id', auth, removeProduct)
    
    .put('/edit/:id', auth, editDish)
    .delete('/delete/:id', auth, deleteDish)