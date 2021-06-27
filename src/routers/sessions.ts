import { Router } from 'express'

import controllers from '@controllers/sessions'
import validators from '@middlewares/validators/sessions'

const router = Router()

router.post('/', validators.post, controllers.post)

export default router
