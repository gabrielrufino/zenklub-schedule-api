import { Router } from 'express'

import controllers from '@controllers/slots'
import validators from '@middlewares/validators/slots'

const router = Router()

router.get('/', validators.get, controllers.get)

export default router
