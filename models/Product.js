import { model, Schema } from "mongoose"

export default model('Product', new Schema({
    title: {
        type: String,
        default: true
    },
    author: {
        type: String
    },
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String,
    carbohydrates: Number,
    fat: Number,
    proteins: Number,
    calories: Number,
    portion: Number,
    category: {
        type: String,
        default: true
    },
    childcategory: String,
    visibledb: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
}))