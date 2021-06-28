import AvailabilityLockError from '@exceptions/AvailabilityLockError'

describe('Tests the exception AvailabilityLockError', () => {
  it('Should have the correct name', () => {
    const error = new AvailabilityLockError()

    expect(error.name).toBe('AvailabilityLockError')
  })

  it('Should have the correct message', () => {
    const error = new AvailabilityLockError()

    expect(error.message).toBe('Availability has scheduled sessions')
  })
})
