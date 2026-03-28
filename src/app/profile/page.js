'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Profile() {
  const [username, setUsername] = useState('')
  const [bookmarks, setBookmarks] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (!user) {
      router.push('/login')
    } else {
      setUsername(user)
      // Load bookmarks and subscriptions from localStorage
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
      const savedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
      setBookmarks(savedBookmarks)
      setSubscriptions(savedSubscriptions)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('isLoggedIn')
    router.push('/')
  }

  const stats = [
    { label: 'Articles Read', value: '24', icon: '📖' },
    { label: 'Bookmarks', value: bookmarks.length, icon: '🔖' },
    { label: 'Following', value: subscriptions.length, icon: '👥' },
    { label: 'Reading Streak', value: '7 days', icon: '🔥' }
  ]

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* ANIMATED BACKGROUND */}
      <div style={{ position: 'fixed', top: '0', left: '0', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(100, 200, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

      {/* NAVBAR */}
      <nav style={{
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
        padding: '1.5rem 2rem',
        background: 'rgba(15, 15, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>T&G</Link>
          <Link href="/" style={{ color: '#b0b0b0', fontWeight: '500', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>← Back to Home</Link>
        </div>
      </nav>

      {/* PROFILE HEADER */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1), rgba(255, 100, 200, 0.1))',
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
        position: 'relative',
        zIndex: 10,
        animation: 'slideUp 0.8s ease-out'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #64c8ff, #ff64c8)',
            borderRadius: '50%',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 10px 40px rgba(100, 200, 255, 0.3)'
          }}>
            👤
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', fontFamily: '"Playfair Display", serif' }}>
            {username}
          </h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.05rem' }}>Member since 2024</p>
        </div>
      </section>

      {/* STATS CARDS */}
      <section style={{ padding: '3rem 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1), rgba(255, 100, 200, 0.05))',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                animation: `slideUp 0.8s ease-out ${i * 0.1}s both`,
                transition: 'all 0.3s'
              }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 50px rgba(100, 200, 255, 0.3)'; e.currentTarget.style.transform = 'translateY(-8px)' }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                <p style={{ fontSize: '0.85rem', color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{stat.label}</p>
                <p style={{ fontSize: '2rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <section style={{ padding: '3rem 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.2)', paddingBottom: '1rem' }}>
            {['Overview', 'Saved Articles', 'Bookmarks', 'Subscriptions', 'Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === tab.toLowerCase().replace(' ', '') ? 'linear-gradient(135deg, #64c8ff, #ff64c8)' : 'transparent',
                  color: activeTab === tab.toLowerCase().replace(' ', '') ? '#fff' : '#b0b0b0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.toLowerCase().replace(' ', '')) {
                    e.target.style.color = '#64c8ff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.toLowerCase().replace(' ', '')) {
                    e.target.style.color = '#b0b0b0'
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div style={{ animation: 'slideUp 0.6s ease-out' }}>
            {activeTab === 'overview' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.05))',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                padding: '2rem',
                borderRadius: '12px'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Profile Overview</h2>
                <p style={{ color: '#a0a0a0', lineHeight: '1.8' }}>
                  Welcome to your profile! Here you can manage your account, view your reading history, and customize your preferences. Your profile is the hub for all your activities on Theology & Geopolitics.
                </p>
              </div>
            )}

            {activeTab === 'savedarticles' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.05))',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                padding: '2rem',
                borderRadius: '12px'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>📚 Saved Articles</h2>
                <p style={{ color: '#a0a0a0' }}>Your saved articles will appear here. Save articles while browsing to read them later.</p>
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.05))',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                padding: '2rem',
                borderRadius: '12px'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>🔖 Bookmarks ({bookmarks.length})</h2>
                <p style={{ color: '#a0a0a0' }}>Bookmarked articles and passages will appear here for quick access.</p>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.05))',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                padding: '2rem',
                borderRadius: '12px'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>👥 Subscriptions ({subscriptions.length})</h2>
                <p style={{ color: '#a0a0a0' }}>Authors and topics you follow will appear here. Get notified when they publish new articles.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.05))',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                padding: '2rem',
                borderRadius: '12px'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>⚙️ Settings</h2>
                
                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.2)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} defaultChecked />
                    <span>Receive email notifications</span>
                  </label>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.2)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} defaultChecked />
                    <span>Dark mode (on by default)</span>
                  </label>
                </div>

                <button onClick={handleLogout} style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #ff6464, #ff64c8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Logout
                </button>
              </div>
            )}
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
