import { Request, Response, NextFunction } from 'express'
import { query, validationResult } from 'express-validator'

const validators = {
  get: [
    query('minimumStartDate').isDate(),
    query('minimumStartTime').matches(/^(10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|[1-9]):[0-5][0-9]$/),
    query('maximumStartDate').isDate(),
    query('maximumStartTime').matches(/^(10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|[1-9]):[0-5][0-9]$/),
    (request: Request, response: Response, next: NextFunction) => {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
      }

      return next()
    }
  ]
}

export default validators
