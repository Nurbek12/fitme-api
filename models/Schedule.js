import { model, Schema } from 'mongoose'

export default model('Schedule', new Schema({
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutPlan'
    },
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    result: [ 
        [  //group workout
            [   // week
                [   // workuout 
                    {   // cell
                        weight: Number,
                        repeat: Number
                    }
                ]
            ]
        ]
    ],
}, {
    timestamps: true
}))