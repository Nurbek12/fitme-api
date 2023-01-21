import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import { getAll, getPlan, create, addProgramToUser, removeProgramToUser, 
    createChild, editChild, removeChild, removeChildProduct,
    addChildProduct, editChildProduct, edit, delet } from '../controllers/planController.js'

export default Router()
    .get('/all', auth, getAll)
    .get('/find', auth, getPlan)
    
    .post('/add', auth, create)

    .post('/child/add', auth, createChild)
    .put('/child/edit/:id', auth, editChild)
    .put('/child/delete/:id', auth, removeChild)

    .put('/child/prodadd/:id', auth, addChildProduct)
    .put('/child/prodedit/:id', auth, editChildProduct)
    .put('/child/prodremove/:id', auth, removeChildProduct)

    .put('/addtouser/:id1/:id2', auth, addProgramToUser)
    .put('/removetouser/:id1/:id2', auth, removeProgramToUser)

    .put('/edit/:id', auth, edit)

    .delete('/delete/:id', auth, delet)

// !!!