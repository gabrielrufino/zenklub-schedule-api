import setup from './setup'

setup()
  .then(() => import('./app'))
