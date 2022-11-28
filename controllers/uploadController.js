import User from '../models/User.js'

export const uploadAvatar = (req, res) => {
    try{
        await User.findByIdAndUpdate(
            { _id: req.params.id}, 
            { $set: { image: req.body.filename }});
        res.status(200).json({ success: true, message: 'Успешно загружено!' })
    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: 'Ошибка' })
    }
}