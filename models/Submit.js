import { model, Schema } from 'mongoose'

export default model('Submits', new Schema({
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    }
}, {
    timestamps: true
}))