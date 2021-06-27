import { Request, Response, NextFunction } from 'express'

import Availability from '@models/Availability'
import controllers from '@controllers/availabilities'

jest.mock('@models/Availability', () => ({
  create: jest.fn().mockReturnValue({
    _id: '123456789'
  })
}))

describe('Testing the availabilities controllers', () => {
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

      expect(Availability.create).toBeCalledWith({
        professional,
        startsAt: new Date(`${startDate} ${startTime}`),
        endsAt: new Date(`${endDate} ${endTime}`)
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
        endTime
      })
    })
  })
})
