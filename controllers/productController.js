import Product from '../models/Product.js'
import { fileurl } from '../config/generatecode.js'

export const getAll = async (req, res) => {
    try{
        const result = await Product.find();
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getProduct = async (req, res) => {
    try{
        const result = await Product.findOne(req.query);
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}
 
export const add = async (req, res) => {
    try{
        req.body.image = fileurl(req, req.file.filename)
        const result = await Product.create(req.body);
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const edit = async (req, res) => {
    try{
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        const result = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const delet = async (req, res) => {
    try{
        const result = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}