import setup from './setup'

setup()
  .then(async () => await import('./app'))
  .catch(error => console.error(error))
