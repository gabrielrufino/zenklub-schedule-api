import faker from 'faker'

import NotFoundError from '@exceptions/NotFoundError'

describe('Tests the exception NotFoundError', () => {
  it ('Should have the correct name', () => {
    const resource = faker.datatype.string()
    const error = new NotFoundError(resource)

    expect(error.name).toBe('NotFoundError')
  })

  it('Should have the correct message', () => {
    const resource = faker.datatype.string()
    const error = new NotFoundError(resource)

    expect(error.message).toBe(`${resource} not found`)
  })
})
