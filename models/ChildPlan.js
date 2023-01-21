import { model, Schema } from "mongoose"

export default model('ChildPlan', new Schema({
    desc: String,
    products: [{
        count: Number,
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    }],
}, {
    timestamps: true
}))