import User from '../models/User.js'

export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const { id } = req.params

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isFav = user.favorites.includes(id)

    if (isFav) {
      user.favorites = user.favorites.filter((fav) => fav.toString() !== id)
    } else {
      user.favorites.push(id)
    }

    await user.save()
    res.json(user.favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
