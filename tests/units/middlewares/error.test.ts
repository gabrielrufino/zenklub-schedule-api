import faker from 'faker'
import { Request, Response, NextFunction } from 'express'

import NotFoundError from '@exceptions/NotFoundError'
import ConflictError from '@exceptions/ConflictError'
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

  describe('ConflictError', () => {
    test('Should responses with status code 409 when receiving ConflictError', () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      const conflictError = new ConflictError(faker.datatype.string())

      error(conflictError, request, response, next)

      expect(response.status).toBeCalledWith(409)
    })

    test('Should responses with the correct body when receiving ConflictError', () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      const conflictError = new ConflictError(faker.datatype.string())

      error(conflictError, request, response, next)

      expect(response.json).toBeCalledWith({ error: conflictError.message })
    })
  })

  describe('Unforeseen error', () => {
    class UnforeseenError extends Error {
      constructor(message: string) {
        super(message)

        this.name = 'UnforeseenError'
      }
    }

    test('Should responses with status code 500 when receiving an unforessen error', () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      const notFoundError = new UnforeseenError(faker.datatype.string())

      error(notFoundError, request, response, next)

      expect(response.status).toBeCalledWith(500)
    })

    test('Should responses with the correct body when receiving an unforessen error', () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      const notFoundError = new UnforeseenError(faker.datatype.string())

      error(notFoundError, request, response, next)

      expect(response.json).toBeCalledWith({ error: 'Internal server error' })
    })
  })
})
