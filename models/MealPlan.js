import { model, Schema } from "mongoose"

export default model('MealPlan', new Schema({
    price: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
}, {
    timestamps: true
}))