import Training from '../models/Training.js'
import Trainingdata from '../models/TrainingData.js'
import UserDetails from '../models/UserDetails.js'
import { fileurl } from '../config/generatecode.js'

function createTrainingDataTables(w, exs){
    const weekStatus = w.map(({start, end}, i) => ({
        id: i,
        statusText: '',
        status: false,
        start, end
    }))
    const data = exs.map(({ workout }) => {
        return Array(w.length*4).fill().map((el) => 
            workout.map(({approach}) => {
                const p = [];
                for(let i=0; i<approach;i++){
                    p.push({ repeat: 0, weight: 0 })
                }
                return p
            }
        ))
    })
    return { weekStatus, data }
}

export const getAll = async (req, res) => {
    try{
        if(req.query?.user){
            const resl = await UserDetails.findOne({ user_id: req.query.user });
            Object.assign(req.query, { _id: { $nin: resl.workouts } })
        }
        await Training.find(req.query)
            .populate([{
                path: 'exercises.workout.exercise',
                model: 'Exercise'
            }])
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
        await Training.find(req.query)
            .populate([ {
                path: 'exercises.workouts.exercise',
                model: 'Exercise'
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
        if(req.body.exercises && typeof req.body.exercises == "string") req.body.exercises = JSON.parse(req.body.exercises);
        if(req.body.weeks && typeof req.body.weeks == "string") req.body.weeks = JSON.parse(req.body.weeks);
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        console.log(req.body);
        await Training.create(req.body).then((result) => {
                if(req.query.user){
                    UserDetails.findOneAndUpdate({user_id: req.query.user}, { $push: {workouts: result._id} })
                }
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}
// !!!
export const edit = async (req, res) => {
    try{
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        if(req.body.weeks && typeof req.body.weeks == "string") req.body.weeks = JSON.parse(req.body.weeks);
        if(req.body.exercises && typeof req.body.exercises == "string") req.body.exercises = JSON.parse(req.body.exercises);
        Training.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const addWeeklyToUser = async (req, res) => {
    try{
        const { weeks, exercises, _id } = await Training.findOne({ _id: req.params.id2 });
        const resl = await Trainingdata.create({...createTrainingDataTables(weeks, exercises), training: _id});
        UserDetails.findOneAndUpdate({user_id: req.params.id1}, { $push: {week_workouts: resl._id} }, { new: true })
            .populate([{
                path: 'workouts.training',
                model: Training
            }])
            .exec((_, result) => {
                res.status(200).json({ status: true, result: result.week_workouts, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const removeProgramToUser = async (req, res) => {
    try{
        UserDetails.findOneAndUpdate({ user_id: req.params.id1 }, { $pull: {week_workouts: req.params.id2} }, { new: true })
            .exec((_, result) => {
                res.status(200).json({ status: true, result: result.week_workouts, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const editThisData = async (req, res) => {
    try{
        const { t, w, e, i, data } = req.body;
        await Trainingdata.findOne({_id: req.params.id}).then(doc => {
            Object.assign(doc.data[t][w][e][i], data);
            doc.markModified('data')
            doc.save().then(result => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            });
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const delet = async (req, res) => {
    try{
        await Training.findByIdAndDelete(req.params.id)
        .then((result) => {
            if(req.query.user){
                UserDetails.findOneAndUpdate({ user_id: req.query.user }, { $pull: { workouts: result._id } })
            }
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}