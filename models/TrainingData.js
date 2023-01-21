import { model, Schema } from 'mongoose'

export default model('TrainingData', new Schema({
    data: Array,
    weekStatus: [{
        statusText: String,
        status: Boolean,
        title: String
    }],
}, {
    timestamps: true
}))