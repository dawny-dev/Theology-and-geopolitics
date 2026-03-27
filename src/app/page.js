'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')

      if (error) console.log(error)
      else setArticles(data)
    }

    fetchArticles()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">

      {/* Title */}
      <h1
        className="text-5xl font-bold text-center mb-10"
        style={{ color: '#1a2332', fontFamily: 'serif' }}
      >
        THEOLOGY & GEOPOLITICS
      </h1>

      {/* Articles */}
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">
          No articles yet...
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">

          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`}>

              <div className="bg-white p-6 rounded-xl shadow-md border">

                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#1a2332', fontFamily: 'serif' }}
                >
                  {article.title}
                </h2>

                <p className="text-gray-600">
                  {article.excerpt}
                </p>

              </div>

            </Link>
          ))}

        </div>
      )}
    </div>
  )
}

