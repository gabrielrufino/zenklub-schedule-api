import setup from './setup'

setup()
  .then(async () => await import('./app'))
