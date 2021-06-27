import { Router } from 'express'

import notFoundMiddleware from '@middlewares/not-found'
import errorMiddleware from '@middlewares/error'

import root from './root'
import availabilities from './availabilities'

const router = Router()

router.use('/', root)
router.use('/availabilities', availabilities)

router.use(notFoundMiddleware)
router.use(errorMiddleware)

export default router
