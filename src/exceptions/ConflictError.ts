class ConflictError extends Error {
  constructor(resource: string) {
    super();

    this.name = 'ConflictError'
    this.message = `${resource} in conflict with another`
  } 
}

export default ConflictError
