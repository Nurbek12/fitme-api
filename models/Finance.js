import { model, Schama } from 'mongoose'

export default model('Finance', new Schama({
    token: String,
    category: String
}))