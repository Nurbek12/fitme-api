import { model, Schema } from "mongoose"

export default model('Samples', new Schema({
    date: String,
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    data: [{
        title: String,
        size: Number
    }]
}))
