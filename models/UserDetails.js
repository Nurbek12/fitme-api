import { model, Schema } from "mongoose"


export default model('UserDetail', new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    disciples: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    trainers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],
    prodcuts: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],

    mealplans: [{
        type: Schema.Types.ObjectId,
        ref: "MealPlan"
    }],

    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "trainings"
    }],

    week_workouts: [{
        training: {
            type: Schema.Types.ObjectId,
            ref: "Training"
        },
        data: {
            type: Schema.Types.ObjectId,
            ref: "TrainingData"
        }
    }],
}, {
    timestamps: true
}))