import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departDate: { type: String, required: true },
  returnDate: { type: String },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true },
  duration: { type: String },
  stops: { type: Number, default: 0 },
  departTime: { type: String },
  arriveTime: { type: String },
}, { timestamps: true })

const Flight = mongoose.model('Flight', flightSchema)
export default Flight
