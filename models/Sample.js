import { model, Schema } from "mongoose"

export default model('Product', new Schema({
    date: String,
    data: [{
        title: String,
        size: Number
    }]
}))
