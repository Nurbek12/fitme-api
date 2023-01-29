import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, find, create, edit, delet, addMyDetails, removeMyDetails, getMy } from '../controllers/workoutController.js'
import upload from '../middleware/uploadMilddleware.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, find)
    .post('/add', auth, upload.single('image'), create)
    .put('/edit/:id', auth, upload.single('image'), edit)
    .delete('/delete/:id', auth, delet)

    .get('/my', auth, getMy)
    .put('/addmy/:id', auth, addMyDetails)
    .put('/delmy/:id', auth, removeMyDetails)