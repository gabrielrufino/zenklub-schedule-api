class NotFoundError extends Error {
  constructor(resource: string) {
    super(resource)

    this.message = `${resource} not found`
    this.name = 'NotFoundError'
  }
}

export default NotFoundError
