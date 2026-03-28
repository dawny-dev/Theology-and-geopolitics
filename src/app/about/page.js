// ═══════════════════════════════════════════════════════════════
// FILE 1: src/app/about/page.js
// ═══════════════════════════════════════════════════════════════

import Link from 'next/link'

export default function About() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#1a1a1a' }}>
      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #e8e8e8', padding: '1.5rem 3rem', background: '#fff' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1a1a1a' }}>T&G</Link>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <Link href="/" style={{ color: '#666', fontWeight: '500' }}>Home</Link>
            <Link href="/about" style={{ color: '#1a1a1a', fontWeight: '600' }}>About</Link>
            <Link href="/contact" style={{ color: '#666', fontWeight: '500' }}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#fff',
        padding: '6rem 3rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            About Theology & Geopolitics
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#ccc', lineHeight: '1.6' }}>
            Exploring the profound intersections between faith, power, and global influence
          </p>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section style={{ padding: '5rem 3rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* SECTION 1 */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#1a1a1a' }}>
              Our Mission
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '1rem' }}>
              Theology & Geopolitics is dedicated to exploring the profound intersections between religious thought, faith traditions, and global political dynamics. In an increasingly complex world, understanding how theology influences geopolitical decisions is essential.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
              We bring together in-depth analysis, historical perspectives, and contemporary insights into how religious beliefs shape international relations, conflict, and cooperation on the world stage.
            </p>
          </div>

          {/* SECTION 2 */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#1a1a1a' }}>
              What We Cover
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {['Religion & International Relations', 'Faith & Global Power Dynamics', 'Historical Theological Perspectives', 'Contemporary Geopolitical Analysis', 'Case Studies in Global Conflicts', 'Interfaith Perspectives'].map((item, i) => (
                <div key={i} style={{
                  background: '#f8f8f8',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e8e8e8'
                }}>
                  <h3 style={{ color: '#1a1a1a', fontWeight: '700', marginBottom: '0.5rem' }}>
                    ◆ {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f8f8 0%, #fff 100%)',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid #e8e8e8'
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#1a1a1a' }}>
              Why This Matters
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
              Religious narratives are often intertwined with political objectives. Leaders frequently use religious identity to rally populations and justify policies. By analyzing these intersections, we gain deeper insight into world events, international relations, and the decision-making processes that shape our future. Understanding theology through a geopolitical lens is no longer optional—it's essential.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a1a', color: '#fff', padding: '3rem', textAlign: 'center', borderTop: '1px solid #333' }}>
        <p>&copy; 2026 Theology & Geopolitics. All rights reserved.</p>
      </footer>
    </div>
  )
}

