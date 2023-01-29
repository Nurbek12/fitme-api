import { model, Schema } from "mongoose"


export default model('User', new Schema({
    name: String,
    phonenumber: String,

    pro_acc: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'TRAINER', 'ADMIN', 'SUPERADMIN']
    },


    mytrainers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    
    favoriteExercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],

    favoriteProduct: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],

    scheduleWorkout: [{
        type: Schema.Types.ObjectId,
        ref: "Schedule"
    }],

    myWorkoutPlans: [{
        type: Schema.Types.ObjectId,
        ref: "trainings"
    }],

    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],

    mealplans: [{
        type: Schema.Types.ObjectId,
        ref: "MealPlan"
    }],

    gender: String,
    email: String,
    city: String,
    image: String,
    about: String,
    formation: String,
    speciality: String,
    verifycode: String,
    password: String,
    provider: String,
    socialID: String,
    age: Number,
    experience: Number,
    telegramLink: String,
    instagramLink: String,

    disciples: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

}, {
    timestamps: true
}))

