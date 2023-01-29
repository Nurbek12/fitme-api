import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import { secret } from '../config/keys.js'
import sendphone from '../config/sendphone.js'
import generatecode from "../config/generatecode.js"
// import UserDetails from "../models/UserDetails.js"

export const register = async (req, res) => {
    try{
        const fuser = await User.findOne({phonenumber: req.body.phonenumber})
        if(fuser) return  res.status(403).json({ status: false, message: 'Пользователь с этим номером уже существует!' })
        const verifycode = generatecode();
        await User.create({ ...req.body, verifycode }).then(user => {
            sendphone(user.phonenumber, verifycode)
            res.status(200).json({ status: true, message: 'Успешно зарегистрирован!', verifycode })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const login = async (req, res) => {
    try{
        const fuser = await User.findOne({phonenumber: req.body.phonenumber})
        if(!fuser) return  res.status(404).json({ status: false, message: 'По этому номеру не найден пользователь!' })
        const verifycode = generatecode();
        await User.findOneAndUpdate({ phonenumber: req.body.phonenumber }, {$set: { verifycode }}).then((user) => {
            sendphone(user.phonenumber, verifycode)
            res.status(200).json({ status: true, verifycode })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const admin = async (req, res) => {
    try{
        await User.findOne({email: req.body.email}).then(user => {
            if(!user) return res.status(404).json({status: false, message: 'Этот пользователь не найден'})
            if(req.body.password !== user.password){
                return res.status(503).json({ status: false, message: 'Код неверный!' })
            }else{
                const token = jwt.sign(JSON.stringify(user), secret, {});
                return res.status(200).json({status: true, user, token, message: 'Успешный вход в систему'});
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const verify = async (req, res) => {
    try{
        await User.findOne({phonenumber: req.body.phonenumber}).then(user => {
            if(!user) return res.status(404).json({status: false, message: 'Этот пользователь не найден'})
            if(user.verifycode !== req.body.verifycode){
                return res.status(503).json({ status: false, message: 'Код неверный!' })
            }else{
                const { name, _id, email, phonenumber, pro_acc } = user;
                const token = jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }), secret, {});
                return res.status(200).json({status: true, user, token, message: 'Успешный вход в систему'});
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}