import User from "../models/User.js"

// users
export const getAll = async (req, res) => {
    try{
        const result = await User.find()
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getAllUsers = async (_, res) => {
    try{
        const result = await User.find({ role: 'USER' });
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

// Надо тестировать
export const getUser = async (req, res) => {
    try{
        const result = await User.findOne({_id: req.params.id, role: 'USER'})
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addUser = async (req, res) => {
    try{
        const result = await User.create({...req.body, role: 'USER'})
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

// trainers
export const getAllTrainers = async (_, res) => {
    try{
        const result = await User.find({role: 'TRAINER'});
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getTrainer = async (req, res) => {
    try{
        const result = await User.findOne({_id: req.params.id, role: 'TRAINER'})
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addTrainer = async (req, res) => {
    try{
        const result = await User.create({...req.body, role: 'TRAINER'})
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

// admin
export const getAllAdmin = async (_, res) => {
    try{
        const result = await User.find({role: 'ADMIN'});
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getAdmin = async (req, res) => {
    try{
        const result = await User.findOne({_id: req.params.id, role: 'ADMIN'})
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addAdmin = async (req, res) => {
    try{
        const result = await User.create({...req.body, role: 'ADMIN'})
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

// edit
export const editUser = async (req, res) => {
    try{
        const result = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new :true })
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

// edit
export const deleteUser = async (req, res) => {
    try{
        const result = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}