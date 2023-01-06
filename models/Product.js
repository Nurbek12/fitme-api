import { model, Schema } from "mongoose"

export default model('Product', new Schema({
    title: {
        type: String,
        default: true
    },
    author: {
        type: String,
        required: true
    },
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String,
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