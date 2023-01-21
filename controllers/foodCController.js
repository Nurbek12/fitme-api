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
// !@!!!!!!!!!!!
export const getMonthly = async (req, res) => {
    try{
        const month = req.params.mm;
        const year = req.params.mm;
        const fromDate = new Date(year, month, 1);
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

        await FoodConsumed.find({"createdAt": {'$gte': fromDate, '$lte': toDate}, ...req.query})
            .populate('products.product')
            .exec((_, result) => {
                res.status(200).json({ status: true, result })
            })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка!' })
    }
}

export const edit = async (req, res) => {
    try{
        await FoodConsumed.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
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