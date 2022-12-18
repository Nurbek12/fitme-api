import { model, Schema } from "mongoose"

export default model('Category', new Schema({
    title: String,
    theme: {
        type: String,
        required: true,
        enum: ['mealplan','product','exercise','workout']
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    child: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {
    timestamps: true
}))