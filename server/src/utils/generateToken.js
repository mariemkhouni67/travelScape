import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production', {
    expiresIn: '30d',
  })
}

export default generateToken
