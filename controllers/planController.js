import MealPlan from '../models/MealPlan.js'

export const getAll = async (req, res) => {
    try{
        await MealPlan.find()
            .populate("author", "name")
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
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
                path: 'breakfast',
                model: 'Product'
            }, {
                path: 'dinner',
                model: 'Product'
            }, {
                path: 'supper',
                model: 'Product'
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

export const edit = async (req, res) => {
    try{
        await MealPlan.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate("author", "name")
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const addProduct = async (req, res) => {
    try{
        await MealPlan.findByIdAndUpdate(req.params.id, { $push: { [req.params.time]: { $each: req.body.items} } }, { new: true })
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
                path: 'breakfast',
                model: 'Product'
            }, {
                path: 'dinner',
                model: 'Product'
            }, {
                path: 'supper',
                model: 'Product'
            }])
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const removeProduct = async (req, res) => {
    try{
        await MealPlan.findByIdAndUpdate(req.params.id, { $pull: { [req.params.time]: req.body.id } }, { new: true })
            .populate([{
                path: 'author',
                model: 'User',
                select: "_id age email image male name phonenumber"
            }, {
                path: 'breakfast',
                model: 'Product'
            }, {
                path: 'dinner',
                model: 'Product'
            }, {
                path: 'supper',
                model: 'Product'
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
        await MealPlan.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}