import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  location: { type: String, required: true },
  avgRating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true })

const Destination = mongoose.model('Destination', destinationSchema)
export default Destination
