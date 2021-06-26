import { Router } from 'express'

import controllers from '@controllers/root';

const router = Router()

router.get('/', controllers.get)

export default router
