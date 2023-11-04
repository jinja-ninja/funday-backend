import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { chatReq } from './chat.controller.js'

const router = express.Router()

// router.use(requireAuth)
router.post('/', log, chatReq)

export const chatRoutes = router
