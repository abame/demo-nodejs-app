import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', (_request: Request, response: Response) => {
  response.json({
    status: 'success',
    message: 'Hello World API!'
  })
})
export default router
