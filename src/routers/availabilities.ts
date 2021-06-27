import { Router } from 'express'

import controllers from '@controllers/availabilities'
import validators from '@middlewares/validators/availabilities'

const router = Router()

router.get('/', controllers.get)
router.post('/', validators.post, controllers.post)

export default router
