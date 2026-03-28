

// ═══════════════════════════════════════════════════════════════
// FILE 2: src/app/login/page.js - COMPLETE REWRITE
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!username || !password) {
      setError('Username and password required')
      setLoading(false)
      return
    }

    try {
      // Fetch user from database
      const { data: user, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', username.toLowerCase())
        .single()

      if (fetchError || !user) {
        setError('Invalid username or password')
        setLoading(false)
        return
      }

      // Hash the provided password and compare
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

      if (user.password_hash !== hashedPassword) {
        setError('Invalid username or password')
        setLoading(false)
        return
      }

      // Login successful
      localStorage.setItem('username', user.username)
      localStorage.setItem('isLoggedIn', 'true')

      router.push('/')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '3rem',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem', color: '#1a1a1a' }}>
          Welcome Back
        </h1>
        <p style={{ color: '#999', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Sign in to your account
        </p>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1a1a1a', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
              onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#1a1a1a', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
              onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#1a1a1a',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.opacity = '0.85')}
            onMouseLeave={(e) => !loading && (e.target.style.opacity = '1')}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#999', fontSize: '0.95rem' }}>
          Don't have an account? <Link href="/signup" style={{ color: '#1a1a1a', fontWeight: '600', cursor: 'pointer' }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
