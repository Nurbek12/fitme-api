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
    creator: {
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

    plan: [
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'ChildPlan'
            }
        ]
    ],
    visibledb: {
        type: Boolean,
        default: false
    },
    category: String,
    childcategory: String,
}, {
    timestamps: true
}))