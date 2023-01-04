import Exercise from '../models/Exercise.js'
import { fileurl } from '../config/generatecode.js'

export const getAll = async (req, res) => {
    try{
        const result = await Exercise.find(req.query);
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
        const result = await Exercise.find(req.query);
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
        // if(req.files){
        //     req.body.image = fileurl(req, req.files.image[0].filename)
        //     req.body.video = fileurl(req, req.files.video[0].filename)
        // }
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