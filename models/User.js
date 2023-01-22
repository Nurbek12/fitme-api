import { model, Schema } from "mongoose"


export default model('User', new Schema({
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'TRAINER' ,'ADMIN']
    },

    name: String,
    male: String,
    city: String,
    image: String,
    about: String,
    email: String,
    password: String,
    formation: String,
    verifycode: String,
    speciality: String,
    phonenumber: String,
    provider: String,
    socialID: String,
    
    age: Number,
    experience: Number,

    telegramLink: String,
    instagramLink: String,
    pro_acc: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
}))

