import { Router } from 'express'

import controllers from '@controllers/slots'

const router = Router()

router.get('/', controllers.get)

export default router
