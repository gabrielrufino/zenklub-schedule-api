import { Request, Response, NextFunction } from 'express'
import NotFoundError from '@exceptions/NotFoundError'
import ConflictError from '@exceptions/ConflictError'

const error = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof NotFoundError) {
    return response.status(404).json({
      error: error.message
    })
  }

  if (error instanceof ConflictError) {
    return response.status(409).json({
      error: error.message
    })
  }

  return response.status(500).json({
    error: 'Internal server error'
  })
}

export default error
