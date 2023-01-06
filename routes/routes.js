import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import Training from '../models/Training.js'
import Product from '../models/Product.js'
import Exercise from '../models/Exercise.js'
import User from '../models/User.js'
import Plan from '../models/MealPlan.js'

export default Router()
    .get('/getinfo', auth, async (_, res) => {
        try{
            const users = (await User.find({ role: "USER" })).length
            const trainers = (await User.find({ role: "TRAINER" })).length
            // const admins = (await User.find({ role: "ADMIN" })).length
            const exercises = (await Training.find()).length
            const mealplans = (await Plan.find()).length
            res.status(200).json({ status: true, result: {users,trainers,exercises,mealplans} })
        }catch(err){
            console.log(err);
            res.status(500).json({ status: false, message: 'Ошибка' })
        }
    })
    .get('/getmyinfo/:id', auth, async (req, res) => {
        try{
            const trainer = await User.findOne({_id: req.params.id});
            const users = (await User.find({ role: "USER" })).length
            const exercises = (await Exercise.find({ author: trainer.name })).length
            const workouts = (await Training.find({ author: trainer.name })).length
            const mealplans = (await Plan.find({ author: trainer.name })).length
            const products = (await Product.find({ author: trainer.name })).length
            res.status(200).json({ status: true, result: {users,products,workouts,exercises,mealplans} })
        }catch(err){
            console.log(err);
            res.status(500).json({ status: false, message: 'Ошибка' })
        }
    })
    .get('/aut', (_, res) => res.render('googleauth'))
// 