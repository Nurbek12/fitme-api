import { model, Schema } from "mongoose"

export default model('ChildPlan', new Schema({
    description: String,
    products: [{
        gram: Number,
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    }],
}, {
    timestamps: true
}))