import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true }
})

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  amenities: [{ type: String }],
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  location: { type: String, required: true },
  rooms: [roomSchema]
}, { timestamps: true })

const Hotel = mongoose.model('Hotel', hotelSchema)
export default Hotel
