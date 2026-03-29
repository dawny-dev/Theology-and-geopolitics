'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', flag: '🇬🇧' }, { code: 'hi', flag: '🇮🇳' }, { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' }, { code: 'de', flag: '🇩🇪' }, { code: 'zh', flag: '🇨🇳' },
    { code: 'ja', flag: '🇯🇵' },
  ]

  const translations = {
    en: { home: 'Home', about: 'About', contact: 'Contact', pricing: 'Pricing', title: 'Pricing Plans', desc: 'Choose the right plan for you.', free: 'Free', pro: 'Professional', enterprise: 'Enterprise', copyright: '© 2026 Theology & Geopolitics' },
    hi: { home: 'होम', about: 'परिचय', contact: 'संपर्क', pricing: 'मूल्य', title: 'मूल्य निर्धारण योजनाएं', desc: 'अपने लिए सही योजना चुनें।', free: 'मुफ़्त', pro: 'व्यावसायिक', enterprise: 'एंटरप्राइज', copyright: '© 2026 धर्मशास्त्र और भू-राजनीति' },
    es: { home: 'Inicio', about: 'Acerca de', contact: 'Contacto', pricing: 'Precios', title: 'Planes de Precios', desc: 'Elige el plan adecuado para ti.', free: 'Gratis', pro: 'Profesional', enterprise: 'Empresa', copyright: '© 2026 Teología y Geopolítica' },
    fr: { home: 'Accueil', about: 'À Propos', contact: 'Contact', pricing: 'Tarifs', title: 'Plans Tarifaires', desc: 'Choisissez le bon plan pour vous.', free: 'Gratuit', pro: 'Professionnel', enterprise: 'Entreprise', copyright: '© 2026 Théologie et Géopolitique' },
    de: { home: 'Startseite', about: 'Über Uns', contact: 'Kontakt', pricing: 'Preise', title: 'Preispläne', desc: 'Wählen Sie den richtigen Plan für Sie.', free: 'Kostenlos', pro: 'Professionell', enterprise: 'Unternehmen', copyright: '© 2026 Theologie und Geopolitik' },
    zh: { home: '首页', about: '关于', contact: '联系', pricing: '价格', title: '价格计划', desc: '为您选择合适的计划。', free: '免费', pro: '专业', enterprise: '企业', copyright: '© 2026 神学与地缘政治' },
    ja: { home: 'ホーム', about: '概要', contact: 'お問い合わせ', pricing: '料金', title: '料金プラン', desc: 'あなたに合ったプランを選択してください。', free: '無料', pro: 'プロフェッショナル', enterprise: 'エンタープライズ', copyright: '© 2026 神学と地政学' }
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
            <Link href="/pricing" style={{ fontWeight: '500', color: '#64c8ff', textDecoration: 'none' }}>{t.pricing}</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textAlign: 'center', marginBottom: '1rem' }}>{t.title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#a0a0a0', textAlign: 'center', marginBottom: '3rem' }}>{t.desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { name: t.free, price: '$0', features: ['Limited articles', 'Basic search', 'Community'] },
            { name: t.pro, price: '$9.99/mo', features: ['All articles', 'Advanced search', 'No ads', 'Email support'] },
            { name: t.enterprise, price: 'Custom', features: ['Everything in Pro', 'API access', 'Priority support'] }
          ].map((plan, i) => (
            <div key={i} style={{ background: 'rgba(100, 200, 255, 0.08)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(100, 200, 255, 0.2)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>{plan.name}</h3>
              <p style={{ fontSize: '2rem', fontWeight: '900', color: '#64c8ff', marginBottom: '2rem' }}>{plan.price}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {plan.features.map((f, j) => <li key={j} style={{ marginBottom: '0.75rem', color: '#a0a0a0' }}>✓ {f}</li>)}
              </ul>
              <button style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>Get Started</button>
            </div>
          ))}
        </div>
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
