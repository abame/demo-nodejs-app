import dotenv from 'dotenv'

import express from 'express'
import nunjucks from 'nunjucks'
import routes from './routes'

dotenv.config()

const port = process.env.PORT ?? 3000
const app = express()

nunjucks.configure('src/views', {
  autoescape: true,
  express: app
})

app.set('view engine', 'html')

routes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
