import Training from '../models/Training.js'

export const getAll = async (req, res) => {
    try{
        await Training.find()
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
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
        await Training.findOne(req.query)
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
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
        const { filename, ...data } = req.body;
        const { _id } = await Training.create({...data, image: filename});
        await Training.findById(_id)
            .populate("author", "name")
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const edit = async (req, res) => {
    try{
        const { filename } = req.body;
        if(filename) req.body.image = filename;
        await Training.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate("author", "name")
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const addExercise = async (req, res) => {
    try{
        await Training.findByIdAndUpdate(req.params.id1, { $push: { exercises: req.body } }, { new: true })
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
                path: 'exercises.workouts.exercise',
                model: 'Exercise'
            }])
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const removeExercise = async (req, res) => {
    try{
        await Training.findByIdAndUpdate(req.params.id, { $pull: { exercises: req.body.id } }, { new: true })
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
                path: 'exercises.workouts.exercise',
                model: 'Exercise'
            }])
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
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