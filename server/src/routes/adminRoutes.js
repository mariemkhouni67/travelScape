import express from 'express'
import { protect } from '../middleware/auth.js'
import { admin } from '../middleware/adminOnly.js'
import { upload } from '../config/cloudinary.js'
import {
  getDashboardStats,
  createDestination,
  updateDestination,
  deleteDestination,
  uploadImage
} from '../controllers/adminController.js'

const router = express.Router()

router.use(protect, admin)

router.get('/stats', getDashboardStats)

// Destinations CRUD
router.post('/destinations', createDestination)
router.put('/destinations/:id', updateDestination)
router.delete('/destinations/:id', deleteDestination)

// Images
router.post('/upload', upload.single('image'), uploadImage)

export default router
