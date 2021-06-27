import { Request, Response, NextFunction } from 'express'

import Availability from '@models/Availability'

const controllers = {
  async get (_request: Request, response: Response, next: NextFunction) {
    try {
      const availabilities = await Availability.aggregate([
        {
          $project: {
            _id: 0,
            id: '$_id',
            professional: 1,
            startDate: {
              $dateToString: {
                date: '$startsAt',
                format: '%Y-%m-%d'
              }
            },
            startTime: {
              $dateToString: {
                date: '$startsAt',
                format: '%H:%M'
              }
            },
            endDate: {
              $dateToString: {
                date: '$endsAt',
                format: '%Y-%m-%d'
              }
            },
            endTime: {
              $dateToString: {
                date: '$endsAt',
                format: '%H:%M'
              }
            }
          }
        }
      ])

      return response.status(200).json(availabilities)
    } catch (error) {
      return next(error)
    }
  },
  async post (request: Request, response: Response, next: NextFunction) {
    try {
      const {
        professional,
        startDate,
        startTime,
        endDate,
        endTime
      } = request.body

      const { _id: id } = await Availability.create({
        professional,
        startsAt: new Date(`${startDate} ${startTime}`),
        endsAt: new Date(`${endDate} ${endTime}`)
      })

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
