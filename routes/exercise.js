import { Router } from "express"
import upload from '../middleware/uploadMilddleware.js'
import { auth } from '../middleware/authMilddleware.js'
import { getExercise, getAll, add, edit, delet } from '../controllers/exerciseController.js'

export default Router()
    .get('/find', auth, getExercise)
    .get('/all', auth, getAll)
    .post('/add', auth, upload.fields([{name: 'image', maxCount: 1}, {name: 'video', maxCount: 1}]), add)
    .put('/edit/:id', auth, upload.single('image'), edit)
    .delete('/delete/:id', auth, delet)

// !!!