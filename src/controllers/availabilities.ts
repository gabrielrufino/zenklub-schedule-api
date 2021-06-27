import { ObjectID } from 'mongodb'
import { Request, Response, NextFunction } from 'express'
import dayjs from 'dayjs'

import Availability from '@models/Availability'
import NotFoundError from '@exceptions/NotFoundError'
import ConflictError from '@exceptions/ConflictError'
import AvailabilityLockError from '@exceptions/AvailabilityLockError'

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
  async getById (request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params

      const [availability] = await Availability.aggregate([
        {
          $match: {
            _id: new ObjectID(id)
          }
        },
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

      if (!availability) {
        throw new NotFoundError('Availability')
      }

      return response.status(200).json(availability)
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

      const startsAt = dayjs(`${startDate} ${startTime}`)
      const endsAt = dayjs(`${endDate} ${endTime}`)

      const conflict = await Availability.countDocuments({
        professional,
        $or: [
          { startsAt: { $lt: endsAt } },
          { endsAt: { $gt: startsAt } }
        ]
      })
      if (conflict) {
        throw new ConflictError('Availability')
      }

      const slots = []
      let iterator = dayjs(startsAt)
      while (iterator.isBefore(endsAt.subtract(30, 'minute'))) {
        slots.push({
          startDate: iterator.format('YYYY-MM-DD'),
          startTime: iterator.format('HH:mm')
        })

        iterator = iterator.add(30, 'minute')
      }

      const { _id: id } = await Availability.create({
        professional,
        startsAt: startsAt.toDate(),
        endsAt: endsAt.toDate(),
        slots
      })

      return response.status(201).json({
        id,
        professional,
        startDate,
        startTime,
        endDate,
        endTime,
        slots
      })
    } catch (error) {
      return next(error)
    }
  },
  async deleteById (request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params

      const availability = await Availability.findById(id)
      if (!availability) {
        throw new NotFoundError('Availability')
      }

      if (availability.sessions.length) {
        throw new AvailabilityLockError()
      }

      await Availability.deleteOne({ _id: new ObjectID(id) })

      return response.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default controllers
