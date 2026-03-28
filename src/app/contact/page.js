'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [hoveredField, setHoveredField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        input, textarea {
          transition: all 0.3s ease !important;
        }

        input:focus, textarea:focus {
          box-shadow: 0 0 30px rgba(100, 200, 255, 0.3) !important;
        }
      `}</style>

      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div style={{ position: 'fixed', top: '5%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(100, 200, 255, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }}></div>
      <div style={{ position: 'fixed', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 100, 200, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite 2s' }}></div>

      {/* NAVBAR */}
      <nav style={{
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
        padding: '1.5rem 2rem',
        background: 'rgba(15, 15, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>T&G</Link>
          <Link href="/" style={{ color: '#b0b0b0', fontWeight: '500', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>← Back to Home</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
        position: 'relative',
        zIndex: 10,
        animation: 'slideUp 0.8s ease-out'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>💌</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Get In Touch
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: '1.8' }}>
            We'd love to hear your thoughts, questions, or feedback. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section style={{ padding: '5rem 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          {submitted && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.2), rgba(100, 255, 100, 0.1))',
              border: '2px solid #64ff64',
              color: '#64ff64',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '700',
              animation: 'slideUp 0.5s ease-out',
              boxShadow: '0 0 30px rgba(100, 255, 100, 0.3)'
            }}>
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>
            
            {/* NAME FIELD */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.75rem', color: hoveredField === 'name' ? '#64c8ff' : '#e0e0e0', transition: 'color 0.3s', fontSize: '0.95rem' }}>
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setHoveredField('name')}
                onBlur={() => setHoveredField(null)}
                required
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'rgba(100, 200, 255, 0.05)',
                  border: hoveredField === 'name' ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* EMAIL FIELD */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.75rem', color: hoveredField === 'email' ? '#64c8ff' : '#e0e0e0', transition: 'color 0.3s', fontSize: '0.95rem' }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setHoveredField('email')}
                onBlur={() => setHoveredField(null)}
                required
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'rgba(100, 200, 255, 0.05)',
                  border: hoveredField === 'email' ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* SUBJECT FIELD */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.75rem', color: hoveredField === 'subject' ? '#64c8ff' : '#e0e0e0', transition: 'color 0.3s', fontSize: '0.95rem' }}>
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onFocus={() => setHoveredField('subject')}
                onBlur={() => setHoveredField(null)}
                required
                placeholder="What's this about?"
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'rgba(100, 200, 255, 0.05)',
                  border: hoveredField === 'subject' ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* MESSAGE FIELD */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.75rem', color: hoveredField === 'message' ? '#64c8ff' : '#e0e0e0', transition: 'color 0.3s', fontSize: '0.95rem' }}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setHoveredField('message')}
                onBlur={() => setHoveredField(null)}
                required
                placeholder="Your message here..."
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'rgba(100, 200, 255, 0.05)',
                  border: hoveredField === 'message' ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  minHeight: '180px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.2rem',
                background: 'linear-gradient(135deg, #64c8ff, #ff64c8)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1.05rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 10px 30px rgba(100, 200, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.02)'
                e.target.style.boxShadow = '0 20px 50px rgba(100, 200, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)'
                e.target.style.boxShadow = '0 10px 30px rgba(100, 200, 255, 0.3)'
              }}
            >
              Send Message ✨
            </button>
          </form>

          {/* CONTACT INFO */}
          <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid rgba(100, 200, 255, 0.2)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ animation: 'slideUp 0.8s ease-out 0.3s both' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Email</p>
              <p style={{ fontWeight: '600' }}>hello@tg.com</p>
            </div>
            <div style={{ animation: 'slideUp 0.8s ease-out 0.4s both' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍</div>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Website</p>
              <p style={{ fontWeight: '600' }}>theology-geopolitics.com</p>
            </div>
            <div style={{ animation: 'slideUp 0.8s ease-out 0.5s both' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Response Time</p>
              <p style={{ fontWeight: '600' }}>24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'rgba(15, 15, 30, 0.8)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', padding: '3rem 2rem', textAlign: 'center', color: '#808080', position: 'relative', zIndex: 10 }}>
        <p>&copy; 2024 Theology & Geopolitics. All rights reserved.</p>
      </footer>
    </div>
  )
}
