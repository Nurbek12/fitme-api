import Product from '../models/Product.js'
import { fileurl } from '../config/generatecode.js'
import User from '../models/User.js'

export const getAll = async (req, res) => {
    try{
        const result = await Product.find({ _id: { $nin: req?.user?.favoriteProduct }, visibledb: true})
        .populate([{
            path: 'category',
            model: 'Category',
            select: ['name', 'type']
        }])
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getProduct = async (req, res) => {
    try{
        const result = await Product.findOne(req.query)
        .populate([{
            path: 'category',
            model: 'Category',
            select: ['name', 'type']
        }])
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const add = async (req, res) => {
    try{
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        const result = await Product.create(req.body);
        if(req?.user?.role !== 'ADMIN') User.findByIdAndUpdate(req?.user_id, { $push: { favoriteProduct: result._id } }).then()
        result.populate([{
            path: 'category',
            model: 'Category',
            select: ['name', 'type']
        }])
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const edit = async (req, res) => {
    try{
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        const result = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .populate([{
            path: 'category',
            model: 'Category',
            select: ['name', 'type']
        }])
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const delet = async (req, res) => {
    try{
        const result = await Product.findByIdAndDelete(req.params.id);
        // if(result.creator.id === req.user_id && req.user.role !== 'ADMIN') User.findByIdAndUpdate(req?.user_id, { $pull: { favoriteProduct: result._id } }).then()
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getMy = async (req, res) => {
    try{
        const result = await Product.find({ _id: { $in: req?.user?.favoriteProduct } })
        .populate([{
            path: 'category',
            model: 'Category',
            select: ['name', 'type']
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
        await User.findByIdAndUpdate(req.user_id, { $push: { favoriteProduct: req.params.id } }, { new: true } )
        .populate([{
            path: 'category',
            model: 'Category',
            select: ['name', 'type']
        }])
        .exec(async (_, __) => {
            const result = await Product.findById(req.params.id);
            res.status(200).json({ status: true, result: result, message: 'Успешно добавлено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const removeMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $pull: { favoriteProduct: req.params.id } }, { new: true } )
        .exec(async (_, __) => {
            await Product.findById(req.params.id).then(result => {
                if(result.creator.toString() == req.user_id) result.delete()
            })
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}