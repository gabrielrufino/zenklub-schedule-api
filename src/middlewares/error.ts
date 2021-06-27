import { Request, Response, NextFunction } from 'express'
import NotFoundError from '@exceptions/NotFoundError'

const error = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof NotFoundError) {
    return response.status(404).json({
      error: error.message
    })
  }

  return response.status(500).json({
    error: 'Internal server error'
  })
}

export default error
