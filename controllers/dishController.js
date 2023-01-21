import Dish from '../models/Dish.js'

export const getAllDish = async (req, res) => {
    try{
        await Dish.find()
        .populate('products.product', 'title carbohydrates fat proteins calories')
        .exec((_, result) => {
            res.status(200).json({ status: true, result })
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getDish = async (req, res) => {
    try{
        await Dish.find(req.query)
        .populate('products.product', 'title carbohydrates fat proteins calories')
        .exec((_, result) => {
            res.status(200).json({ status: true, result })
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}
 
export const addDish = async (req, res) => {
    try{
        const result = await Dish.create(req.body);
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addProduct = async (req, res) => {
    try{
        await Dish.findByIdAndUpdate(req.params.id, { $push: { products: req.body } }, { new: true })
            .populate('products.product', 'title carbohydrates fat proteins calories')     
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const editProduct = async (req, res) => {
    try{
        await Dish.findOneAndUpdate({"products._id": req.params.id}, {$set: {"products.$": req.body}}, { new: true })
            .populate('products.product', 'title carbohydrates fat proteins calories')     
            .then((result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const removeProduct = async (req, res) => {
    try{
        await Dish.findByIdAndUpdate(req.params.id, { $pull: { products: {_id: req.body.id} }}, { new: true })
            .populate('products.product', 'title carbohydrates fat proteins calories')
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const editDish = async (req, res) => {
    try{
        await Dish.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .populate('products.product', 'title carbohydrates fat proteins calories')
        .exec((_, result) => {
            res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const deleteDish = async (req, res) => {
    try{
        const result = await Dish.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}