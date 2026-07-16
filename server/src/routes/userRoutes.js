import express from 'express'
import { toggleFavorite } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.put('/favorites/:id', protect, toggleFavorite)

export default router
