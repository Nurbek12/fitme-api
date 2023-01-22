import User from "../models/User.js"
import UserDetails from "../models/UserDetails.js"
import { fileurl } from '../config/generatecode.js'
import { Types } from "mongoose"

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

export const getMy = async (req, res) => {
    try{
        const myusers = await UserDetails.findOne({user_id: req.params.id})
        const result = await User.aggregate([{
            $match: { _id: { $in: myusers.disciples.map(el => Types.ObjectId(el)) } },
        }, {
            $lookup: {
                from: "samples",
                localField: "_id",
                foreignField: "_id",
                as: "sampl"
            },
        }, {
            $project: {
                name: 1, 
                email: 1, 
                phonenumber: 1
            }
        }])
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const deletDisc = async (req, res) => {
    try{
        await UserDetails.findOneAndUpdate({user_id: req.params.id1}, { $pull: { disciples: req.params.id2 } })
        await UserDetails.findOneAndUpdate({user_id: req.params.id2}, { $pull: { mytrainers: req.params.id1 } })
        res.status(200).json({ status: true, message: 'Успешно отредактировано!' })
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
        await UserDetails.create({ user_id: result._id })
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
        .select('name email phonenumber city about password image telegramLink instagramLink speciality formation male age experience disciples mealplans workouts');
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getTrainer = async (req, res) => {
    try{
        const result = await User.find({ ...req.query, role: 'TRAINER'})
        .select('name email phonenumber city about password image speciality formation male age experience socialMedia disciples mealplans workouts');
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
        await UserDetails.create({ user_id: result._id })
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
        let roleSelect, rolePopulate;
        switch(req.body.role){
            case 'ADMIN': 
                roleSelect = 'name email phonenumber password role'
                rolePopulate = []
                break;
            case 'TRAINER': 
                roleSelect = 'name email phonenumber city about password role image speciality formation male age experience telegramLink instagramLink disciples mealplans workouts'
                rolePopulate = ['disciples', 'mealplans', 'workouts']
                break;
            case 'USER': 
                roleSelect = 'name email phonenumber male age mytrainers mealplans workouts role'
                rolePopulate = ['mytrainers', 'mealplans', 'workouts']
                break;
        }
        if(req.file) req.body.image = fileurl(req, req.file.filename)
        await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new :true })
            .select(roleSelect)
            .populate(rolePopulate)
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
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