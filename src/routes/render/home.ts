import type { Request, Response } from 'express'
import express from 'express'
import data from '../../database/hello-world.json'

const router = express.Router()

router.get('/', async (_request: Request, response: Response) => {
  response.render('hello-world.html', { data })
})
export default router
