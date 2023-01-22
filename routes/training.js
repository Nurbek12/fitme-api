import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, find, create, edit, addWeeklyToUser, 
    removeProgramToUser, delet, editThisData } from '../controllers/trainingController.js'
import upload from '../middleware/uploadMilddleware.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, find)

    .post('/add', auth, upload.single('image'), create)

    .put('/edit/:id', auth, upload.single('image'), edit)

    .put('/addtouser/:id1/:id2', auth, addWeeklyToUser)
    .put('/removetouser/:id1/:id2', auth, removeProgramToUser)

    // .put('/addexer/:id1/:id2', auth, addExercise)
    // .put('/removeexer/:id', auth, removeExercise)

    .put('/editdata/:id', auth, editThisData)

    .delete('/delete/:id', auth, delet)