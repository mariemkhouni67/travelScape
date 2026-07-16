import express from 'express'
import { createBooking, getUserBookings, getBookingById } from '../controllers/bookingController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createBooking)
router.get('/me', protect, getUserBookings)
router.get('/:id', protect, getBookingById)

export default router
