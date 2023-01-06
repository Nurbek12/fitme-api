import MealPlan from '../models/MealPlan.js'
import User from '../models/User.js'

export const getAll = async (req, res) => {
    try{
        await MealPlan.find()
            .populate("plan.products.product")
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const getPlan = async (req, res) => {
    try{
        await MealPlan.find(req.query)
            .populate("plan.products.product")
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
        const { _id } = await MealPlan.create(req.body);
        await MealPlan.findById(_id)
            .populate("author", "name")
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const addProgramToUser = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.params.id1, { $push: {mealplans: req.params.id2} }, { new: true })
            .populate('mealplans')
            .exec((_, result) => {
                res.status(200).json({ status: true, result: result.mealplans, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const removeProgramToUser = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.params.id1, { $pull: {mealplans: req.params.id2} }, { new: true })
            .populate('mealplans')
            .exec((_, result) => {
                res.status(200).json({ status: true, result: result.mealplans, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const edit = async (req, res) => {
    try{
        await MealPlan.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate("plan.products.product")
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
        await MealPlan.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}