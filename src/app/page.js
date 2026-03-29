'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [username, setUsername] = useState(null)
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(true)

  const languages = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'hi', flag: '🇮🇳' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'de', flag: '🇩🇪' },
    { code: 'zh', flag: '🇨🇳' },
    { code: 'ja', flag: '🇯🇵' },
  ]

  const translations = {
    en: {
      home: 'Home', about: 'About', contact: 'Contact', pricing: 'Pricing', profile: 'Profile', logout: 'Logout',
      login: 'Login', signup: 'Sign Up', search: 'Search articles...', latestArticles: 'Latest Articles',
      featured: 'Featured', readFull: 'Read Full Article', copyright: '© 2026 Theology & Geopolitics',
      tagline: 'Exploring the intersection of faith, power, and global influence',
      trending: 'Trending Now', categories: 'Explore Categories', newsletter: 'Subscribe to Newsletter',
      stats_articles: 'Articles Published', stats_readers: 'Monthly Readers', stats_years: 'Years Active'
    },
    hi: {
      home: 'होम', about: 'परिचय', contact: 'संपर्क', pricing: 'मूल्य', profile: 'प्रोफाइल', logout: 'लॉगआउट',
      login: 'लॉगिन', signup: 'साइन अप', search: 'लेख खोजें...', latestArticles: 'नवीनतम लेख',
      featured: 'विशेषांक', readFull: 'पूरा लेख पढ़ें', copyright: '© 2026 धर्मशास्त्र और भू-राजनीति',
      tagline: 'विश्वास, शक्ति और वैश्विक प्रभाव के प्रतिच्छेदन की खोज',
      trending: 'ट्रेंडिंग', categories: 'श्रेणियाँ देखें', newsletter: 'न्यूज़लेटर में शामिल हों',
      stats_articles: 'प्रकाशित लेख', stats_readers: 'मासिक पाठक', stats_years: 'सक्रिय वर्ष'
    },
    es: {
      home: 'Inicio', about: 'Acerca de', contact: 'Contacto', pricing: 'Precios', profile: 'Perfil', logout: 'Cerrar',
      login: 'Entrar', signup: 'Registrarse', search: 'Buscar...', latestArticles: 'Últimos Artículos',
      featured: 'Destacado', readFull: 'Leer Completo', copyright: '© 2026 Teología y Geopolítica',
      tagline: 'Explorando la intersección entre fe, poder e influencia global',
      trending: 'Tendencias', categories: 'Explorar', newsletter: 'Suscribirse',
      stats_articles: 'Artículos', stats_readers: 'Lectores', stats_years: 'Años Activo'
    },
    fr: {
      home: 'Accueil', about: 'À Propos', contact: 'Contact', pricing: 'Tarifs', profile: 'Profil', logout: 'Déconnexion',
      login: 'Connexion', signup: 'Inscription', search: 'Rechercher...', latestArticles: 'Derniers Articles',
      featured: 'Vedette', readFull: 'Lire Complet', copyright: '© 2026 Théologie et Géopolitique',
      tagline: 'Explorer l\'intersection entre la foi, le pouvoir et l\'influence mondiale',
      trending: 'Tendances', categories: 'Explorer', newsletter: 'S\'abonner',
      stats_articles: 'Articles', stats_readers: 'Lecteurs', stats_years: 'Années Actif'
    },
    de: {
      home: 'Startseite', about: 'Über Uns', contact: 'Kontakt', pricing: 'Preise', profile: 'Profil', logout: 'Abmelden',
      login: 'Anmelden', signup: 'Registrieren', search: 'Suchen...', latestArticles: 'Neueste Artikel',
      featured: 'Vorgestellt', readFull: 'Vollständig Lesen', copyright: '© 2026 Theologie und Geopolitik',
      tagline: 'Erforschung der Schnittstelle zwischen Glaube, Macht und globalem Einfluss',
      trending: 'Trends', categories: 'Erkunden', newsletter: 'Abonnieren',
      stats_articles: 'Artikel', stats_readers: 'Leser', stats_years: 'Jahre Aktiv'
    },
    zh: {
      home: '首页', about: '关于', contact: '联系', pricing: '价格', profile: '个人资料', logout: '登出',
      login: '登录', signup: '注册', search: '搜索...', latestArticles: '最新文章',
      featured: '精选', readFull: '完整阅读', copyright: '© 2026 神学与地缘政治',
      tagline: '探索信仰、权力和全球影响力的交点',
      trending: '趋势', categories: '探索', newsletter: '订阅',
      stats_articles: '文章', stats_readers: '读者', stats_years: '年活跃'
    },
    ja: {
      home: 'ホーム', about: '概要', contact: 'お問い合わせ', pricing: '料金', profile: 'プロフィール', logout: 'ログアウト',
      login: 'ログイン', signup: '登録', search: '検索...', latestArticles: '最新記事',
      featured: '特集', readFull: '完全に読む', copyright: '© 2026 神学と地政学',
      tagline: '信仰、権力、世界的影響力の交点を探索',
      trending: 'トレンド', categories: '探索', newsletter: '購読',
      stats_articles: '記事', stats_readers: 'リーダー', stats_years: '年アクティブ'
    }
  }

  const t = translations[language] || translations.en
  const categories = ['All', 'Religion', 'Geopolitics', 'Politics', 'History', 'Analysis']

  useEffect(() => {
    const user = localStorage.getItem('username')
    const lang = localStorage.getItem('language') || 'en'
    setUsername(user)
    setLanguage(lang)
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = articles
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(a => a.category === selectedCategory)
    }
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredArticles(filtered)
  }, [articles, selectedCategory, searchQuery])

  const handleLogout = () => {
    localStorage.removeItem('username')
    setUsername(null)
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const featuredArticle = articles.length > 0 ? articles[0] : null
  const trendingArticles = articles.slice(0, 3)

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', minHeight: '100vh' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .section { animation: slideIn 0.6s ease-out; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.15)', padding: '1.5rem 2rem', background: 'rgba(15, 15, 30, 0.92)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none', cursor: 'pointer' }}>T&G</Link>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#b0b0b0', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t.home}</Link>
            <Link href="/about" style={{ color: '#b0b0b0', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t.about}</Link>
            <Link href="/contact" style={{ color: '#b0b0b0', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t.contact}</Link>
            <Link href="/pricing" style={{ color: '#b0b0b0', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t.pricing}</Link>
            
            {username ? (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderLeft: '1px solid rgba(100, 200, 255, 0.15)', paddingLeft: '2rem' }}>
                <Link href="/profile" style={{ color: '#64c8ff', textDecoration: 'none', fontWeight: '500' }}>{t.profile}</Link>
                <button onClick={handleLogout} style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>{t.logout}</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.8rem', borderLeft: '1px solid rgba(100, 200, 255, 0.15)', paddingLeft: '2rem' }}>
                <Link href="/login" style={{ padding: '0.55rem 1.1rem', borderRadius: '6px', border: '1px solid rgba(100, 200, 255, 0.25)', color: '#b0b0b0', textDecoration: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>{t.login}</Link>
                <Link href="/signup" style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', padding: '0.55rem 1.1rem', borderRadius: '6px', textDecoration: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>{t.signup}</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid rgba(100, 200, 255, 0.15)' }} className="section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(90deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem', lineHeight: '1.2' }}>
            THEOLOGY & GEOPOLITICS
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#a0a0a0', marginBottom: '2rem' }}>{t.tagline}</p>
          <Link href="#articles" style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: '700', display: 'inline-block', textDecoration: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(100, 200, 255, 0.25)' }}>
            Explore Articles ✨
          </Link>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{ padding: '4rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)', background: 'rgba(100, 200, 255, 0.03)' }} className="section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ padding: '2rem', background: 'rgba(100, 200, 255, 0.08)', borderRadius: '10px', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
              <p style={{ fontSize: '3rem', fontWeight: '900', color: '#64c8ff', marginBottom: '0.5rem' }}>250+</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.95rem', fontWeight: '500' }}>{t.stats_articles}</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(100, 200, 255, 0.08)', borderRadius: '10px', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
              <p style={{ fontSize: '3rem', fontWeight: '900', color: '#ff64c8', marginBottom: '0.5rem' }}>50K+</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.95rem', fontWeight: '500' }}>{t.stats_readers}</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(100, 200, 255, 0.08)', borderRadius: '10px', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
              <p style={{ fontSize: '3rem', fontWeight: '900', color: '#64c8ff', marginBottom: '0.5rem' }}>5+</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.95rem', fontWeight: '500' }}>{t.stats_years}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featuredArticle && (
        <section style={{ padding: '5rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)' }} className="section">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ color: '#64c8ff', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '700', marginBottom: '1rem' }}>⭐ {t.featured}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.8rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '1.5rem', color: '#fff', lineHeight: '1.2' }}>{featuredArticle.title}</h2>
                <p style={{ fontSize: '1rem', color: '#a8a8a8', lineHeight: '1.8', marginBottom: '2rem' }}>{featuredArticle.excerpt}</p>
                <Link href={`/articles/${featuredArticle.slug}`} style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', padding: '0.95rem 2.2rem', borderRadius: '7px', fontWeight: '700', display: 'inline-block', textDecoration: 'none', boxShadow: '0 6px 20px rgba(100, 200, 255, 0.25)' }}>
                  {t.readFull} →
                </Link>
              </div>
              {featuredArticle.cover_image_url && (
                <div style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(100, 200, 255, 0.2)', border: '1px solid rgba(100, 200, 255, 0.15)' }}>
                  <Image src={featuredArticle.cover_image_url} alt={featuredArticle.title} fill style={{ objectFit: 'cover' }} priority />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TRENDING ARTICLES */}
      {trendingArticles.length > 0 && (
        <section style={{ padding: '5rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)', background: 'rgba(100, 200, 255, 0.03)' }} className="section">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '3rem', color: '#fff' }}>🔥 {t.trending}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {trendingArticles.map((article, i) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', padding: '1.5rem', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255, 100, 100, 0.9)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: '700', fontSize: '0.8rem' }}>#{i + 1}</div>
                    {article.cover_image_url && (
                      <div style={{ position: 'relative', height: '200px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem', marginTop: '2rem' }}>
                        <Image src={article.cover_image_url} alt={article.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                    <span style={{ color: '#64c8ff', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>{article.category}</span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', margin: '0.75rem 0', fontFamily: '"Playfair Display", serif' }}>{article.title}</h3>
                    <p style={{ color: '#9a9a9a', fontSize: '0.9rem', lineHeight: '1.5' }}>{article.excerpt?.substring(0, 100)}...</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT SECTION */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)' }} className="section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '2rem', color: '#fff' }}>📖 About This Platform</h2>
          <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', padding: '3rem', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.05rem', color: '#c0c0c0', lineHeight: '1.9', marginBottom: '1.5rem' }}>
              Theology & Geopolitics is a leading publication dedicated to exploring the profound connections between religious belief, political power, and global influence. Our expert contributors provide in-depth analysis on how faith shapes international relations, policy decisions, and geopolitical outcomes.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#c0c0c0', lineHeight: '1.9' }}>
              With a commitment to intellectual rigor and balanced perspectives, we cover topics ranging from religious movements to their political implications, offering readers a nuanced understanding of our complex world.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)', background: 'rgba(100, 200, 255, 0.03)' }} className="section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '3rem', color: '#fff' }}>📚 {t.categories}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Religion', emoji: '🕯️', count: articles.filter(a => a.category === 'Religion').length },
              { name: 'Geopolitics', emoji: '🌍', count: articles.filter(a => a.category === 'Geopolitics').length },
              { name: 'Politics', emoji: '🏛️', count: articles.filter(a => a.category === 'Politics').length },
              { name: 'History', emoji: '📚', count: articles.filter(a => a.category === 'History').length },
              { name: 'Analysis', emoji: '📊', count: articles.filter(a => a.category === 'Analysis').length },
            ].map((cat) => (
              <div key={cat.name} style={{ background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1), rgba(255, 100, 200, 0.05))', border: '1px solid rgba(100, 200, 255, 0.2)', padding: '2rem', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.emoji}</p>
                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{cat.name}</p>
                <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>{cat.count} articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section id="articles" style={{ padding: '5rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)' }} className="section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '2rem', color: '#fff' }}>📰 {t.latestArticles}</h2>
          
          <input type="text" placeholder={t.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '1rem 1.5rem', background: 'rgba(100, 200, 255, 0.05)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '8px', color: '#e0e0e0', fontSize: '1rem', marginBottom: '2rem', boxSizing: 'border-box' }} />

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '0.75rem 1.6rem', border: selectedCategory === cat ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.25)', background: selectedCategory === cat ? 'rgba(100, 200, 255, 0.15)' : 'transparent', color: selectedCategory === cat ? '#64c8ff' : '#b0b0b0', borderRadius: '7px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.3s' }}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#707070', fontSize: '1.1rem' }}>Loading articles...</p>
          ) : filteredArticles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#707070', fontSize: '1.1rem' }}>No articles found yet. Check back soon for updates!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.04))', border: '1px solid rgba(100, 200, 255, 0.15)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
                    {article.cover_image_url && (
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: 'rgba(100, 200, 255, 0.08)' }}>
                        <Image src={article.cover_image_url} alt={article.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#64c8ff', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1.5px', marginBottom: '0.75rem', fontWeight: '700' }}>{article.category}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem', lineHeight: '1.3', fontFamily: '"Playfair Display", serif' }}>{article.title}</h3>
                      <p style={{ color: '#9a9a9a', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem', flex: 1 }}>{article.excerpt}</p>
                      <p style={{ color: '#707070', fontSize: '0.8rem' }}>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Recently published'}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1), rgba(255, 100, 200, 0.05))', borderBottom: '1px solid rgba(100, 200, 255, 0.15)' }} className="section">
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', color: '#fff' }}>📧 {t.newsletter}</h2>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem', fontSize: '1.05rem' }}>Stay informed with the latest articles, insights, and analysis delivered to your inbox.</p>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto' }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: '1rem', background: 'rgba(100, 200, 255, 0.05)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '6px', color: '#e0e0e0', fontSize: '0.95rem', boxSizing: 'border-box' }} />
            <button style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)', background: 'rgba(100, 200, 255, 0.02)' }} className="section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', marginBottom: '3rem', color: '#fff', textAlign: 'center' }}>💬 What Readers Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Dr. Sarah Johnson', role: 'Political Analyst', text: 'The depth of analysis provided is exceptional. Theology & Geopolitics offers perspectives you won\'t find elsewhere.' },
              { name: 'Prof. Michael Chen', role: 'International Relations Scholar', text: 'Essential reading for anyone seeking to understand the intersection of religion and global affairs.' },
              { name: 'Rev. James Williams', role: 'Religious Studies Director', text: 'A refreshing approach to complex topics. Highly recommended for students and professionals alike.' },
            ].map((testimonial, i) => (
              <div key={i} style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', padding: '2rem', borderRadius: '10px' }}>
                <p style={{ color: '#c0c0c0', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                <p style={{ color: '#64c8ff', fontWeight: '700' }}>{testimonial.name}</p>
                <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGE SELECTOR */}
      <section style={{ padding: '3rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.15)', textAlign: 'center' }} className="section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ color: '#707070', marginBottom: '1.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>🌍 Language / भाषा / Idioma</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {languages.map(lang => (
              <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} style={{ padding: '0.6rem 1rem', background: language === lang.code ? 'linear-gradient(135deg, #64c8ff, #ff64c8)' : 'transparent', border: language === lang.code ? 'none' : '1px solid rgba(100, 200, 255, 0.25)', color: language === lang.code ? '#fff' : '#b0b0b0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
                <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span> {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.95), rgba(26, 26, 46, 0.95))', borderTop: '1px solid rgba(100, 200, 255, 0.15)', padding: '4rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            <div>
              <h4 style={{ color: '#fff', fontWeight: '700', marginBottom: '1.2rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>{t.home}</Link></li>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/about" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#articles" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>All Articles</a></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Archives</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontWeight: '700', marginBottom: '1.2rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Subscription</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/pricing" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>{t.pricing}</Link></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Premium Plans</a></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Gift Subscription</a></li>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/faq" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontWeight: '700', marginBottom: '1.2rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/contact" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>{t.contact}</Link></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Team</a></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Careers</a></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Newsletter Archive</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontWeight: '700', marginBottom: '1.2rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/privacy" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link></li>
                <li style={{ marginBottom: '0.8rem' }}><Link href="/terms" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Cookie Policy</a></li>
                <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(100, 200, 255, 0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <p style={{ color: '#707070', fontSize: '0.85rem', margin: 0 }}>{t.copyright}</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" style={{ color: '#707070', fontSize: '1.3rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#707070'}>𝕏</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: '#707070', fontSize: '1.3rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#707070'}>f</a>
              <a href="mailto:hello@theology-geopolitics.com" title="Email" style={{ color: '#707070', fontSize: '1.3rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#707070'}>📧</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" style={{ color: '#707070', fontSize: '1.3rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#707070'}>▶</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}





