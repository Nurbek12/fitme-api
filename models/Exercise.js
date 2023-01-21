import { model, Schema } from "mongoose"

export default model('Exercise', new Schema({
    title: {
        type: String,
        required: true
    },
    video: String,
    description: {
        type: String,
        required: true
    },
    image: String,
    author: {
        type: String,
        required: true
    },
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    metadescription: String,
    category: String,
    childcategory: String,
}, {
    timestamps: true
}))