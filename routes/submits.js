import { Router } from "express";
import { auth } from "../middleware/authMilddleware.js";
import { getMy, create, accept, cancel, refuse } from "../controllers/submitController.js";

export default Router()
    .get('/get', auth, getMy)
    
    .post('/create', auth, create)
    .delete('/refuse/:id', auth, refuse)

    .put('/accept/:id', auth, accept)
    .put('/cancel/:id', auth, cancel)

// !!