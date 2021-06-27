import { Request, Response, NextFunction } from 'express'

import Availability from '@models/Availability'

const controllers = {
  async post (request: Request, response: Response, next: NextFunction) {
    try {
      const {
        professional,
        startDate,
        startTime,
        endDate,
        endTime
      } = request.body

      const a = await Availability.create({
        professional,
        startsAt: new Date(`${startDate} ${startTime}`),
        endsAt: new Date(`${endDate} ${endTime}`)
      })

      const { _id: id } = a

      return response.status(201).json({
        id,
        professional,
        startDate,
        startTime,
        endDate,
        endTime
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default controllers
