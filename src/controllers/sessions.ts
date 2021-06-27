import { Request, Response, NextFunction } from 'express'
import dayjs from 'dayjs'

import Availability from '@models/Availability'
import NotFoundError from '@exceptions/NotFoundError'

const controllers = {
  async post (request: Request, response: Response, next: NextFunction) {
    try {
      const {
        customer,
        professional,
        startDate,
        startTime
      } = request.body

      const filter = {
        professional,
        'slots.startDate': startDate,
        'slots.startTime': startTime
      }

      const slot = await Availability.findOne(filter)

      if (!slot) {
        throw new NotFoundError('Slot')
      }

      const session = {
        customer,
        startDate,
        startTime
      }

      const nextSlotAt = dayjs(`${startDate} ${startTime}`).add(30, 'minute')

      await Availability.updateOne(
        filter,
        {
          $push: { sessions: session },
          $pull: {
            slots: {
              $or: [
                {
                  startDate,
                  startTime
                },
                {
                  startDate: nextSlotAt.format('YYYY-MM-DD'),
                  startTime: nextSlotAt.format('HH:mm')
                }
              ]
            }
          }
        }
      )

      return response.status(201).json({
        customer,
        professional,
        startDate,
        startTime
      })
    } catch (error) {
      next(error)
    }
  }
}

export default controllers
