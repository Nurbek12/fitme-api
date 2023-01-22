import UserDetails from "../models/UserDetails.js";

export const getAll = async (req, res) => {
    try {
        const result = await UserDetails.find(req.query)
        .populate([(!req.query.role?'disciples':'trainers'),'exercises','prodcuts','mealplans','workouts','week_workouts'])
        res.status(200).json({ status: true, result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const get = async (req, res) => {
    try {
        const result = await UserDetails.findOne({user_id: req.params.id})
        .populate(req.params.detail)
        res.status(200).json({ status: true, result: result[req.params.detail] })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const add = async (req, res) => {
    try {
        await UserDetails.findOneAndUpdate({ user_id: req.params.id }, { $push: { [req.params.detail]: req.params.did } }, { new: true })
        .populate(req.params.detail)
        .exec((_, result) => {
            res.status(200).json({ status: true, result: result[req.params.detail] })
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const remove = async (req, res) => {
    try {
        await UserDetails.findOneAndUpdate({ user_id: req.params.id }, { $pull: { [req.params.detail]: req.params.did } }, { new: true })
        .populate(req.params.detail)
        .exec((_, result) => {
            res.status(200).json({ status: true, result: result[req.params.detail] })
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}