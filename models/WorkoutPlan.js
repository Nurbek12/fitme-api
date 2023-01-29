import { model, Schema } from 'mongoose'

export default model('WorkoutPlan', new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE', 'ALL'],
    },
    level: {
        type: String,
        required: true,
        enum: ['NEWBIE', 'EXPERIENCED', 'ADVANCED0']
    },
    image: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    visibledb: {
        type: Boolean,
        default: false
    },

    workout: [
        [
            {
                exercise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Exercise'
                },
                approach: Number,
                repetitions: String
            }
        ]
    ],
    weeks: Number,
}, {
    timestamps: true
}))

// isfinished :  