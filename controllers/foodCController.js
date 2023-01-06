import FoodConsumed from '../models/FoodConsumed.js'

export const getAll = async (req, res) => {
    try{
        await FoodConsumed.find(req.query)
            .populate('products.product')
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const add = async (req, res) => {
    try{
        await FoodConsumed.create(req.body)
            .then(( result) => {
                res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}