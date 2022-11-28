import { model, Schema } from "mongoose"

const schema = new Schema({
    name: String,
    child: Array
}, {
    timestamps: true
})

export const ProductCategory = model('ProductCategory', schema)

export const ExerciseCategory = model('ExerciseCategory', schema)

// export const ProductCategory = model('ProductCategory', schema)