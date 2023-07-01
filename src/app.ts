import dotenv from 'dotenv'
import express from 'express'
import nunjucks from 'nunjucks'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

dotenv.config()

const port = process.env.PORT ?? 3000
const app = express()

// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.set('view engine', 'html')

routes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
