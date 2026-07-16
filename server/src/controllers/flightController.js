import Flight from '../models/Flight.js'

export const getFlights = async (req, res) => {
  try {
    const filters = {}
    if (req.query.from) filters.from = { $regex: req.query.from, $options: 'i' }
    if (req.query.to) filters.to = { $regex: req.query.to, $options: 'i' }
    if (req.query.date) filters.departDate = req.query.date

    const flights = await Flight.find(filters)
    res.json(flights)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)

    if (flight) {
      res.json(flight)
    } else {
      res.status(404).json({ message: 'Flight not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
