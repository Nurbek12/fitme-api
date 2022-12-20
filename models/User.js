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

    sales: Array,
    socialMedia: Array,

    disciples: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    mytrainers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    mealplans: [{
        type: Schema.Types.ObjectId,
        ref: "MealPlan"
    }],
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "Training"
    }],
}, {
    timestamps: true
}))

// const extend = (scm, obj) => (new Schema(Object.assign({}, scm.obj, obj)));

// const reg = new Schema({
//     name: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// })

// const admin = extend(reg, {
//     login: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })

// const user = extend(reg, {
//     phonenumber: {
//         type: String,
//         required: true
//     },
//     male: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     email: String,
//     verifycode: String,
//     sales: Array,
// })

// const trainer = extend(reg, {
//     phonenumber: {
//         type: String,
//         required: true
//     },
//     male: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     email: String,
//     verifycode: String,

//     speciality: {
//         type: String,
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     experience: {
//         type: Number,
//         required: true
//     },
//     socialMedia: Array,
//     image: String,
//     formation: String,
//     about: String,
//     bid: Array,
// })
// export const Reg = model('Reg', reg)
// export const User = model('User', user)
// export const Admin = model('Admin', admin)
// export const Trainer = model('Trainer', trainer)
// export const GetAll = async (obj) => {
//     return [...(await User.find(obj)), ...(await Admin.find(obj)), ...(await Trainer.find(obj))].filter(a=>a)
// }


