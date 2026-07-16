import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['hotel', 'flight'], required: true },
  refId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'typeModel' },
  typeModel: { type: String, required: true, enum: ['Hotel', 'Flight'] },
  dates: {
    start: { type: Date },
    end: { type: Date }
  },
  guests: { type: Number },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalPrice: { type: Number, required: true },
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking
