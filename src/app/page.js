'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const translations = {
  en: { home: 'Home', about: 'About', contact: 'Contact', profile: 'Profile', logout: 'Logout', login: 'Login', signup: 'Sign Up', search: 'Search articles...', latestArticles: 'Latest Articles', featured: 'Featured Article', readFull: 'Read Full Article', copyright: '© 2024 Theology & Geopolitics' },
  hi: { home: 'होम', about: 'परिचय', contact: 'संपर्क करें', profile: 'प्रोफाइल', logout: 'लॉगआउट', login: 'लॉगिन', signup: 'साइन अप', search: 'लेख खोजें...', latestArticles: 'नवीनतम लेख', featured: 'विशेषांक', readFull: 'पूरा लेख पढ़ें', copyright: '© 2024 धर्मशास्त्र और भू-राजनीति' },
  ar: { home: 'الصفحة الرئيسية', about: 'حول', contact: 'اتصل', profile: 'الملف الشخصي', logout: 'تسجيل الخروج', login: 'دخول', signup: 'اشتراك', search: 'بحث عن المقالات...', latestArticles: 'آخر المقالات', featured: 'مقالة مميزة', readFull: 'اقرأ المقال كاملا', copyright: '© 2024 اللاهوت والجيوسياسة' },
  fr: { home: 'Accueil', about: 'À propos', contact: 'Contact', profile: 'Profil', logout: 'Déconnexion', login: 'Connexion', signup: 'S\'inscrire', search: 'Rechercher des articles...', latestArticles: 'Derniers Articles', featured: 'Article à la une', readFull: 'Lire l\'article complet', copyright: '© 2024 Théologie et Géopolitique' },
  zh: { home: '首页', about: '关于', contact: '联系', profile: '个人资料', logout: '登出', login: '登录', signup: '注册', search: '搜索文章...', latestArticles: '最新文章', featured: '特色文章', readFull: '阅读完整文章', copyright: '© 2024 神学与地缘政治' },
  ja: { home: 'ホーム', about: '概要', contact: 'お問い合わせ', profile: 'プロフィール', logout: 'ログアウト', login: 'ログイン', signup: 'サインアップ', search: '記事を検索...', latestArticles: '最新の記事', featured: '特集記事', readFull: '記事全文を読む', copyright: '© 2024 神学と地政学' },
  ru: { home: 'Главная', about: 'О сайте', contact: 'Контакты', profile: 'Профиль', logout: 'Выход', login: 'Вход', signup: 'Зарегистрироваться', search: 'Поиск статей...', latestArticles: 'Последние статьи', featured: 'Избранная статья', readFull: 'Читать полную статью', copyright: '© 2024 Теология и геополитика' },
  mr: { home: 'मुख्यपृष्ठ', about: 'विषयी', contact: 'संपर्क', profile: 'प्रोफाइल', logout: 'लॉगआउट', login: 'लॉगिन', signup: 'साइन अप', search: 'लेख शोधा...', latestArticles: 'नवीनतम लेख', featured: 'विशेष लेख', readFull: 'संपूर्ण लेख वाचा', copyright: '© 2024 धर्मशास्त्र आणि भू-राजनीति' },
}

export default function Home() {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [username, setUsername] = useState(null)
  const [language, setLanguage] = useState('en')
  const router = useRouter()
  const t = translations[language]

  const categories = ['All', 'Religion', 'Geopolitics', 'Politics', 'History', 'Analysis']

  useEffect(() => {
    const user = localStorage.getItem('username')
    const lang = localStorage.getItem('language') || 'en'
    setUsername(user)
    setLanguage(lang)
  }, [])

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      setArticles(data || [])
    }
    fetchArticles()
  }, [])

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

  const handleLogout = () => {
    localStorage.removeItem('username')
    setUsername(null)
    router.push('/')
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const featuredArticle = articles[0]

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family:Lora:wght@400;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%); }

        a { color: inherit; text-decoration: none; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(100, 200, 255, 0.3); }
          50% { text-shadow: 0 0 20px rgba(100, 200, 255, 0.6); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(100, 200, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none', animation: 'float 6s ease-in-out infinite' }}></div>
      <div style={{ position: 'fixed', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 100, 200, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite 1s' }}></div>

      {/* NAVBAR */}
      <nav style={{
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        background: 'rgba(15, 15, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.5px' }}>
            T&G
          </Link>

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <Link href="/" style={{ fontWeight: '500', color: '#b0b0b0', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>{t.home}</Link>
            <Link href="/about" style={{ fontWeight: '500', color: '#b0b0b0', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>{t.about}</Link>
            <Link href="/contact" style={{ fontWeight: '500', color: '#b0b0b0', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#64c8ff'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>{t.contact}</Link>
            
            {username ? (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderLeft: '1px solid rgba(100, 200, 255, 0.2)', paddingLeft: '3rem' }}>
                <Link href="/profile" style={{ fontWeight: '500', color: '#64c8ff' }}>{t.profile}</Link>
                <button onClick={handleLogout} style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>{t.logout}</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', borderLeft: '1px solid rgba(100, 200, 255, 0.2)', paddingLeft: '3rem' }}>
                <Link href="/login" style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', color: '#b0b0b0', border: '1px solid rgba(100, 200, 255, 0.3)', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.borderColor = '#64c8ff'; e.target.style.color = '#64c8ff' }} onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(100, 200, 255, 0.3)'; e.target.style.color = '#b0b0b0' }}>{t.login}</Link>
                <Link href="/signup" style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>{t.signup}</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* FEATURED ARTICLE HERO */}
      {featuredArticle && (
        <section style={{
          padding: '5rem 2rem',
          borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', animation: 'slideIn 0.8s ease-out' }}>
            <div>
              <span style={{ color: '#64c8ff', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '700', display: 'inline-block', marginBottom: '1.5rem' }}>━ {t.featured}</span>
              <h1 style={{ fontSize: '3.2rem', lineHeight: '1.15', marginBottom: '1.5rem', color: '#fff', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {featuredArticle.title}
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#a0a0a0', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                {featuredArticle.excerpt}
              </p>
              <Link href={`/articles/${featuredArticle.slug}`} style={{
                background: 'linear-gradient(135deg, #64c8ff, #ff64c8)',
                color: '#fff',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontWeight: '700',
                display: 'inline-block',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px) scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
              >
                {t.readFull} →
              </Link>
            </div>
            {featuredArticle.cover_image_url && (
              <div style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(100, 200, 255, 0.3)', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
                <Image
                  src={featuredArticle.cover_image_url}
                  alt={featuredArticle.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* SEARCH & CATEGORIES */}
      <section style={{ padding: '4rem 2rem', borderBottom: '1px solid rgba(100, 200, 255, 0.2)', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '8px',
              color: '#e0e0e0',
              fontSize: '1rem',
              marginBottom: '2.5rem',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => { e.target.style.borderColor = '#64c8ff'; e.target.style.boxShadow = '0 0 20px rgba(100, 200, 255, 0.3)' }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(100, 200, 255, 0.3)'; e.target.style.boxShadow = 'none' }}
          />

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.8rem 1.8rem',
                  border: selectedCategory === cat ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.3)',
                  background: selectedCategory === cat ? 'rgba(100, 200, 255, 0.2)' : 'transparent',
                  color: selectedCategory === cat ? '#64c8ff' : '#b0b0b0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = '#64c8ff'
                    e.target.style.color = '#64c8ff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = 'rgba(100, 200, 255, 0.3)'
                    e.target.style.color = '#b0b0b0'
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section style={{ padding: '5rem 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem', color: '#fff', fontWeight: '900', fontFamily: '"Playfair Display", serif' }}>
            {t.latestArticles}
          </h2>

          {filteredArticles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#808080', fontSize: '1.1rem', padding: '3rem' }}>No articles found</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(255, 100, 200, 0.05))',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(100, 200, 255, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = '#64c8ff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)'
                  }}>
                    
                    {article.cover_image_url && (
                      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'rgba(100, 200, 255, 0.1)' }}>
                        <Image
                          src={article.cover_image_url}
                          alt={article.title}
                          fill
                          style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        />
                      </div>
                    )}

                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {article.category && (
                        <span style={{
                          color: '#64c8ff',
                          textTransform: 'uppercase',
                          fontSize: '0.7rem',
                          letterSpacing: '1.5px',
                          marginBottom: '1rem',
                          fontWeight: '700'
                        }}>
                          {article.category}
                        </span>
                      )}

                      <h3 style={{
                        fontSize: '1.35rem',
                        fontWeight: '800',
                        color: '#fff',
                        marginBottom: '1rem',
                        lineHeight: '1.3',
                        fontFamily: '"Playfair Display", serif'
                      }}>
                        {article.title}
                      </h3>

                      <p style={{
                        color: '#a0a0a0',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        flex: 1
                      }}>
                        {article.excerpt}
                      </p>

                      <p style={{
                        color: '#707070',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {new Date(article.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LANGUAGE SELECTOR */}
      <section style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(100, 200, 255, 0.2)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#808080', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Language / भाषा चुनें</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            {['en', 'hi', 'ar', 'fr', 'zh', 'ja', 'ru', 'mr'].map(lang => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                style={{
                  padding: '0.6rem 1rem',
                  background: language === lang ? 'linear-gradient(135deg, #64c8ff, #ff64c8)' : 'transparent',
                  border: language === lang ? 'none' : '1px solid rgba(100, 200, 255, 0.3)',
                  color: language === lang ? '#fff' : '#b0b0b0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (language !== lang) {
                    e.target.style.borderColor = '#64c8ff'
                    e.target.style.color = '#64c8ff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== lang) {
                    e.target.style.borderColor = 'rgba(100, 200, 255, 0.3)'
                    e.target.style.color = '#b0b0b0'
                  }
                }}
              >
                {lang === 'en' ? '🇬🇧' : lang === 'hi' ? '🇮🇳' : lang === 'ar' ? '🇸🇦' : lang === 'fr' ? '🇫🇷' : lang === 'zh' ? '🇨🇳' : lang === 'ja' ? '🇯🇵' : lang === 'ru' ? '🇷🇺' : '🇮🇳'} {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: 'rgba(15, 15, 30, 0.8)',
        borderTop: '1px solid rgba(100, 200, 255, 0.2)',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#808080',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>{t.copyright}</p>
        </div>
      </footer>
    </div>
  )
}

