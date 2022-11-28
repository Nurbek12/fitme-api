import { Router } from "express"
import { auth } from '../middleware/authMilddleware.js'
import { getAllUsers, getUser, getAll, addUser, 
        getAllTrainers, getTrainer, addTrainer, 
        getAdmin, getAllAdmin, addAdmin,
        editUser, deleteUser } from '../controllers/userController.js'

export default Router()
    .get('/find/:id', auth, getUser)
    .get('/getusers', auth, getAllUsers)
    .get('/getall', auth, getAll)
    .post('/add', auth, addUser)

    .get('/gettrainer/:id', auth, getTrainer)
    .get('/gettrainers', auth, getAllTrainers)

    .post('/add/trainer', auth, addTrainer)

    .get('/getadmin/:id', auth, getAdmin)
    .get('/getadmins', auth, getAllAdmin)

    .post('/add/admin', auth, addAdmin)
    
    .put('/edit/:id', auth, editUser)

    .delete('/delete/:id', auth, deleteUser)