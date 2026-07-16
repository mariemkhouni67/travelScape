import Destination from '../models/Destination.js'
import Hotel from '../models/Hotel.js'
import Flight from '../models/Flight.js'
import Booking from '../models/Booking.js'
import User from '../models/User.js'

// Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalDestinations = await Destination.countDocuments()
    const totalHotels = await Hotel.countDocuments()
    const totalFlights = await Flight.countDocuments()
    const totalBookings = await Booking.countDocuments()
    const totalUsers = await User.countDocuments()

    res.json({
      destinations: totalDestinations,
      hotels: totalHotels,
      flights: totalFlights,
      bookings: totalBookings,
      users: totalUsers
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Destination CRUD
export const createDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body)
    const created = await destination.save()
    res.status(201).json(created)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (destination) {
      res.json(destination)
    } else {
      res.status(404).json({ message: 'Destination not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id)
    if (destination) {
      res.json({ message: 'Destination removed' })
    } else {
      res.status(404).json({ message: 'Destination not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Upload Image (Generic for admin)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' })
    }
    res.json({ url: req.file.path })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
