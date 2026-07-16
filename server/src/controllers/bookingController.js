import Booking from '../models/Booking.js'

export const createBooking = async (req, res) => {
  try {
    const { type, refId, dates, guests, totalPrice } = req.body

    const booking = new Booking({
      userId: req.user._id,
      type,
      refId,
      typeModel: type === 'hotel' ? 'Hotel' : 'Flight',
      dates,
      guests,
      totalPrice,
    })

    const createdBooking = await booking.save()
    res.status(201).json(createdBooking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('refId')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('refId')

    if (booking && booking.userId.toString() === req.user._id.toString()) {
      res.json(booking)
    } else {
      res.status(404).json({ message: 'Booking not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
