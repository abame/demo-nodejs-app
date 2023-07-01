import type { Request, Response, NextFunction } from 'express'
export default (request: Request, response: Response, next: NextFunction) => {
  if (request.headers.authorization === `Basic ${process.env.AUTH_TOKEN}`) {
    return next()
  }

  return response
    .status(403)
    .send({ status: 'fail', message: 'Authorization failed' })
}
