import url from "url"
import cors from 'cors'
import { join } from "path"
import express from "express"
import { createServer } from "http"
import { port } from './config/keys.js'
import PassportApp from './config/passport.js'
import { connecting } from "./config/database.js"

import routes from './routes/routes.js'
import authroutes from './routes/auth.js'
import userroutes from "./routes/user.js"
import productroutes from "./routes/product.js"
import dishroutes from "./routes/dish.js"
import planroutes from "./routes/plan.js"
import mealroutes from "./routes/mealschema.js"
import exerciseroutes from "./routes/exercise.js"
import trainingroutes from "./routes/training.js"
import submitroutes from "./routes/submits.js"
import categotyroutes from "./routes/category.js"
import foodcroutes from "./routes/foodConsumed.js"

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
const server = createServer(app)

PassportApp(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(dirname, 'files')))

app.use(routes)
app.use('/auth', authroutes)
app.use('/user', userroutes)
app.use('/product', productroutes)
app.use('/dish', dishroutes)
app.use('/plan', planroutes)
app.use('/meal', mealroutes)
app.use('/exercise', exerciseroutes)
app.use('/training', trainingroutes)
app.use('/submit', submitroutes)
app.use('/category', categotyroutes)
app.use('/foodate', foodcroutes)

server.listen(port, () => {
    console.log('Server started...')
    connecting()
})

export default app