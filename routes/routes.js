import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import User from '../models/User.js'
import Plan from '../models/MealPlan.js'
import Workout from '../models/WorkoutPlan.js'

export default Router()
    .get('/getinfo', auth, async (_, res) => {
        try{
            const users = (await User.find({ role: "USER" })).length
            const trainers = (await User.find({ role: "TRAINER" })).length
            const exercises = (await Workout.find({ visibledb: true })).length
            const mealplans = (await Plan.find({ visibledb: true })).length
            res.status(200).json({ status: true, result: {users,trainers,exercises,mealplans} })
        }catch(err){
            console.log(err);
            res.status(500).json({ status: false, message: 'Ошибка' })
        }
    })
    .get('/getmyinfo', auth, async (req, res) => {
        try{
            const resl = await User.findById(req.user_id)
            const users = resl.disciples.length;
            const workouts = resl.myWorkoutPlans.length
            const mealplans = resl.mealplans.length
            const products = resl.favoriteProduct.length
            res.status(200).json({ status: true, result: {users,products,workouts,mealplans} })
        }catch(err){
            console.log(err);
            res.status(500).json({ status: false, message: 'Ошибка' })
        }
    })
    .get('/aut', (_, res) => res.render('googleauth'))
// 