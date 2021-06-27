class ConflictError extends Error {
  constructor (resource: string) {
    super(`${resource} in conflict with another`)

    this.name = 'ConflictError'
  }
}

export default ConflictError
