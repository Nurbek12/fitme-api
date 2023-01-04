import { Router } from "express"
import upload from '../middleware/uploadMilddleware.js'
import { auth } from '../middleware/authMilddleware.js'
import { getExercise, getForArray, getAll, add, edit, delet } from '../controllers/exerciseController.js'

export default Router()
    .get('/find', auth, getExercise)
    .get('/all', auth, getAll)
    .get('/forarray', auth, getForArray)
    .post('/add', auth, upload.fields([{name: 'image', maxCount: 1}, {name: 'video', maxCount: 1}]), add)
    .put('/edit/:id', auth, upload.fields([{name: 'image', maxCount: 1}, {name: 'video', maxCount: 1}]), edit)
    .delete('/delete/:id', auth, delet)

// !!!