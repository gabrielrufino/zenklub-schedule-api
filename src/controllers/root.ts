import { Request, Response } from 'express'

const controllers = {
  async get (_request: Request, response: Response) {
    return response.status(200).json({
      healthcheck: true
    })
  }
}

export default controllers
