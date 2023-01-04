import { model, Schema } from "mongoose"

export default model('MealSchema', new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
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

    breakfast: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    dinner: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    supper: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    category: String,
    childcategory: String,
}, {
    timestamps: true
}))