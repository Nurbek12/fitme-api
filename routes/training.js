import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, find, create, edit, addExercise, removeExercise, delet } from '../controllers/trainingController.js'
import upload from '../middleware/uploadMilddleware.js'

export default Router()
.get('/all', auth, getAll)
.get('/find', auth, find)

.post('/add', auth, upload.single('file'), create)

.put('/edit/:id', auth, upload.single('file'), edit)

.put('/addexer/:id1/:id2', auth, addExercise)
.put('/removeexer/:id', auth, removeExercise)

.delete('/delete/:id', auth, delet)