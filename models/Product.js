import { model, Schema } from "mongoose"

export default model('Product', new Schema({
    title: {
        type: String,
        default: true
    },
    image: String,
    carbohydrates: Number,
    fat: Number,
    proteins: Number,
    calories: Number,
    portion: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    childcategory: String,
    visibledb: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
}))