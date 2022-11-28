import { model, Schema } from "mongoose"

export default model('Product', new Schema({
    title: {
        type: String,
        default: true
    },
    portion: {
        type: Number,
        default: true
    },
    image: {
        type: String,
        default: true
    },
    cookingtime: {
        type: Number,
        default: true
    },
    carbohydrates: {
        type: Number,
        default: true
    },
    fat: {
        type: Number,
        default: true
    },
    proteins: {
        type: Number,
        default: true
    },
    calories: {
        type: Number,
        default: true
    },
    category: {
        type: String,
        default: true
    },
}, {
    timestamps: true
}))