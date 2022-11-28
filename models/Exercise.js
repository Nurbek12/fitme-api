import { model, Schema } from "mongoose"

export default model('Exercise', new Schema({
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    approach: {
        type: Number,
        required: true
    },
    timing: {
        type: Number,
        required: true
    },
    calory: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {
    timestamps: true
}))