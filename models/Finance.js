import { model, Schema } from 'mongoose'

export default model('Finance', new Schema({
    token: String,
    category: String,
    day: String,
    time: String,
    price: String,
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: String
}, {
    timestamps: true
}))