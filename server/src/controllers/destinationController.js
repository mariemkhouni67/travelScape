import Destination from '../models/Destination.js'

export const getDestinations = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    const destinations = await Destination.find({ ...keyword })
    res.json(destinations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)

    if (destination) {
      res.json(destination)
    } else {
      res.status(404).json({ message: 'Destination not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
