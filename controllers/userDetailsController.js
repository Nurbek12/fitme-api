import UserDetails from "../models/UserDetails.js";

export const getAll = async (req, res) => {
    try {
        const result = await UserDetails.findOne(req.query)
        .populate([{
            path: (!req.query?.role?'disciples':'trainers'),
            model: 'User'
        },{
            path: 'exercises',
            model: 'Exercise'
        },{
            path: 'products',
            model: 'Product'
        },{
            path: 'mealplans',
            model: 'MealPlan',
            populate: {
                path: 'plan.meal',
                model: 'ChildPlan',
                populate: {
                    path: 'products.product',
                    model: 'Product',
                    select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
                }
            }
        },{
            path: 'workouts',
            model: 'trainings',
            populate: {
                path: 'exercises.workout.exercise',
                model: 'Exercise'
            }
        },{
            path: 'week_workouts',
            model: 'TrainingData',
            populate: [{
                path: 'training',
                model: 'trainings',
                populate: {
                    path: 'exercises.workout.exercise',
                    model: 'Exercise'
                }
            }]
        }])
        res.status(200).json({ status: true, result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const get = async (req, res) => {
    try {
        const pp = {};
        switch(req.params.detail){
            case 'exercises': Object.assign(pp, {
                path: 'exercises',
                model: 'Exercise'
            }); break;
            case 'products': Object.assign(pp, {
                path: 'products',
                model: 'Product'
            }); break;
            case 'mealplans':  Object.assign(pp, {
                path: 'mealplans',
                model: 'MealPlan',
                populate: {
                    path: 'plan.meal',
                    model: 'ChildPlan',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                        select: ['title', 'carbohydrates', 'fat', 'proteins', 'calories'],
                    }
                }
            }); break;
            case 'workouts':  Object.assign(pp, {
                path: 'workouts',
                model: 'trainings',
                populate: {
                    path: 'exercises.workout.exercise',
                    model: 'Exercise'
                }
            }); break;
            case 'week_workouts': Object.assign(pp, {
                path: 'week_workouts',
                model: 'TrainingData',
                populate: [{
                    path: 'training',
                    model: 'trainings',
                    populate: {
                        path: 'exercises.workout.exercise',
                        model: 'Exercise'
                    }
                }]
            }); break;
            case 'disciples': Object.assign(pp, {
                path: 'disciples',
                model: 'User'
            }); break;
            case 'trainers': Object.assign(pp, {
                path: 'trainers',
                model: 'User'
            }); break;
        }
        const result = await UserDetails.findOne({user_id: req.params.id})
        .populate([pp])
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