import { model, Schema } from 'mongoose'

export default model('trainings', new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    metadescription: {
        type: String,
        required: true
    },
    weeks: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    male: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    childcategory: String,
    exercises: [{
        workout: [{
            exercise: {
                type: Schema.Types.ObjectId,
                ref: 'Exercise'
            },
            sets: String,
            week: [{
                repeat: 0,
                weigth: 0
            }]
        }],
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
}))