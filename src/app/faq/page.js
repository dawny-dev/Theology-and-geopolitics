'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FAQ() {
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', flag: '🇬🇧' }, { code: 'hi', flag: '🇮🇳' }, { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' }, { code: 'de', flag: '🇩🇪' }, { code: 'zh', flag: '🇨🇳' },
    { code: 'ja', flag: '🇯🇵' },
  ]

  const translations = {
    en: { home: 'Home', about: 'About', contact: 'Contact', pricing: 'Pricing', title: 'Frequently Asked Questions', copyright: '© 2026 Theology & Geopolitics' },
    hi: { home: 'होम', about: 'परिचय', contact: 'संपर्क', pricing: 'मूल्य', title: 'अक्सर पूछे जाने वाले प्रश्न', copyright: '© 2026 धर्मशास्त्र और भू-राजनीति' },
    es: { home: 'Inicio', about: 'Acerca de', contact: 'Contacto', pricing: 'Precios', title: 'Preguntas Frecuentes', copyright: '© 2026 Teología y Geopolítica' },
    fr: { home: 'Accueil', about: 'À Propos', contact: 'Contact', pricing: 'Tarifs', title: 'Questions Fréquemment Posées', copyright: '© 2026 Théologie et Géopolitique' },
    de: { home: 'Startseite', about: 'Über Uns', contact: 'Kontakt', pricing: 'Preise', title: 'Häufig Gestellte Fragen', copyright: '© 2026 Theologie und Geopolitik' },
    zh: { home: '首页', about: '关于', contact: '联系', pricing: '价格', title: '常见问题', copyright: '© 2026 神学与地缘政治' },
    ja: { home: 'ホーム', about: '概要', contact: 'お問い合わせ', pricing: '料金', title 'よくある質問', copyright: '© 2026 神学と地政学' }
  }

  const t = translations[language] || translations.en

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'en')
  }, [])

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');`}</style>
      
      <nav style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.15)', padding: '1.5rem 2rem', background: 'rgba(15, 15, 30, 0.92)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.6rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none' }}>T&G</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.home}</Link>
            <Link href="/about" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.about}</Link>
            <Link href="/contact" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.contact}</Link>
            <Link href="/pricing" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.pricing}</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '3rem', textAlign: 'center' }}>{t.title}</h1>

        {[
          { q: 'What is Theology & Geopolitics?', a: 'A platform exploring the intersection of religion, faith, and global politics.' },
          { q: 'How do I subscribe?', a: 'Visit our pricing page and choose a plan that works for you.' },
          { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time without penalties.' }
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(100, 200, 255, 0.08)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
            <h3 style={{ color: '#64c8ff', fontWeight: '700', marginBottom: '0.75rem' }}>{item.q}</h3>
            <p style={{ color: '#a0a0a0', margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>

      <section style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(100, 200, 255, 0.15)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {languages.map(lang => (
            <button key={lang.code} onClick={() => { setLanguage(lang.code); localStorage.setItem('language', lang.code); }} style={{ padding: '0.6rem 1rem', background: language === lang.code ? 'linear-gradient(135deg, #64c8ff, #ff64c8)' : 'transparent', border: language === lang.code ? 'none' : '1px solid rgba(100, 200, 255, 0.25)', color: language === lang.code ? '#fff' : '#b0b0b0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{lang.flag}</span> {lang.code.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <footer style={{ background: 'rgba(15, 15, 30, 0.95)', borderTop: '1px solid rgba(100, 200, 255, 0.15)', padding: '3rem 2rem', textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: '#707070', fontSize: '0.85rem', margin: 0 }}>{t.copyright}</p>
      </footer>
    </div>
  )
}
