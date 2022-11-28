import { Router } from "express"
import upload from '../middleware/uploadMilddleware.js'
import { auth } from '../middleware/authMilddleware.js'
import { getExercise, getAll, add, edit, delet } from '../controllers/exerciseController.js'

export default Router()
    .get('/find', auth, getExercise)
    .get('/all', auth, getAll)
    .post('/add', auth, upload.single('file'), add)
    .put('/edit/:id', auth, upload.single('file'), edit)
    .delete('/delete/:id', auth, delet)