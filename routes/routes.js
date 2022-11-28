import { Router } from 'express'
import { auth } from '../middleware/authMilddleware.js'
// import Stripe from 'stripe'
// import { stripe_priv } from '../config/keys.js'
import Training from '../models/Training.js'
import User from '../models/User.js'
import Plan from '../models/MealPlan.js'

// const stripe = Stripe(stripe_priv)

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
    // .get('/login', (_, res) => res.render('login'))
    // .get('/admin/login', (_, res) => res.render('login-admin'))
    // .get('/register', (_, res) => res.render('register'))
    // .get('/verifycode', (_, res) => res.render('verifycode'))
    // .get('/finance', (_, res) => res.render('stripe'))
    // .get('/admin/:link', (req, res) => res.render(`admin/${req.params.link}`, { user: req.user, link: req.params.link }))

    // .post('/payment', function (req, res) {
    //     const { amount, stripeToken } = req.body;
    //     stripe.charges.create({
    //         amount: amount,
    //         source: stripeToken,
    //         currency: 'usd'
    //     }).then((resp) => {
    //         res.json({ message: 'Successfully', resp })
    //     }).catch(err => {
    //         console.log(err);
    //         res.json({ message: 'Error' })

    //     })
    // })
    // .post('/send', (req, res) => {
    //     '1SLAKbdZBnscRx8NPlXQ6E9IapkGMwU2'
    //     't14fjemw079cdb6ioyrszua25l8gvxp3'
    // })