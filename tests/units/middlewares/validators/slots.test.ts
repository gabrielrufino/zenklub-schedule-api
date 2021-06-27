import { Request, Response, NextFunction } from 'express'
import faker from 'faker'

import validators from '@middlewares/validators/slots'

describe('Testing the slots validators', () => {
  const VALID_FILTER = {
    minimumStartDate: '2021-06-26',
    minimumStartTime: '12:00',
    maximumStartDate: '2021-06-26',
    maximumStartTime: '16:00'
  }

  describe('validators.get', () => {
    test('Should returns an error when minimumStartDate receives a non date value', async () => {
      const request = {
        body: {
          ...VALID_FILTER,
          minimumStartDate: faker.datatype.number()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.get) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when minimumStartTime receive a non time value', async () => {
      const request = {
        body: {
          ...VALID_FILTER,
          minimumStartTime: faker.datatype.number()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.get) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when maximumStartDate receive a non date value', async () => {
      const request = {
        body: {
          ...VALID_FILTER,
          maximumStartDate: faker.datatype.string()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.get) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when maximumStartTime receive a non time value', async () => {
      const request = {
        body: {
          ...VALID_FILTER,
          maximumStartTime: faker.datatype.string()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.get) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should pass when body is valid', async () => {
      const request = {
        query: {
          ...VALID_FILTER
        }
      } as unknown as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.get) {
        await validator(request, response, next)
      }

      expect(next).toBeCalledTimes(validators.get.length)
    })
  })
})
