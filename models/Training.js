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
    metadescription: String,
    weeks: Number,
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    childcategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    exercises: [{
        id: String,
        workout: [{
            exercise: {
                type: Schema.Types.ObjectId,
                ref: 'Exercise'
            },
            sets: String,
            
            repeat: Number,
            weigth: Number,
            week: Array
        }],
    }],
    author: {
        type: String,
        required: true
    },
}, {
    timestamps: true
}))