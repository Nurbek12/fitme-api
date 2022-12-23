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
    author: {
        type: String,
        required: true
    },
    image: String,
    cookingtime: Number,
    carbohydrates: Number,
    fat: Number,
    proteins: Number,
    calories: Number,
    category: {
        type: String,
        default: true
    },
    childcategory: String,
}, {
    timestamps: true
}))