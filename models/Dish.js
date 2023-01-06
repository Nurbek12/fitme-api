import { model, Schema } from "mongoose";

export default model('Dish', new Schema({
    title: {
        type: String,
        required: true
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
    author: String,
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        count: Number,
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
}))