import { model, Schema } from "mongoose"

export default model('Exercise', new Schema({
    title: {
        type: String,
        required: true
    },
    video: String,
    image: String,
    description: {
        type: String,
        required: true
    },
    metadescription: String,
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
}, {
    timestamps: true
}))