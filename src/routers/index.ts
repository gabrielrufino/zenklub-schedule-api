import { Router } from 'express'

import root from './root'
import availabilities from './availabilities'

const router = Router()

router.use('/', root)
router.use('/availabilities', availabilities)

export default router
