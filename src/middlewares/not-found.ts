import { Request, Response, NextFunction } from 'express'

import NotFoundError from '@exceptions/NotFoundError'

const notFound = (_request: Request, _response: Response, next: NextFunction) => {
  return next(new NotFoundError('Route'))
}

export default notFound
