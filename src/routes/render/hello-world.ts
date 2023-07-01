import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', async (_request: Request, response: Response) => {
  const result = await fetch(`${process.env.API_BASE_HOST}/api/v1/hello-world`)
  const data = await result.json()

  response.render('hello-world.html', {
    message: data.message
  })
})
export default router
