import { useState, useEffect, useCallback } from 'react'
import API from '../services/api'
import { destinations, hotels, flights, reviews } from '../data/mockData'

// Map API endpoint paths to local mock data so the app works
// even when the backend server is not running.
const MOCK_FALLBACK = {
  '/destinations': destinations,
  '/hotels': hotels,
  '/flights': flights,
  '/reviews': reviews,
}

export default function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { immediate = true } = options

  const fetchData = useCallback(async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await API.get(endpoint, { params })
      setData(response.data)
      return response.data
    } catch (err) {
      // If the backend is unreachable, silently fall back to local mock data.
      const fallback = MOCK_FALLBACK[endpoint]
      if (fallback !== undefined) {
        setData(fallback)
        setError(null)
        return fallback
      }
      setError(err.response?.data?.message || err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [fetchData, immediate])

  return { data, loading, error, refetch: fetchData }
}
