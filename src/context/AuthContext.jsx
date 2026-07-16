import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (userData) => {
    try {
      const data = await authService.login(userData)
      setUser(data)
      setToken(data.token)
    } catch (error) {
      throw error
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      const data = await authService.register(userData)
      setUser(data)
      setToken(data.token)
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setToken(null)
  }, [])

  const updateUser = useCallback((updatedData) => {
    const updated = { ...user, ...updatedData }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }, [user])

  const toggleFavorite = useCallback(async (destinationId) => {
    if (!user) return
    try {
      const { data: updatedFavorites } = await api.put(`/users/favorites/${destinationId}`)
      
      const updatedUser = { ...user, favorites: updatedFavorites }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (error) {
      console.error('Failed to toggle favorite', error)
    }
  }, [user])

  const isFavorite = useCallback((itemId) => {
    return user?.favorites?.includes(itemId) || false
  }, [user])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      updateUser,
      toggleFavorite,
      isFavorite,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
