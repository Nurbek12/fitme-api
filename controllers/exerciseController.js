import Exercise from '../models/Exercise.js'

export const getAll = async (req, res) => {
    try{
        const result = await Exercise.find();
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const getExercise = async (req, res) => {
    try{
        const result = await Exercise.findOne(req.query);
        res.status(200).json({ status: true, result })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const add = async (req, res) => {
    try{
        const { filename, ...data } = req.body;
        const result = await Exercise.create({...data, video: filename});
        res.status(200).json({ status: true, result, message: 'Успешно добавлено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const edit = async (req, res) => {
    try{
        const { filename } = req.body;
        if(filename) req.body.video = filename;
        const result = await Exercise.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ status: true, result, message: 'Успешно отредактировано!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}

export const delet = async (req, res) => {
    try{
        const result = await Exercise.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, result, message: 'Успешно удалено!' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: 'Ошибка' })
    }
}