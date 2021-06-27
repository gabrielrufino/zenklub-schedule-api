import { Request, Response, NextFunction } from 'express'

import NotFoundError from '@exceptions/NotFoundError'
import notFound from '@middlewares/not-found'

describe('Testing the not found middleware', () => {
  test('Should call the next function with the a correct error', () => {
    const request = {} as Request
    const response = {} as Response
    const next = jest.fn() as NextFunction

    notFound(request, response, next)

    expect(next).toBeCalledWith(new NotFoundError('Route'))
  })
})
