'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function About() {
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', flag: '🇬🇧' }, { code: 'hi', flag: '🇮🇳' }, { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' }, { code: 'de', flag: '🇩🇪' }, { code: 'zh', flag: '🇨🇳' },
    { code: 'ja', flag: '🇯🇵' },
  ]

  const translations = {
    en: { home: 'Home', about: 'About', contact: 'Contact', pricing: 'Pricing', profile: 'Profile', logout: 'Logout', login: 'Login', signup: 'Sign Up', title: 'Privacy Policy', desc: 'Learn how we collect, use, and protect your information.', copyright: '© 2026 Theology & Geopolitics' },
    hi: { home: 'होम', about: 'परिचय', contact: 'संपर्क', pricing: 'मूल्य', profile: 'प्रोफाइल', logout: 'लॉगआउट', login: 'लॉगिन', signup: 'साइन अप', title: 'गोपनीयता नीति', desc: 'जानें कि हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित रखते हैं।', copyright: '© 2026 धर्मशास्त्र और भू-राजनीति' },
    es: { home: 'Inicio', about: 'Acerca de', contact: 'Contacto', pricing: 'Precios', profile: 'Perfil', logout: 'Cerrar Sesión', login: 'Iniciar Sesión', signup: 'Registrarse', title: 'Política de Privacidad', desc: 'Aprende cómo recopilamos, usamos y protegemos tu información.', copyright: '© 2026 Teología y Geopolítica' },
    fr: { home: 'Accueil', about: 'À Propos', contact: 'Contact', pricing: 'Tarifs', profile: 'Profil', logout: 'Déconnexion', login: 'Connexion', signup: 'S\'inscrire', title: 'Politique de Confidentialité', desc: 'Découvrez comment nous collectons, utilisons et protégeons vos données.', copyright: '© 2026 Théologie et Géopolitique' },
    de: { home: 'Startseite', about: 'Über Uns', contact: 'Kontakt', pricing: 'Preise', profile: 'Profil', logout: 'Abmelden', login: 'Anmelden', signup: 'Registrieren', title: 'Datenschutzrichtlinie', desc: 'Erfahren Sie, wie wir Ihre Daten sammeln, verwenden und schützen.', copyright: '© 2026 Theologie und Geopolitik' },
    zh: { home: '首页', about: '关于', contact: '联系', pricing: '价格', profile: '个人资料', logout: '登出', login: '登录', signup: '注册', title: '隐私政策', desc: '了解我们如何收集、使用和保护您的信息。', copyright: '© 2026 神学与地缘政治' },
    ja: { home: 'ホーム', about: '概要', contact: 'お問い合わせ', pricing: '料金', profile: 'プロフィール', logout: 'ログアウト', login: 'ログイン', signup: 'サインアップ', title: 'プライバシーポリシー', desc: '当社がどのように情報を収集・使用・保護するかをご覧ください。', copyright: '© 2026 神学と地政学' }
  }

  const t = translations[language] || translations.en

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'en')
  }, [])

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      `}</style>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.15)', padding: '1.5rem 2rem', background: 'rgba(15, 15, 30, 0.92)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.6rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', cursor: 'pointer', textDecoration: 'none' }}>T&G</Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/" style={{ fontWeight: '500', color: '#b0b0b0', fontSize: '0.95rem', textDecoration: 'none' }}>{t.home}</Link>
            <Link href="/about" style={{ fontWeight: '500', color: '#64c8ff', fontSize: '0.95rem', textDecoration: 'none' }}>{t.about}</Link>
            <Link href="/contact" style={{ fontWeight: '500', color: '#b0b0b0', fontSize: '0.95rem', textDecoration: 'none' }}>{t.contact}</Link>
            <Link href="/pricing" style={{ fontWeight: '500', color: '#b0b0b0', fontSize: '0.95rem', textDecoration: 'none' }}>{t.pricing}</Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>{t.title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '3rem' }}>{t.desc}</p>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.08), rgba(255, 100, 200, 0.06))', border: '1px solid rgba(100, 200, 255, 0.2)', padding: '3rem', borderRadius: '12px', marginBottom: '3rem' }}>
          
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>Information We Collect</h2>
          <p style={{ fontSize: '1.05rem', color: '#c0c0c0', lineHeight: '1.8', marginBottom: '2rem' }}>
            We may collect personal information such as your name, email address, and usage data when you interact with our platform. This includes information you provide directly and data collected automatically through cookies and analytics tools.
          </p>
          
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>How We Use Your Information</h2>
          <p style={{ fontSize: '1.05rem', color: '#c0c0c0', lineHeight: '1.8' }}>
            Your information is used to improve our services, personalize your experience, and communicate important updates. We do not sell your personal data and take appropriate measures to ensure your information remains secure.
          </p>

        </div>
      </div>

      {/* LANGUAGE SELECTOR */}
      <section style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(100, 200, 255, 0.15)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {languages.map(lang => (
              <button key={lang.code} onClick={() => { setLanguage(lang.code); localStorage.setItem('language', lang.code); }} style={{ padding: '0.6rem 1rem', background: language === lang.code ? 'linear-gradient(135deg, #64c8ff, #ff64c8)' : 'transparent', border: language === lang.code ? 'none' : '1px solid rgba(100, 200, 255, 0.25)', color: language === lang.code ? '#fff' : '#b0b0b0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{lang.flag}</span> {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.95), rgba(26, 26, 46, 0.95))', borderTop: '1px solid rgba(100, 200, 255, 0.15)', padding: '3rem 2rem', marginTop: '3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ color: '#707070', fontSize: '0.85rem', margin: 0 }}>{t.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
