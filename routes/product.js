import { Router } from "express"
import upload from '../middleware/uploadMilddleware.js'
import { auth } from '../middleware/authMilddleware.js'
import { getProduct, getAll, add, edit, delet } from '../controllers/productController.js'

export default Router()
    .get('/find', auth, getProduct)
    .get('/all', auth, getAll)
    .post('/add', auth, upload.single('image'), add)
    .put('/edit/:id', auth, upload.single('image'), edit)
    .delete('/delete/:id', auth, delet)

// success