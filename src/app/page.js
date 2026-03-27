'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Categories
  const categories = ['All', 'Religion', 'Geopolitics', 'Politics', 'History', 'Analysis']

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (error) console.log(error)
      else setArticles(data || [])
    }

    fetchArticles()
  }, [])

  // Filter articles based on category and search
  useEffect(() => {
    let filtered = articles

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(a => a.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredArticles(filtered)
  }, [articles, selectedCategory, searchQuery])

  return (
    <div className="bg-white min-h-screen">
      <style>{`
        * {
          transition: all 0.3s ease;
        }

        .navbar {
          background: linear-gradient(135deg, #1a2332 0%, #2a3344 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .hero {
          background: linear-gradient(135deg, #1a2332 0%, #2a3344 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-title {
          text-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .section-title {
          color: #1a2332;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          position: relative;
          padding-bottom: 1rem;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: #d4af37;
          border-radius: 2px;
        }

        .category-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e0e0e0;
          background: white;
          color: #1a2332;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          border-color: #d4af37;
          color: #d4af37;
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: #d4af37;
          color: white;
          border-color: #d4af37;
          box-shadow: 0 8px 20px rgba(212,175,55,0.3);
        }

        .article-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .article-image {
          width: 100%;
          height: 240px;
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
          position: relative;
          overflow: hidden;
        }

        .article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .article-card:hover .article-image img {
          transform: scale(1.08);
        }

        .article-content {
          padding: 1.5rem;
        }

        .article-category {
          display: inline-block;
          background: #f5f5f5;
          color: #d4af37;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .article-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a2332;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .article-excerpt {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .article-meta {
          font-size: 0.85rem;
          color: #999;
        }

        .search-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem;

          background: linear-gradient(145deg, #1a2332, #202b3d);              /* NAVY BOX */
          color: #d4af37;                   /* GOLD TEXT */

          border: 2px solid #d4af37;
          border-radius: 999px;

          font-size: 1rem;
          font-family: 'Georgia', serif;
          box-shadow: inset 0 0 8px rgba(212,175,55,0.08);

          transition: all 0.25s ease;
        }

        /* Placeholder text */
        .search-input::placeholder {
          color: #d4af37;
          opacity: 0.7;
        }

        /* HOVER = POP EFFECT */
        .search-input:hover {
          transform: scale(1.03) translateY(-2px);
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.3),
            0 0 15px rgba(212,175,55,0.25);
        }

        /* CLICK / FOCUS */
        .search-input:focus {
          outline: none;
          transform: scale(1.04);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.2),
                      0 12px 30px rgba(0,0,0,0.3);
         }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: #999;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.8rem;
          }

          .article-card {
            margin-bottom: 1rem;
          }
        }
        /* Add your keyframes here */
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
       
      <section className="hero p-8">
        <h1 className="hero-title text-6xl md:text-7xl font-bold text-white">
          Articles
        </h1>
      </section>

      {/* NAVIGATION BAR */}
      <div className="flex justify-between items-center w-full">
        <div></div> {/* empty left side */}

        <div className="flex gap-10 text-sm font-semibold tracking-wide">
          <Link href="/about" className="text-gray-700 hover:text-black transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-black transition">
            Contact
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative py-32 px-6 bg-white overflow-hidden">

        {/* WORLD MAP BACKGROUND */}
        <div className="absolute inset-0 opacity-10">
          <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt="world map"
            className="w-full h-full object-cover animate-[floatSlow_12s_ease-in-out_infinite]"
          />
        </div>

        {/* CONTENT */}
        <div className="relative max-w-5xl mx-auto text-center">

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#1a2332] leading-tight">
            THEOLOGY & GEOPOLITICS
         </h1>

         <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
           Exploring the intersection of faith, power, and global influence
         </p>

       </div>
     </section>
      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        {/* SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* CATEGORIES */}
        <div className="mb-12">
          <div className="flex gap-3 overflow-x-auto pb-4">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        {filteredArticles.length === 0 ? (
          <div className="no-results">
            <p>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <div className="article-card">
                  
                  {/* IMAGE */}
                  <div className="article-image">
                    {article.cover_image_url ? (
                      <Image
                        src={article.cover_image_url?.trim()}
                        alt={article.title}
                        width={400}
                        height={240}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="article-content">
                    {article.category && (
                      <div className="article-category">{article.category}</div>
                    )}
                    
                    <h2 className="article-title">{article.title}</h2>
                    
                    <p className="article-excerpt">{article.excerpt}</p>
                    
                    <p className="article-meta">
                      {article.published_at 
                        ? new Date(article.published_at).toLocaleDateString() 
                        : 'No date'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Theology & Geopolitics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
