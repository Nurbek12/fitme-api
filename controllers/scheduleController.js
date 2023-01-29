import Schedule from '../models/Schedule.js'
import WorkoutPlan from '../models/WorkoutPlan.js'
import User from '../models/User.js'

function createScheduleTables(exs, w){
    const result = exs.map((workout) => {
        return Array(w).fill().map((_) => 
            workout.map(({approach}) => {
                const p = [];
                for(let i=0; i<approach;i++){
                    p.push({ repeat: 0, weight: 0 })
                }
                return p
            }
        ))
    })
    return { result }
}

export const getMy = async (req, res) => {
    try{
        await Schedule.find({ executor: req.user_id })
            .populate([{
                path: 'plan',
                model: '',
                populate: [{
                    path: 'creator',
                    model: 'User',
                    select: ['name', 'phonenumber', 'email']
                },{
                    path: 'workout.exercise',
                    model: 'Exercise'
                }]
            }, {
                path: 'executor',
                model: 'User',
                select: ['name', 'phonenumber', 'email']
            }])
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const create = async (req, res) => {
    try{
        const workout = await WorkoutPlan.findById(req.params.id);
        await Schedule.create({ plan: req.params.id, executor: req.user_id, ...createScheduleTables(workout.workout, workout.weeks)})
            .then((result) => {
                result.populate([{
                    path: 'plan',
                    model: '',
                    populate: [{
                        path: 'creator',
                        model: 'User',
                        select: ['name', 'phonenumber', 'email']
                    },{
                        path: 'workout.exercise',
                        model: 'Exercise'
                    }]
                }, {
                    path: 'executor',
                    model: 'User',
                    select: ['name', 'phonenumber', 'email']
                }])
                User.findByIdAndUpdate(result.executor, { $push: { scheduleWorkout: result._id } }).then()
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const edit = async (req, res) => {
    try{
        const { t, w, e, i, data } = req.body;
        await Schedule.findOne({_id: req.params.id}).then(doc => {
            Object.assign(doc.result[t][w][e][i], data);
            doc.markModified('result')
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
        await Schedule.findByIdAndDelete(req.params.id)
            .then(result => {
                User.findByIdAndUpdate(req.user_id, { $pull: { scheduleWorkout: result._id } }).then()
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}