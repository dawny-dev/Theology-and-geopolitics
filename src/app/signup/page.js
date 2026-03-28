// ═══════════════════════════════════════════════════════════════
// FILE 1: src/app/signup/page.js - COMPLETE REWRITE
// ═══════════════════════════════════════════════════════════════

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd)
    const hasLowerCase = /[a-z]/.test(pwd)
    const hasNumber = /[0-9]/.test(pwd)
    const hasSpecialChar = /[#*@!$%^&]/.test(pwd)
    const isLongEnough = pwd.length >= 8

    const missing = []
    if (pwd.length < 8) missing.push('8+ chars')
    if (!hasUpperCase) missing.push('uppercase')
    if (!hasLowerCase) missing.push('lowercase')
    if (!hasNumber) missing.push('number')
    if (!hasSpecialChar) missing.push('special char')

    if (missing.length === 0) {
      setPasswordStrength('✓ Strong password')
      return true
    } else {
      setPasswordStrength(`Missing: ${missing.join(', ')}`)
      return false
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!username || !password || !confirmPassword) {
      setError('All fields required')
      setLoading(false)
      return
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setError('Password does not meet requirements')
      setLoading(false)
      return
    }

    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('username', username.toLowerCase())
        .single()

      if (existingUser) {
        setError('Username already taken')
        setLoading(false)
        return
      }

      // Hash password (simple hash - in production use bcrypt on backend)
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

      // Create user profile
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          username: username.toLowerCase(),
          password_hash: hashedPassword
        })

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }

      // Store in localStorage
      localStorage.setItem('username', username.toLowerCase())
      localStorage.setItem('isLoggedIn', 'true')

      router.push('/')
    } catch (err) {
      setError('Signup failed. Please try again.')
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
          Create Account
        </h1>
        <p style={{ color: '#999', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Join our community of thinkers
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

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1a1a1a', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1a1a1a', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                validatePassword(e.target.value)
              }}
              placeholder="Min 8 chars, uppercase, lowercase, number, special"
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
            {passwordStrength && (
              <p style={{
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                color: passwordStrength.includes('✓') ? '#4a4' : '#c33'
              }}>
                {passwordStrength}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#1a1a1a', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#999', fontSize: '0.95rem' }}>
          Already have an account? <Link href="/login" style={{ color: '#1a1a1a', fontWeight: '600', cursor: 'pointer' }}>Login</Link>
        </p>
      </div>
    </div>
  )
}
