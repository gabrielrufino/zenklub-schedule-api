import { Request, Response, NextFunction } from 'express'

import Availability from '@models/Availability'

const controllers = {
  async get(_request: Request, response: Response, next: NextFunction) {
    try {
      const slots = await Availability.aggregate([
        {
          $unwind: {
            path: '$slots'
          }
        },
        {
          $project: {
            _id: 0,
            professional: 1,
            startDate: '$slots.startDate',
            startTime: '$slots.startTime'
          }
        }
      ])

      return response.status(200).json(slots)
    } catch (error) {
      next(error)
    }
  }
}

export default controllers
