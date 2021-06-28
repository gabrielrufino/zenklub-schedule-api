import faker from 'faker'

import ConflictError from '@exceptions/ConflictError'

describe('Tests the exception ConflictError', () => {
  it('Should have the correct name', () => {
    const resource = faker.datatype.string()
    const error = new ConflictError(resource)

    expect(error.name).toBe('ConflictError')
  })

  it('Should have the correct message', () => {
    const resource = faker.datatype.string()
    const error = new ConflictError(resource)

    expect(error.message).toBe(`${resource} in conflict with another`)
  })
})
