import { Router } from "express"
import upload from '../middleware/uploadMilddleware.js'
import { auth } from '../middleware/authMilddleware.js'
import { getAllUsers, getUser, getAll, addUser, 
        getAllTrainers, getTrainer, addTrainer, 
        getAdmin, getAllAdmin, addAdmin,
        editUser, deleteUser, getMy, deletDisc } from '../controllers/userController.js'

export default Router()
    .get('/find/:id', auth, getUser)
    .get('/getusers', auth, getAllUsers)
    .get('/getall', auth, getAll)

    .get('/getmyusers/:id', auth, getMy)
    .put('/deletdisc/:id1/:id2', auth, deletDisc)

    .post('/add', auth, addUser)

    .get('/gettrainer/:id', auth, getTrainer)
    .get('/gettrainers', auth, getAllTrainers)

    .post('/add/trainer', auth, upload.single('image'), addTrainer)

    .get('/getadmin/:id', auth, getAdmin)
    .get('/getadmins', auth, getAllAdmin)

    .post('/add/admin', auth, addAdmin)
    
    .put('/edit/:id', auth, upload.single('image'), editUser)

    .delete('/delete/:id', auth, deleteUser)