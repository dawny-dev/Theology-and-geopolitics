import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default async function ArticlePage({ params }) {
  const { slug } = await params

  // Fetch article with author data
  const { data: article, error } = await supabase
    .from('articles')
    .select(`
      *,
      authors(name, bio, avatar_url)
    `)
    .eq('slug', slug)
    .single()

  if (!article) {
    return <p className="p-6">Article not found</p>
  }

  // Format date
  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Calculate reading time
  const wordCount = article.content.split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="bg-white">
      {/* Cover Image */}
      {article.cover_image_url && (
        <div className="w-full h-96 relative">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        
        {/* Back Button */}
        <a href="/" className="text-blue-600 hover:underline mb-6">
          ← Back to Articles
        </a>

        {/* Category Tag */}
        {article.category && (
          <p className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm mb-4">
            {article.category}
          </p>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#1a2332' }}>
          {article.title}
        </h1>

        {/* Article Metadata */}
        <div className="flex items-center gap-4 mb-8 text-gray-600 border-b pb-6">
          
          {/* Author Info */}
          {article.authors && (
            <div className="flex items-center gap-3">
              {article.authors.avatar_url && (
                <Image
                  src={article.authors.avatar_url}
                  alt={article.authors.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-black">{article.authors.name}</p>
              </div>
            </div>
          )}

          {/* Separator */}
          <span className="text-gray-300">|</span>

          {/* Date */}
          <p>{publishDate}</p>

          {/* Separator */}
          <span className="text-gray-300">|</span>

          {/* Reading Time */}
          <p>{readingTime} min read</p>
        </div>

        {/* Article Content */}
        <div className="text-lg leading-8 whitespace-pre-line text-gray-800 mb-12">
          {article.content}
        </div>

        {/* Share Buttons */}
        <div className="border-t pt-6 mt-12">
          <p className="text-sm text-gray-600 mb-4">Share this article:</p>
          <div className="flex gap-4">
            <a 
              href={`https://twitter.com/intent/tweet?text=${article.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              Twitter
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=theology-and-geopolitics.vercel.app/articles/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Facebook
            </a>
            <button 
              className="text-gray-600 hover:text-gray-800"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
