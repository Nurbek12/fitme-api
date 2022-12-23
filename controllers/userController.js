import User from "../models/User.js"
import { fileurl } from '../config/generatecode.js'

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

export const getAllUsers = async (req, res) => {
    try{
        const result = await User.find({ ...req.query, role: 'USER' })
        .select('name email phonenumber male age mytrainers mealplans workouts');
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
        .select('name email phonenumber male age mytrainers mealplans workouts')
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
export const getAllTrainers = async (req, res) => {
    try{
        const result = await User.find({ ...req.query, role: 'TRAINER'})
        .select('name email phonenumber city about image speciality formation male age experience socialMedia disciples mealplans workouts');
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getTrainer = async (req, res) => {
    try{
        const result = await User.find({ ...req.query, role: 'TRAINER'})
        .select('name email phonenumber city about image speciality formation male age experience socialMedia disciples mealplans workouts');
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addTrainer = async (req, res) => {
    try{
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        const result = await User.create({...req.body, role: 'TRAINER'})
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

// admin
export const getAllAdmin = async (req, res) => {
    try{
        const result = await User.find({ ...req.query, role: 'ADMIN'})
        .select('name email phonenumber password');;
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
        if(req.file) req.body.image = fileurl(req, req.file.filename)
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