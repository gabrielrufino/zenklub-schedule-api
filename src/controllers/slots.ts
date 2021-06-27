import { Request, Response, NextFunction } from 'express'
import dayjs from 'dayjs'

import Availability from '@models/Availability'

const controllers = {
  async get (request: Request, response: Response, next: NextFunction) {
    try {
      const {
        minimumStartDate,
        minimumStartTime,
        maximumStartDate,
        maximumStartTime
      } = request.query

      const minimumStartsAt = dayjs(`${minimumStartDate} ${minimumStartTime}`).toDate()
      const maximumStartsAt = dayjs(`${maximumStartDate} ${maximumStartTime}`).toDate()

      const slots = await Availability.aggregate([
        {
          $unwind: {
            path: '$slots'
          }
        },
        {
          $addFields: {
            startsAt: {
              $dateFromString: {
                dateString: {
                  $concat: ['$slots.startDate', ' ', '$slots.startTime'],
                },
                timezone: 'America/Sao_Paulo'
              }
            }
          }
        },
        {
          $match: {
            startsAt: {
              $gte: minimumStartsAt,
              $lte: maximumStartsAt
            }
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
