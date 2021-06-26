import { Request, Response } from 'express';

import controllers from '@controllers/root'

describe('Testing the root controllers', () => {
  describe('controllers.get', () => {
    it('Should call the response with correct parameters', async () => {
      const request = {} as Request
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response

      await controllers.get(request, response)

      expect(response.status).toBeCalledWith(200)
      expect(response.json).toBeCalledWith({ healthcheck: true })
    })
  })
})
