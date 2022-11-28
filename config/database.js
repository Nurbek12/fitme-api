import { connect } from "mongoose"
import { mongourl } from './keys.js'

export function connecting() {
    connect(mongourl, {
        useNewUrlParser: true,  
        useUnifiedTopology: true
    })
    .then(() => console.log('database connected...'))
    .catch(err => console.log('Database error: ', err))
}