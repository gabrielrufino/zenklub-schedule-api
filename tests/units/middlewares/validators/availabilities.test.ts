import { Request, Response, NextFunction } from 'express'
import faker from 'faker'

import validators from '@middlewares/validators/availabilities'

describe('Testing the availabilities validators', () => {
  const VALID_AVAILABILITY = {
    professional: 'Scrooge Mcduck',
    startDate: '2021-06-26',
    startTime: '12:00',
    endDate: '2021-06-26',
    endTime: '15:20'
  }

  describe('validators.post', () => {
    test('Should returns an error when professional receive a non string value', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY,
          professional: faker.datatype.number()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.post) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when startDate receive a non date value', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY,
          startDate: faker.datatype.string()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.post) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when startTime receive a non time value', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY,
          startTime: faker.datatype.string()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.post) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when endDate receive a non date value', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY,
          endDate: faker.datatype.string()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.post) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should returns an error when endTime receive a non time value', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY,
          endTime: faker.datatype.string()
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.post) {
        await validator(request, response, next)
      }

      expect(response.status).toBeCalledWith(400)
      expect(response.json).toBeCalled()
    })

    test('Should pass when body is valid', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      for (const validator of validators.post) {
        await validator(request, response, next)
      }

      expect(next).toBeCalledTimes(validators.post.length)
    })
  })
})
