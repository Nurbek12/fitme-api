import Training from '../models/Training.js'
import Trainingdata from '../models/TrainingData.js'
import UserDetail from '../models/UserDetails.js'
import { fileurl } from '../config/generatecode.js'

function createTrainingDataTables(w, exs){
    const weekStatus = w.map((el, i) => ({
        id: i,
        statusText: '',
        status: false,
        title: el
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
        await Training.find()
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
        if(req.body.exercises) req.body.exercises = JSON.parse(req.body.exercises);
        req.body.weeks = ['Неделя 1-4', 'Неделя 5-8', 'Неделя 9-12'];
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        await Training.create(req.body).then((result) => {
                if(req.query.user){
                    UserDetails.findByIdAndUpdate({user_id: req.query.user}, { $push: {mealplans: result._id} })
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
        if(req.body.exercises) req.body.exercises = JSON.parse(req.body.exercises);
        await Training.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
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
        const { weeks, exercises } = await Training.findOne({ _id: req.params.id2 });
        const { _id } = await Trainingdata.create(createTrainingDataTables(weeks, exercises));
        await UserDetail.findByIdAndUpdate({user_id: req.params.id1}, { $push: {week_workouts: { training: req.params.id2, data: _id}} }, { new: true })
            .populate([{
                path: 'workouts.training',
                model: Training
            }, {
                path: 'workouts.data',
                model: 'TrainingData'
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
        await User.findByIdAndUpdate(req.params.id1, { $pull: {week_workouts: req.params.id2} }, { new: true })
            .populate('workouts')
            .exec((_, result) => {
                res.status(200).json({ status: true, result: result.workouts, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

// export const addExercise = async (req, res) => {
//     try{
//         await Training.findByIdAndUpdate(req.params.id1, { $push: { exercises: req.body } }, { new: true })
//             .populate([{
//                 path: 'exercises.workouts.exercise',
//                 model: 'Exercise'
//             }])
//             .exec((_, result) => {
//                 res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
//             })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ status: false, message: 'Ошибка!' })
//     }
// }

// export const removeExercise = async (req, res) => {
//     try{
//         await Training.findByIdAndUpdate(req.params.id, { $pull: { exercises: req.body.id } }, { new: true })
//             .populate([{
//                 path: 'exercises.workouts.exercise',
//                 model: 'Exercise'
//             }])
//             .exec((_, result) => {
//                 res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
//             })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ status: false, message: 'Ошибка!' })
//     }
// }

export const editThisData = async (req, res) => {
    try{
        const { t, w, e, i, dt } = req.body;
        await Trainingdata.findOne({_id: req.params.id}).then(doc => {
            Object.assign(doc.data[t][w][e][i], dt);
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
        .then(() => {
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}