import { Request, Response, NextFunction } from 'express'
import faker from 'faker'
import dayjs from 'dayjs'

import Availability from '@models/Availability'
import controllers from '@controllers/sessions'

jest.mock('@models/Availability', () => ({
  findOne: jest.fn().mockResolvedValue({}),
  updateOne: jest.fn()
}))

describe('Testing the sessions controllers', () => {
  describe('controllers.post', () => {
    it('Should call the Availability.findOne method with the correct argument', async () => {
      const request = {
        body: {
          customer: faker.name.findName(),
          professional: faker.name.findName(),
          startDate: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          startTime: dayjs(faker.date.future()).format('HH:mm')
        }
      } as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.post(request, response, next)

      expect(Availability.findOne).toBeCalledWith({
        professional: request.body.professional,
        'slots.startDate': request.body.startDate,
        'slots.startTime': request.body.startTime
      })
    })

    it('Should call the Availability.updateOne method', async () => {
      const request = {
        body: {
          customer: faker.name.findName(),
          professional: faker.name.findName(),
          startDate: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          startTime: dayjs(faker.date.future()).format('HH:mm')
        }
      } as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.post(request, response, next)

      expect(Availability.updateOne).toBeCalled()
    })

    it('Should return the response with the correct arguments', async () => {
      const request = {
        body: {
          customer: faker.name.findName(),
          professional: faker.name.findName(),
          startDate: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          startTime: dayjs(faker.date.future()).format('HH:mm')
        }
      } as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      await controllers.post(request, response, next)

      expect(response.status).toBeCalledWith(201)
      expect(response.json).toBeCalledWith({
        customer: request.body.customer,
        professional: request.body.professional,
        startDate: request.body.startDate,
        startTime: request.body.startTime
      })
    })
  })
})
