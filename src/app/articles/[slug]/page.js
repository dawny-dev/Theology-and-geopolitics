import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function ArticlePage({ params }) {
  const { slug } = await params

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article) {
    return <p className="p-6">Article not found</p>
  }

  const publishDate = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'No date'

  const wordCount = article.content.split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="bg-white min-h-screen">
      <style>{`
        .navbar {
          background: linear-gradient(135deg, #1a2332 0%, #2a3344 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .back-link {
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          color: #1a2332;
        }

        .article-header {
          background: linear-gradient(135deg, #1a2332 0%, #2a3344 100%);
          color: white;
          padding: 3rem 0;
        }

        .article-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .article-meta {
          display: flex;
          gap: 1.5rem;
          color: #ddd;
          font-size: 0.95rem;
          flex-wrap: wrap;
        }

        .article-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-tag {
          display: inline-block;
          background: #d4af37;
          color: #1a2332;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .article-image {
          width: 100%;
          height: 500px;
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
          position: relative;
          overflow: hidden;
          margin: 2rem 0;
          border-radius: 8px;
        }

        .article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .article-content {
          font-size: 1.1rem;
          line-height: 1.9;
          color: #333;
          max-width: 900px;
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }

        .article-divider {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 3rem 0;
        }

        .share-section {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
          margin-top: 3rem;
        }

        .share-title {
          font-weight: 700;
          color: #1a2332;
          margin-bottom: 1rem;
        }

        .share-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .share-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #d4af37;
          background: white;
          color: #d4af37;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .share-btn:hover {
          background: #d4af37;
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-yellow-400 transition">
              T&G
            </h1>
          </Link>
          <div className="flex gap-8">
            <Link href="/about" className="text-white hover:text-yellow-400 transition">About</Link>
            <Link href="/contact" className="text-white hover:text-yellow-400 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-2">
        <Link href="/" className="back-link">← Back to Articles</Link>
      </div>

      {/* Article Header */}
      <div className="article-header">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {article.category && (
            <div className="category-tag">{article.category}</div>
          )}
          
          <h1 className="article-title">{article.title}</h1>

          <div className="article-meta">
            <div className="article-meta-item">
              <span>📅</span>
              <span>{publishDate}</span>
            </div>
            <div className="article-meta-item">
              <span>⏱️</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Featured Image */}
        {article.cover_image_url && (
          <div className="article-image">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Body Text */}
        <div className="article-content whitespace-pre-line">
          {article.content}
        </div>

        <hr className="article-divider" />

        {/* Share Section */}
        <div className="share-section">
          <p className="share-title">Share This Article</p>
          <div className="share-buttons">
            <a 
              href={`https://twitter.com/intent/tweet?text=${article.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              🐦 Twitter
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=theology-and-geopolitics.vercel.app/articles/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              📘 Facebook
            </a>
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="share-btn"
            >
              🔗 Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Theology & Geopolitics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
