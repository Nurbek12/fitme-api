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

    telegramLink: String,
    instagramLink: String,

    disciples: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    mytrainers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    samples: [{
        type: Schema.Types.ObjectId,
        ref: "Samples"
    }],
    mealplans: [{
        type: Schema.Types.ObjectId,
        ref: "MealPlan"
    }],
    workouts: [{
        training: {
            type: Schema.Types.ObjectId,
            ref: "Training"
        },
        weekStatus: [{
            statusText: String,
            status: Boolean,
            title: String
        }],
        data: {
            type: Schema.Types.ObjectId,
            ref: "TrainingData"
        }
    }],
}, {
    timestamps: true
}))

