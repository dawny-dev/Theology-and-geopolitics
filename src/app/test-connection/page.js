'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .limit(10)

      if (error) {
        setError(error.message)
      } else {
        setArticles(data)
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Database Connection Test</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {!loading && !error && (
        <>
          <p style={{ color: 'green' }}>✓ Connection successful!</p>
          <p>Articles in database: {articles.length}</p>
        </>
      )}
    </div>
  )
}
