import Category from '../models/Categories.js'

export const getParent = async (req, res) => {
    try{
        await Category.find({ parent: null })
        .populate([{
            path: 'author',
            model: 'User',
            select: "_id age email image male name phonenumber"
        }, {
            path: 'child',
            model: 'Category'
        }])
        .sort({ theme: 1 })
        .exec((_, result) => {
            res.status(200).json({ status: true, result })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getAll = async (req, res) => {
    try{
        await Category.find()
        .populate([{
            path: 'author',
            model: 'User',
            select: "_id age email image male name phonenumber"
        }, {
            path: 'child',
            model: 'Category'
        }])
        .sort({ theme: 1 })
        .exec((_, result) => {
            res.status(200).json({ status: true, result })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const get = async (req, res) => {
    try{
        const result = await Category.find({...req.query, parent: null})
        .populate([{
            path: 'author',
            model: 'User',
            select: "_id age email image male name phonenumber"
        }, {
            path: 'child',
            model: 'Category'
        }])
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const add = async (req, res) => {
    try{
        const result = await Category.create(req.body);
        if(req.body.parent) await Category.findByIdAndUpdate(req.body.parent, { $push: {child: result._id} })
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const edit = async (req, res) => {
    try{
        const result = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .populate([{
            path: 'author',
            model: 'User',
            select: "_id age email image male name phonenumber"
        }, {
            path: 'child',
            model: 'Category'
        }]);
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const delet = async (req, res) => {
    try{
        const result = await Category.findByIdAndDelete(req.params.id);
        await Category.findByIdAndUpdate(result.parent, { $pull: { child: result._id } })
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}