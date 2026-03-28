
// ============================================
// FILE 2: src/app/newsletter/page.js
// ============================================

export default function Newsletter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] text-white py-12 px-4">
      <div style={newsStyles.container}>
        <h1 style={newsStyles.title}>📬 Newsletter</h1>
        
        <div style={newsStyles.card}>
          <h2 style={newsStyles.subtitle}>Stay Updated</h2>
          <p style={newsStyles.text}>
            Subscribe to our newsletter to receive the latest articles about theology and geopolitics directly in your inbox.
          </p>
          
          <div style={newsStyles.features}>
            <div style={newsStyles.feature}>✓ Weekly article digest</div>
            <div style={newsStyles.feature}>✓ In-depth analysis</div>
            <div style={newsStyles.feature}>✓ Exclusive commentary</div>
            <div style={newsStyles.feature}>✓ No spam, unsubscribe anytime</div>
          </div>

          <p style={{ color: '#888', marginTop: '2rem', fontSize: '0.9rem' }}>
            Subscribe from your <a href="/profile" style={{ color: '#d4af37', textDecoration: 'underline' }}>profile page</a> to manage your newsletter preferences.
          </p>
        </div>
      </div>
    </div>
  )
}

const newsStyles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '900',
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #d4af37, #ffed4e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  card: {
    background: 'rgba(212, 175, 55, 0.05)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '12px',
    padding: '2rem'
  },
  subtitle: {
    color: '#d4af37',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem'
  },
  text: {
    color: '#ddd',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontSize: '1.05rem'
  },
  features: {
    background: 'rgba(212, 175, 55, 0.1)',
    padding: '1.5rem',
    borderRadius: '8px'
  },
  feature: {
    color: '#d4af37',
    marginBottom: '0.75rem',
    fontSize: '1rem'
  }
}

