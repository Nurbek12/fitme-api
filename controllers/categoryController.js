import Category from '../models/Category.js'

export const getParent = async (req, res) => {
    try {
        await Category.find({ parent: null })
            .populate('children')
            .sort({ type: 1 })
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getAll = async (req, res) => {
    try {
        await Category.find()
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const get = async (req, res) => {
    try {
        let result = await Category.find({ ...req.query, parent: null })
        .populate('children', 'name type parent')
        res.status(200).json({ status: true, result })    
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const add = async (req, res) => {
    try {
        const result = await Category.create(req.body);
        if (req.body.parent) await Category.findByIdAndUpdate(req.body.parent, { $push: { children: result._id } }).then()
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const edit = async (req, res) => {
    try {
        const result = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const delet = async (req, res) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);
        if(result.parent) await Category.findByIdAndUpdate(result.parent, { $pull: { children: result._id } })
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}