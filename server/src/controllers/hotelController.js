import Hotel from '../models/Hotel.js'

export const getHotels = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
      
    const filters = {}
    if (req.query.minPrice) filters.pricePerNight = { ...filters.pricePerNight, $gte: Number(req.query.minPrice) }
    if (req.query.maxPrice) filters.pricePerNight = { ...filters.pricePerNight, $lte: Number(req.query.maxPrice) }
    if (req.query.rating) filters.rating = { $gte: Number(req.query.rating) }
    if (req.query.destinationId) filters.destinationId = req.query.destinationId

    const hotels = await Hotel.find({ ...keyword, ...filters }).populate('destinationId', 'name')
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('destinationId', 'name location')

    if (hotel) {
      res.json(hotel)
    } else {
      res.status(404).json({ message: 'Hotel not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
