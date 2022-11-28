import { model, Schema } from "mongoose"

export default model('Training', new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
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
        type: String
    },
    male: {
        type: String,
        required: true
    },
    weeks: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    exercises: [{
        exercise: {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        },
        sets: String,
        week: [{
            repeat: Number,
            weigth: Number,
        }],
        // status: String,
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
}))