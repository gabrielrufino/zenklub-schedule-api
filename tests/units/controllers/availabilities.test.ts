import { Request, Response, NextFunction } from 'express'
import { ObjectID } from 'mongodb'

import Availability from '@models/Availability'
import NotFoundError from '@exceptions/NotFoundError'
import controllers from '@controllers/availabilities'

jest.mock('@models/Availability', () => ({
  aggregate: jest.fn().mockResolvedValue([]),
  find: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue({ sessions: [] }),
  countDocuments: jest.fn().mockResolvedValue(0),
  deleteOne: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({
    _id: '123456789'
  })
}))

describe('Testing the availabilities controllers', () => {
  describe('controllers.get', () => {
    test('Should call the Availability.aggregate method', async () => {
      const request = {} as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.get(request, response, next)

      expect(Availability.aggregate).toBeCalled()
    })

    test('Should return the response with the correct status', async () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      await controllers.get(request, response, next)

      expect(response.status).toBeCalledWith(200)
      expect(response.json).toBeCalledWith([])
    })
  })

  describe('controllers.getById', () => {
    test('Should call the Availability.aggregate method', async () => {
      jest.mock('@models/Availability', () => ({
        aggregate: jest.fn().mockResolvedValue([
          {
            professional: 'Scrooge Mcduck',
            startDate: '2021-06-26',
            startTime: '12:00',
            endDate: '2021-06-26',
            endTime: '15:20'
          }
        ]),
        find: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({
          _id: '123456789'
        })
      }))
      const request = {
        params: {
          id: '60d7b5c4e08e01c79e2f7560'
        }
      } as unknown as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.getById(request, response, next)

      expect(Availability.aggregate).toBeCalledWith(
        expect.arrayContaining([{
          $match: { _id: new ObjectID('60d7b5c4e08e01c79e2f7560') }
        }])
      )
    })

    test('Should call the next function with the correct error when not find the availability', async () => {
      jest.mock('@models/Availability', () => ({
        aggregate: jest.fn().mockResolvedValue([]),
        find: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({
          _id: '123456789'
        })
      }))
      const request = {
        params: {
          id: '60d7b5c4e08e01c79e2f7560'
        }
      } as unknown as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.getById(request, response, next)

      expect(next).toBeCalledWith(new NotFoundError('Availability'))
    })
  })

  describe('controllers.post', () => {
    const VALID_AVAILABILITY = {
      professional: 'Scrooge Mcduck',
      startDate: '2021-06-26',
      startTime: '12:00',
      endDate: '2021-06-26',
      endTime: '15:20'
    }

    test('Should call the Availability.create method with correct arguments', async () => {
      const request = {
        body: {
          ...VALID_AVAILABILITY
        }
      } as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.post(request, response, next)

      const {
        professional,
        startDate,
        startTime,
        endDate,
        endTime
      } = VALID_AVAILABILITY

      expect(Availability.create).toBeCalledWith({
        professional,
        startsAt: new Date(`${startDate} ${startTime}`),
        endsAt: new Date(`${endDate} ${endTime}`),
        slots: [
          {
            startDate: '2021-06-26',
            startTime: '12:00'
          },
          {
            startDate: '2021-06-26',
            startTime: '12:30'
          },
          {
            startDate: '2021-06-26',
            startTime: '13:00'
          },
          {
            startDate: '2021-06-26',
            startTime: '13:30'
          },
          {
            startDate: '2021-06-26',
            startTime: '14:00'
          },
          {
            startDate: '2021-06-26',
            startTime: '14:30'
          }
        ]
      })
    })

    test('Should returns the response with the correct body', async () => {
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

      await controllers.post(request, response, next)

      const {
        professional,
        startDate,
        startTime,
        endDate,
        endTime
      } = VALID_AVAILABILITY

      expect(response.status).toBeCalledWith(201)
      expect(response.json).toBeCalledWith({
        id: '123456789',
        professional,
        startDate,
        startTime,
        endDate,
        endTime,
        slots: [
          {
            startDate: '2021-06-26',
            startTime: '12:00'
          },
          {
            startDate: '2021-06-26',
            startTime: '12:30'
          },
          {
            startDate: '2021-06-26',
            startTime: '13:00'
          },
          {
            startDate: '2021-06-26',
            startTime: '13:30'
          },
          {
            startDate: '2021-06-26',
            startTime: '14:00'
          },
          {
            startDate: '2021-06-26',
            startTime: '14:30'
          }
        ]
      })
    })
  })

  describe('controllers.deleteById', () => {
    test('Should call the Availability.findById method', async () => {
      const request = {
        params: {
          id: '60d7b5c4e08e01c79e2f7560'
        }
      } as unknown as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.deleteById(request, response, next)

      expect(Availability.findById).toBeCalledWith(request.params.id)
    })

    test('Should call the Availability.deleteOne method', async () => {
      const request = {
        params: {
          id: '60d7b5c4e08e01c79e2f7560'
        }
      } as unknown as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.deleteById(request, response, next)

      expect(Availability.deleteOne).toBeCalledWith({ _id: new ObjectID(request.params.id) })
    })
  })
})
