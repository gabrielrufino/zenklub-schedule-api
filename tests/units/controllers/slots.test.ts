import { Request, Response, NextFunction } from 'express'

import Availability from '@models/Availability'
import controllers from '@controllers/slots'

jest.mock('@models/Availability', () => ({
  aggregate: jest.fn().mockResolvedValue([])
}))

describe('Testing the slots controllers', () => {
  describe('controllers.get', () => {
    test('Should call the Availability.aggregate method', async () => {
      const request = {} as Request
      const response = {} as Response
      const next = jest.fn() as NextFunction

      await controllers.get(request, response, next)

      expect(Availability.aggregate).toBeCalled()
    })

    test('Should return the response with the correct arguments', async () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      await controllers.get(request, response, next)

      expect(response.status).toBeCalledWith(200)
      expect(response.json).toBeCalled()
    })
  })
})
