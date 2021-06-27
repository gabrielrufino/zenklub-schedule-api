import faker from 'faker'
import { Request, Response, NextFunction } from 'express'

import NotFoundError from '@exceptions/NotFoundError'
import error from '@middlewares/error'

describe('Testing the error middleware', () => {
  describe('NotFoundError', () => {
    test('Should responses with status code 404 when receiving NotFoundError', () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      const notFoundError = new NotFoundError(faker.datatype.string())

      error(notFoundError, request, response, next)

      expect(response.status).toBeCalledWith(404)
    })

    test('Should responses with the correct body when receiving NotFoundError', () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      const notFoundError = new NotFoundError(faker.datatype.string())

      error(notFoundError, request, response, next)

      expect(response.json).toBeCalledWith({ error: notFoundError.message })
    })
  })
})
