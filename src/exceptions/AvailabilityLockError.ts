class AvailabilityLockError extends Error {
  constructor() {
    super('Availability has scheduled sessions')

    this.name = 'AvailabilityLockError'
  }
}

export default AvailabilityLockError
