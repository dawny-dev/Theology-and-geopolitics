'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ArticlePage({ params }) {
  const { slug } = use(params)
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single()

        if (fetchError) {
          setError('Article not found')
          setLoading(false)
          return
        }

        setArticle(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load article')
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#64c8ff' }}>
      Loading...
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#ff6464' }}>
      {error}
    </div>
  )

  if (!article) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#64c8ff' }}>
      Article not found
    </div>
  )

  const publishDate = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'No date'

  const wordCount = article.content.split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: '"Lora", "Georgia", serif', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:wght@400;600;700&display=swap');
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ANIMATED BACKGROUND */}
      <div style={{ position: 'fixed', top: '0', right: '0', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(100, 200, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

      {/* NAVBAR */}
      <nav style={{
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        background: 'rgba(15, 15, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 50,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>T&G</Link>
          <Link href="/" style={{ color: '#64c8ff', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>← Back to Home</Link>
        </div>
      </nav>

      {/* HERO IMAGE */}
      {article.cover_image_url && (
        <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(15, 15, 30, 0.8) 100%)' }}></div>
        </div>
      )}

      {/* ARTICLE HEADER */}
      <div style={{
        padding: '4rem 2rem 2rem',
        position: 'relative',
        zIndex: 10,
        animation: 'slideDown 0.8s ease-out'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {article.category && (
            <p style={{
              color: '#64c8ff',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              marginBottom: '1.5rem',
              fontWeight: '700'
            }}>
              {article.category}
            </p>
          )}

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            lineHeight: '1.15',
            marginBottom: '1.5rem',
            color: '#fff',
            fontFamily: '"Playfair Display", serif',
            background: 'linear-gradient(135deg, #64c8ff, #ff64c8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {article.title}
          </h1>

          <div style={{
            display: 'flex',
            gap: '2.5rem',
            color: '#a0a0a0',
            fontSize: '0.95rem',
            fontWeight: '500',
            marginBottom: '2rem'
          }}>
            <span>📅 {publishDate}</span>
            <span>⏱️ {readingTime} min read</span>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <article style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          fontSize: '1.2rem',
          color: '#d0d0d0',
          lineHeight: '2',
          whiteSpace: 'pre-wrap',
          fontFamily: '"Lora", "Georgia", serif',
          letterSpacing: '0.3px'
        }}>
          {article.content}
        </div>

        {/* SHARE SECTION */}
        <div style={{
          marginTop: '5rem',
          paddingTop: '3rem',
          borderTop: '1px solid rgba(100, 200, 255, 0.2)'
        }}>
          <p style={{ color: '#64c8ff', marginBottom: '1.5rem', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Share this article:</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" style={{
              padding: '0.8rem 1.8rem',
              background: 'rgba(100, 200, 255, 0.1)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '8px',
              color: '#64c8ff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => { e.target.style.background = 'linear-gradient(135deg, #64c8ff, #ff64c8)'; e.target.style.color = '#fff'; e.target.style.border = 'none' }} onMouseLeave={(e) => { e.target.style.background = 'rgba(100, 200, 255, 0.1)'; e.target.style.color = '#64c8ff'; e.target.style.border = '1px solid rgba(100, 200, 255, 0.3)' }}>
              𝕏 Twitter
            </a>
            <a href={`https://facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" style={{
              padding: '0.8rem 1.8rem',
              background: 'rgba(100, 200, 255, 0.1)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '8px',
              color: '#64c8ff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => { e.target.style.background = 'linear-gradient(135deg, #64c8ff, #ff64c8)'; e.target.style.color = '#fff'; e.target.style.border = 'none' }} onMouseLeave={(e) => { e.target.style.background = 'rgba(100, 200, 255, 0.1)'; e.target.style.color = '#64c8ff'; e.target.style.border = '1px solid rgba(100, 200, 255, 0.3)' }}>
              f Facebook
            </a>
            <button onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')} style={{
              padding: '0.8rem 1.8rem',
              background: 'rgba(100, 200, 255, 0.1)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '8px',
              color: '#64c8ff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => { e.target.style.background = 'linear-gradient(135deg, #64c8ff, #ff64c8)'; e.target.style.color = '#fff'; e.target.style.border = 'none' }} onMouseLeave={(e) => { e.target.style.background = 'rgba(100, 200, 255, 0.1)'; e.target.style.color = '#64c8ff'; e.target.style.border = '1px solid rgba(100, 200, 255, 0.3)' }}>
              🔗 Copy Link
            </button>
          </div>
        </div>
      </article>

      {/* FOOTER */}
      <footer style={{ background: 'rgba(15, 15, 30, 0.8)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', padding: '3rem 2rem', textAlign: 'center', color: '#808080', position: 'relative', zIndex: 10 }}>
        <p>&copy; 2024 Theology & Geopolitics. All rights reserved.</p>
      </footer>
    </div>
  )
}
