import { Router } from 'express'
import upload from '../middleware/uploadMilddleware.js'
import { auth } from '../middleware/authMilddleware.js'
import { uploadAvatar } from '../controllers/uploadController.js'

Router()
    .post('/avatar/:id', auth, upload.single('image'), uploadAvatar)