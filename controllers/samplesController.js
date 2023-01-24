import Samples from "../models/Sample.js";

export const getAll = async (req, res) => {
    try{
        Samples.find({authorid: req.params.id})
        .sort({ _id: -1 })
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
        const result = await Samples.create(req.body)
        res.status(200).json({ status: true, result, message: "Успешно добавлено!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const edit = async (req, res) => {
    try{
        const result = await Samples.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({ status: true, result, message: "Успешно отредактировано!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const delet = async (req, res) => {
    try{
        await Samples.findOneAndDelete(req.params.id)
        res.status(200).json({ status: true, message: "Успешно отредактировано!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}
