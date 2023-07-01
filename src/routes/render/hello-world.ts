import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', async (_request: Request, response: Response) => {
  const token = Buffer.from(
        `${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`
  ).toString('base64')
  const result = await fetch(
        `${process.env.API_BASE_HOST}/api/v1/hello-world`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`
          }
        }
  )
  const data = await result.json()

  response.render('hello-world.html', { data })
})
export default router
