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
    author: {
        type: String,
        required: true
    },
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    carbohydrates: {
        percent: Number,
        value: Number
    },
    fat: {
        percent: Number,
        value: Number
    },
    proteins: {
        percent: Number,
        value: Number
    },
    calories: {
        type: Number,
    },

    plan: [{
        title: String,
        target: {
            c: Number,
            b: Number,
            j: Number,
            u: Number
        },
        actual: {
            c: Number,
            b: Number,
            j: Number,
            u: Number
        },
        meal: [{
            recs: String,
            products: [{
                count: Number,
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product'
                },
            }],
        }]
    }],
    category: String,
    childcategory: String,
}, {
    timestamps: true
}))