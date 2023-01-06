import { model, Schema } from "mongoose"

export default model('FoodConsumed', new Schema({
    date: {
        type: String,
        required: true
    },
    surplus: {
        calory: Number,
        b: Number,
        j: Number,
        u: Number
    },
    actual: {
        calory: Number,
        b: Number,
        j: Number,
        u: Number
    },
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
}, {
    timestamps: true
}))