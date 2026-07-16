import Review from '../models/Review.js'
import Hotel from '../models/Hotel.js'
import Destination from '../models/Destination.js'

export const createReview = async (req, res) => {
  try {
    const { targetId, targetType, rating, comment } = req.body

    const alreadyReviewed = await Review.findOne({
      targetId,
      userId: req.user._id,
    })

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this' })
    }

    const review = new Review({
      userId: req.user._id,
      targetId,
      targetType,
      rating: Number(rating),
      comment,
    })

    await review.save()

    // Update avg rating
    const reviews = await Review.find({ targetId })
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    if (targetType === 'hotel') {
      await Hotel.findByIdAndUpdate(targetId, { rating: avgRating })
    } else if (targetType === 'destination') {
      await Destination.findByIdAndUpdate(targetId, { avgRating })
    }

    res.status(201).json({ message: 'Review added' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getReviews = async (req, res) => {
  try {
    const { targetId } = req.params
    const reviews = await Review.find({ targetId }).populate('userId', 'name avatar')
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
