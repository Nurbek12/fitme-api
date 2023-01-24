import { model, Schema } from 'mongoose'

export default model('TrainingData', new Schema({
    data: Array,
    training: {
        type: Schema.Types.ObjectId,
        ref: 'trainings'
    },
    authorid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    weekStatus: [{
        statusText: String,
        status: Boolean,
        title: String
    }],
}, {
    timestamps: true
}))