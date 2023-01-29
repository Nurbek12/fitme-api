import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
import Training from '../models/WorkoutPlan.js'
import User from '../models/User.js'
// import UserDetails from '../models/UserDetails.js'
import Plan from '../models/MealPlan.js'

export default Router()
    .get('/getinfo', auth, async (_, res) => {
        try{
            const users = (await User.find({ role: "USER" })).length
            const trainers = (await User.find({ role: "TRAINER" })).length
            // const admins = (await User.find({ role: "ADMIN" })).length
            const exercises = (await Training.find({ visibledb: true })).length
            const mealplans = (await Plan.find({ visibledb: true })).length
            res.status(200).json({ status: true, result: {users,trainers,exercises,mealplans} })
        }catch(err){
            console.log(err);
            res.status(500).json({ status: false, message: 'Ошибка' })
        }
    })
    // .get('/getmyinfo/:id', auth, async (req, res) => {
    //     try{
    //         const resl = await UserDetails.findOne({ user_id: req.params.id })
    //         const users = resl.disciples.length;
    //         const workouts = resl.workouts.length
    //         const mealplans = resl.mealplans.length
    //         const products = resl.products.length
    //         res.status(200).json({ status: true, result: {users,products,workouts,mealplans} })
    //     }catch(err){
    //         console.log(err);
    //         res.status(500).json({ status: false, message: 'Ошибка' })
    //     }
    // })
    .get('/aut', (_, res) => res.render('googleauth'))
// 