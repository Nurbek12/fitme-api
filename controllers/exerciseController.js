import Exercise from '../models/Exercise.js'
import { fileurl } from '../config/generatecode.js'
import User from '../models/User.js'

export const getAll = async (req, res) => {
    try{
        const result = await Exercise.find({ _id: { $nin: req?.user?.favoriteExercises }, ...req.query})
        .select('-__v');
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getForArray = async (req, res) => {
    try{
        await Exercise.find(req.query)
        .select('_id title')
        .exec((_, result) => {
            res.status(200).json({ status: true, result })
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getExercise = async (req, res) => {
    try{
        const result = await Exercise.findOne(req.query);
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const add = async (req, res) => {
    try{
        if(req.files?.image) req.body.image = fileurl(req, req.files.image[0].filename)
        if(req.files?.video) req.body.video = fileurl(req, req.files.video[0].filename)
        const result = await Exercise.create(req.body);
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const edit = async (req, res) => {
    try{
        if(req.files?.image) req.body.image = fileurl(req, req.files.image[0].filename)
        if(req.files?.video) req.body.video = fileurl(req, req.files.video[0].filename)
        const result = await Exercise.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const delet = async (req, res) => {
    try{
        const result = await Exercise.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getMy = async (req, res) => {
    try{
        const result = await Exercise.find({ _id: { $in: req?.user?.favoriteExercises } })
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $push: { favoriteExercises: req.params.id } }, { new: true } )
        .exec(async (_, __) => {
            const result = await Exercise.findById(req.params.id);
            res.status(200).json({ status: true, result: result, message: 'Успешно добавлено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const removeMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $pull: { favoriteExercises: req.params.id } }, { new: true } )
        .exec(async (_, __) => {
            const result = await Exercise.findById(req.params.id);
            res.status(200).json({ status: true, result: result, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}