'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function CMS() {
  const [articles, setArticles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Religion',
    cover_image_url: '',
    published: false
  })

  // Fetch articles
  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    setArticles(data || [])
  }

  // Handle all input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Auto-generate slug when title changes
    if (name === 'title') {
      const newSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
      
      setFormData(prev => ({
        ...prev,
        slug: newSlug
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.title.trim()) {
        alert('Title is required')
        setLoading(false)
        return
      }

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('articles')
          .update({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            cover_image_url: formData.cover_image_url,
            published: formData.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId)

        if (error) throw error
      } else {
        // Create
        const { error } = await supabase.from('articles').insert({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          cover_image_url: formData.cover_image_url,
          published: formData.published,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        })

        if (error) throw error
      }

      // Reset form
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Religion',
        cover_image_url: '',
        published: false
      })
      setEditingId(null)
      setShowForm(false)

      // Fetch updated articles
      fetchArticles()
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (article) => {
    setFormData({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || 'Religion',
      cover_image_url: article.cover_image_url || '',
      published: article.published || false
    })
    setEditingId(article.id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      fetchArticles()
    }
  }

  const handleTogglePublish = async (id, currentStatus) => {
    const { error } = await supabase
      .from('articles')
      .update({ published: !currentStatus })
      .eq('id', id)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      fetchArticles()
    }
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh', padding: '2rem' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        
        input, textarea, select {
          transition: all 0.3s ease;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        input:focus, textarea:focus, select:focus {
          border-color: #64c8ff !important;
          box-shadow: 0 0 20px rgba(100, 200, 255, 0.3) !important;
          outline: none !important;
        }

        button {
          transition: all 0.3s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* HEADER */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, marginBottom: '0.5rem' }}>
              CMS Admin Panel
            </h1>
            <p style={{ color: '#8a8a8a', margin: 0, fontSize: '0.95rem', fontWeight: '400' }}>Manage articles, create content, and control publishing</p>
          </div>
          <Link href="/" style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', padding: '0.85rem 1.8rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 6px 20px rgba(100, 200, 255, 0.25)', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
            ← Back to Site
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* CREATE/EDIT FORM */}
        {showForm && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.08), rgba(255, 100, 200, 0.06))',
            border: '1px solid rgba(100, 200, 255, 0.2)',
            padding: '2.5rem',
            borderRadius: '14px',
            marginBottom: '3rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', color: '#fff', margin: '0 0 2rem 0' }}>
              {editingId ? '✏️ Edit Article' : '✨ Create New Article'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* TITLE */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#64c8ff', fontWeight: '700', fontSize: '0.95rem' }}>Article Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter article title"
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      background: 'rgba(100, 200, 255, 0.05)',
                      border: '1px solid rgba(100, 200, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      fontWeight: '500',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* SLUG */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#64c8ff', fontWeight: '700', fontSize: '0.95rem' }}>URL Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    placeholder="auto-generated-slug"
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      background: 'rgba(100, 200, 255, 0.05)',
                      border: '1px solid rgba(100, 200, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <p style={{ color: '#707070', fontSize: '0.8rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>Auto-generated from title (you can edit)</p>
                </div>

                {/* CATEGORY */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#64c8ff', fontWeight: '700', fontSize: '0.95rem' }}>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      background: 'rgba(100, 200, 255, 0.05)',
                      border: '1px solid rgba(100, 200, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Religion">🕯️ Religion</option>
                    <option value="Geopolitics">🌍 Geopolitics</option>
                    <option value="Politics">🏛️ Politics</option>
                    <option value="History">📚 History</option>
                    <option value="Analysis">📊 Analysis</option>
                  </select>
                </div>

                {/* COVER IMAGE */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#64c8ff', fontWeight: '700', fontSize: '0.95rem' }}>Cover Image URL</label>
                  <input
                    type="url"
                    name="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      background: 'rgba(100, 200, 255, 0.05)',
                      border: '1px solid rgba(100, 200, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* EXCERPT */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: '#64c8ff', fontWeight: '700', fontSize: '0.95rem' }}>Article Excerpt (Short Summary) *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description shown on homepage..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.2rem',
                    background: 'rgba(100, 200, 255, 0.05)',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#e0e0e0',
                    fontSize: '1rem',
                    minHeight: '90px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* CONTENT */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: '#64c8ff', fontWeight: '700', fontSize: '0.95rem' }}>Full Article Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  placeholder="Write your complete article here..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.2rem',
                    background: 'rgba(100, 200, 255, 0.05)',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#e0e0e0',
                    fontSize: '0.95rem',
                    minHeight: '350px',
                    fontFamily: 'monospace',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* PUBLISH CHECKBOX */}
              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(100, 200, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(100, 200, 255, 0.15)' }}>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  id="publishCheck"
                  style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#64c8ff' }}
                />
                <label htmlFor="publishCheck" style={{ color: '#e0e0e0', fontWeight: '600', cursor: 'pointer', margin: 0 }}>
                  Publish this article immediately (make it visible on homepage)
                </label>
              </div>

              {/* BUTTONS */}
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #64c8ff, #ff64c8)',
                    color: '#fff',
                    border: 'none',
                    padding: '1rem 2.2rem',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                    fontSize: '1rem',
                    boxShadow: '0 6px 20px rgba(100, 200, 255, 0.25)'
                  }}
                >
                  {loading ? 'Saving...' : editingId ? '💾 Update Article' : '✏️ Create Article'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: '',
                      category: 'Religion',
                      cover_image_url: '',
                      published: false
                    })
                  }}
                  style={{
                    background: 'transparent',
                    color: '#b0b0b0',
                    border: '1px solid rgba(100, 200, 255, 0.3)',
                    padding: '1rem 2.2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => { e.target.style.borderColor = '#64c8ff'; e.target.style.color = '#64c8ff'; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(100, 200, 255, 0.3)'; e.target.style.color = '#b0b0b0'; }}
                >
                  ✖ Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* NEW ARTICLE BUTTON */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true)
              setEditingId(null)
              setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                category: 'Religion',
                cover_image_url: '',
                published: false
              })
            }}
            style={{
              background: 'linear-gradient(135deg, #64c8ff, #ff64c8)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '2rem',
              fontSize: '1rem',
              boxShadow: '0 6px 20px rgba(100, 200, 255, 0.25)'
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 10px 30px rgba(100, 200, 255, 0.4)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0 6px 20px rgba(100, 200, 255, 0.25)'}
          >
            ✨ + Create New Article
          </button>
        )}

        {/* ARTICLES LIST */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.08), rgba(255, 100, 200, 0.06))',
          border: '1px solid rgba(100, 200, 255, 0.2)',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ padding: '2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)', background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1), rgba(255, 100, 200, 0.08))' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff', margin: 0 }}>
              📚 Articles Management ({articles.length} total)
            </h2>
          </div>

          <div>
            {articles.length === 0 ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <p style={{ color: '#707070', fontSize: '1.1rem', margin: 0 }}>📝 No articles yet. Click "+ Create New Article" to get started!</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)', background: 'rgba(100, 200, 255, 0.08)' }}>
                      <th style={{ padding: '1.2rem', textAlign: 'left', color: '#64c8ff', fontWeight: '700', fontSize: '0.9rem' }}>Title</th>
                      <th style={{ padding: '1.2rem', textAlign: 'left', color: '#64c8ff', fontWeight: '700', fontSize: '0.9rem' }}>Category</th>
                      <th style={{ padding: '1.2rem', textAlign: 'left', color: '#64c8ff', fontWeight: '700', fontSize: '0.9rem' }}>Status</th>
                      <th style={{ padding: '1.2rem', textAlign: 'left', color: '#64c8ff', fontWeight: '700', fontSize: '0.9rem' }}>Created</th>
                      <th style={{ padding: '1.2rem', textAlign: 'left', color: '#64c8ff', fontWeight: '700', fontSize: '0.9rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article, idx) => (
                      <tr key={article.id} style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.1)', background: idx % 2 === 0 ? 'rgba(100, 200, 255, 0.02)' : 'transparent' }}>
                        <td style={{ padding: '1.2rem', color: '#e0e0e0', fontWeight: '500', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.title}</td>
                        <td style={{ padding: '1.2rem', color: '#a0a0a0' }}>
                          <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(100, 200, 255, 0.15)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600', color: '#64c8ff' }}>
                            {article.category}
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem', color: article.published ? '#64ff64' : '#ff9999', fontWeight: '700', fontSize: '0.9rem' }}>
                          {article.published ? '🟢 Published' : '🟠 Draft'}
                        </td>
                        <td style={{ padding: '1.2rem', color: '#707070', fontSize: '0.85rem' }}>
                          {new Date(article.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1.2rem' }}>
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <button
                              onClick={() => handleTogglePublish(article.id, article.published)}
                              style={{
                                background: article.published ? '#ff9999' : '#64ff64',
                                color: '#000',
                                border: 'none',
                                padding: '0.5rem 0.9rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                              }}
                              title={article.published ? 'Unpublish' : 'Publish'}
                            >
                              {article.published ? '▼' : '▲'}
                            </button>
                            <button
                              onClick={() => handleEdit(article)}
                              style={{
                                background: '#64c8ff',
                                color: '#000',
                                border: 'none',
                                padding: '0.5rem 0.9rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              style={{
                                background: '#ff6464',
                                color: '#fff',
                                border: 'none',
                                padding: '0.5rem 0.9rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                              }}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
