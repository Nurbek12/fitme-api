import Workout from '../models/WorkoutPlan.js'
import { fileurl } from '../config/generatecode.js'
import User from '../models/User.js'

export const getAll = async (req, res) => {
    try{
        await Workout.find({ _id: { $nin: req?.user?.myWorkoutPlans }, visibledb: true})
            .populate([{
                path: 'creator',
                model: 'User',
                select: ['name', 'phonenumber', 'email']
            },{
                path: 'workout.exercise',
                model: 'Exercise',
                populate: [{
                    path: 'parentCategory',
                    model: 'Category',
                    select: ['name', 'type']
                },{
                    path: 'category',
                    model: 'Category',
                    select: ['name', 'type']
                }]
            }])
            .select('-visibledb -__v')
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const find = async (req, res) => {
    try{
        await Workout.find(req.query)
            .populate([{
                path: 'creator',
                model: 'User',
                select: ['name', 'phonenumber', 'email']
            },{
                path: 'workout.exercise',
                model: 'Exercise',
                populate: [{
                    path: 'parentCategory',
                    model: 'Category',
                    select: ['name', 'type']
                },{
                    path: 'category',
                    model: 'Category',
                    select: ['name', 'type']
                }]
            }])
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}
 
export const create = async (req, res) => {
    try{
        if(req.body.workout && typeof req.body.workout == "string") req.body.workout = JSON.parse(req.body.workout);
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        await Workout.create(req.body)
            .then((result) => {
                if(req?.user?.role !== 'ADMIN') User.findByIdAndUpdate(req?.user_id, { $push: { myWorkoutPlans: result._id } }).then()
                result.populate([{
                    path: 'creator',
                    model: 'User',
                    select: ['name', 'phonenumber', 'email']
                },{
                    path: 'workout.exercise',
                    model: 'Exercise',
                    populate: [{
                        path: 'parentCategory',
                        model: 'Category',
                        select: ['name', 'type']
                    },{
                        path: 'category',
                        model: 'Category',
                        select: ['name', 'type']
                    }]
                }])
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const edit = async (req, res) => {
    try{
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        if(req.body.workout && typeof req.body.workout == "string") req.body.workout = JSON.parse(req.body.workout);
        Workout.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const delet = async (req, res) => {
    try{
        await Workout.findByIdAndDelete(req.params.id)
        .then((_) => {
            // if(result.creator.id === req.user_id && req.user.role !== 'ADMIN') User.findByIdAndUpdate(req?.user_id, { $pull: { myWorkoutPlans: result._id } }).then()
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const getMy = async (req, res) => {
    try{
        const result = await Workout.find({ _id: { $in: req?.user?.myWorkoutPlans } })
        .populate([{
            path: 'creator',
            model: 'User',
            select: ['name', 'phonenumber', 'email']
        },{
            path: 'workout.exercise',
            model: 'Exercise',
            populate: [{
                path: 'parentCategory',
                model: 'Category',
                select: ['name', 'type']
            },{
                path: 'category',
                model: 'Category',
                select: ['name', 'type']
            }]
        }])
        .select('-visibledb -__v')
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $push: { myWorkoutPlans: req.params.id } }, { new: true } )
        .exec(async (_, __) => {
            const result = await Workout.findById(req.params.id);
            res.status(200).json({ status: true, result: result, message: 'Успешно добавлено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const removeMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $pull: { myWorkoutPlans: req.params.id } }, { new: true } )
        .exec(async (_, __) => {
            await Workout.findById(req.params.id).then(result => {
                if(result.creator.toString() == req.user_id) result.delete()
            })
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}