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
    approach: Number,
    timing: Number,
    calory: Number,
    category: String,
    childcategory: String,
}, {
    timestamps: true
}))