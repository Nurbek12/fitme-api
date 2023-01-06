import { model, Schema } from 'mongoose'

export default model('TrainingData', new Schema({
    data: Array,
}, {
    timestamps: true
}))