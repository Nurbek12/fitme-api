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
    weeks: Array,
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
        type: String
    },
    author: {
        type: String,
        required: true
    },
    exercises: [{
        workout: [{
            exercise: {
                type: Schema.Types.ObjectId,
                ref: 'Exercise'
            },
            approach: Number,
            repeat: String,
        }],
    }],
}, {
    timestamps: true
}))