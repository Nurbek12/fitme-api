import { model, Schema } from "mongoose"

export default model('Category', new Schema({
    name: {
        en: String,
        ru: String,
        uz: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['mealplan','product','exercise','workout','dish']
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
    }]
}, {
    timestamps: true
}))