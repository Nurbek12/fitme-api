import Submit from "../models/Submit.js";
import User from '../models/User.js'
import UserDetails from "../models/UserDetails.js";

export const getMy = async (req, res) => {
    try{
        const {role} = await User.findOne({_id: req.params.id}); 
        await Submit.find({[role=="USER"?"user_id":"trainer_id"]: req.params.id})
        .populate([{
            path: 'user',
            model: 'User',
            select: ['name', 'email',  'phonenumber',  'male', 'age']
        }, {
            path: 'trainer',
            model: 'User',
            select: ['name', 'email',  'phonenumber',  'male', 'age']
        }])
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
        const {role} = await User.findOne({_id: req.body.user});
        if(role!=="USER") return res.status(501).json({ status: false, message: 'Вы не можете оставить заявку!' })
        const result = await Submit.create(req.body)
        res.status(200).json({ status: true, result, message: "Заявка успешно отправлено!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const refuse = async (req, res) => {
    try{
        // const {role, _id} = await User.findOne({_id: req.params.id});
        // if(role!=="USER") return res.status(501).json({ status: false, message: 'Вы не можете отменить заявку!' })
        // if(req.params.id!==_id) return res.status(501).json({ status: false, message: 'Вы можете только отменить свою заявку!' })
        const result = await Submit.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: true, result, message: "Заявка успешно отменено!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const accept = async (req, res) => {
    try{
        // const {role} = await User.findOne({_id: req.body.user});
        // if(role!=="TRAINER") return res.status(501).json({ status: false, message: 'Вы не можете принять заявку!' })
        const result = await Submit.findByIdAndUpdate(req.params.id, { status: 'принято' }, { new: true })
        .populate([{
            path: 'user',
            model: 'User',
            select: ['name', 'email',  'phonenumber',  'male', 'age']
        }, {
            path: 'trainer',
            model: 'User',
            select: ['name', 'email',  'phonenumber',  'male', 'age']
        }])
        await UserDetails.findOneAndUpdate({user_id: result.user}, { $push: { mytrainers: result.trainer } })
        await UserDetails.findOneAndUpdate({user_id: result.trainer}, { $push: { disciples: result.user } })
        res.status(200).json({ status: true, result, message: "Заявка успешно принято!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const cancel = async (req, res) => {
    try{
        // const {role} = await User.findOne({_id: req.body.user});
        // if(role!=="TRAINER") return res.status(501).json({ status: false, message: 'Вы не можете принять заявку!' })
        const result = await Submit.findByIdAndUpdate(req.params.id, { status: 'отказано' }, { new: true })
        .populate([{
            path: 'user',
            model: 'User',
            select: ['name', 'email',  'phonenumber',  'male', 'age']
        }, {
            path: 'trainer',
            model: 'User',
            select: ['name', 'email',  'phonenumber',  'male', 'age']
        }]);
        res.status(200).json({ status: true, result, message: "Заявка отказано!" })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}
