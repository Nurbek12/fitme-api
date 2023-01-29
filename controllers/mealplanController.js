import MealPlan from '../models/MealPlan.js'
import ChildPlan from '../models/ChildPlan.js'
import User from '../models/User.js'

export const getAll = async (req, res) => {
    try{
        await MealPlan.find({ _id: { $nin: req?.user?.mealplans }, visibledb: true})
            .populate([{
                path: 'plan',
                model: 'ChildPlan',
                populate: {
                    path: 'products.product',
                    model: 'Product',
                    select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
                }
            }, {    
                path: 'creator',
                model: 'User',
                select: ['name', 'phonenumber', 'email']
            }])
            .select('-visibledb -__v')
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const getPlan = async (req, res) => {
    try{
        await MealPlan.find(req.query)
            .populate([{
                path: 'plan',
                model: 'ChildPlan',
                populate: {
                    path: 'products.product',
                    model: 'Product',
                    select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
                }
            }, {    
                path: 'creator',
                model: 'User',
                select: ['name', 'phonenumber', 'email']
            }])
            .select('-visibledb -__v')
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
        await MealPlan.create(req.body)
            .then((result) => {
                if(req?.user?.role !== 'ADMIN') User.findByIdAndUpdate(req?.user_id, { $push: { mealplans: result._id } }).then()
                result.populate([{
                    path: 'plan',
                    model: 'ChildPlan',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                        select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
                    }
                }, {    
                    path: 'creator',
                    model: 'User',
                    select: ['name', 'phonenumber', 'email']
                }])
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const createChild = async (req, res) => {
    try{
        const child = new ChildPlan(req.body);
        child.save(function(_, book) {
            book
            .populate('products.product', 'title carbohydrates fat proteins calories')
            .then((result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const editChild = async (req, res) => {
    try{
        await ChildPlan.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('products.product', 'title carbohydrates fat proteins calories')
            .then((result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const removeChild = async (req, res) => {
    try{
        await ChildPlan.findByIdAndDelete(req.params.id)
            .then((_) => {
                res.status(200).json({ status: true, message: 'Успешно удалено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

// export const addChildProduct = async (req, res) => {
//     try{
//         await ChildPlan.findByIdAndUpdate(req.params.id, { $push: {products: req.body} }, { new: true })
//             .populate('products.product', 'title carbohydrates fat proteins calories') 
//             .then((result) => {
//                 res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
//             })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ status: false, message: 'Ошибка!' })
//     }
// }

// export const editChildProduct = async (req, res) => {
//     try{
//         await ChildPlan.findOneAndUpdate({"products._id": req.params.id}, {$set: {"products.$": req.body}}, { new: true })
//             .populate('products.product', 'title carbohydrates fat proteins calories')     
//             .then((result) => {
//                 res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
//             })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ status: false, message: 'Ошибка!' })
//     }
// }

// export const removeChildProduct = async (req, res) => {
//     try{
//         await ChildPlan.findByIdAndUpdate(req.params.id, { $pull: {products: {_id: req.body.id}} }, { new: true })
//             .then((result) => {
//                 res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
//             })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ status: false, message: 'Ошибка!' })
//     }
// }

export const edit = async (req, res) => {
    try{
        await MealPlan.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate([{
                path: 'plan',
                model: 'ChildPlan',
                populate: {
                    path: 'products.product',
                    model: 'Product',
                    select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
                }
            }, {    
                path: 'creator',
                model: 'User',
                select: ['name', 'phonenumber', 'email']
            }])
            .select('-visibledb -__v')
            .exec((_, result) => {
                res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const delet = async (req, res) => {
    try{
        await MealPlan.findByIdAndDelete(req.params.id)
        .then((result) => {
            // if(result?.creator?.id === req.user_id && req.user.role !== 'ADMIN') User.findByIdAndUpdate(req?.user_id, { $pull: { mealplans: result._id } }).then()
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const getMy = async (req, res) => {
    try{
        const result = await MealPlan.find({ _id: { $in: req?.user?.mealplans } })
        .populate([{
            path: 'plan',
            model: 'ChildPlan',
            populate: {
                path: 'products.product',
                model: 'Product',
                select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
            }
        }, {    
            path: 'creator',
            model: 'User',
            select: ['name', 'phonenumber', 'email']
        }])
        .select('-visibledb -__v')
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const addMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $push: { mealplans: req.params.id } } )
        .exec(async (_, __) => {
            res.status(200).json({ status: true, message: 'Успешно добавлено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const removeMyDetails = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.user_id, { $pull: { mealplans: req.params.id } })
        .exec(async (_, __) => {
            await MealPlan.findById(req.params.id).then(result => {
                if(result.creator.toString() == req.user_id) result.delete()
            })
            res.status(200).json({ status: true, message: 'Успешно удалено!' })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}