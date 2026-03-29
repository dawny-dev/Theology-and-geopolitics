'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [language, setLanguage] = useState('en')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const languages = [
    { code: 'en', flag: '🇬🇧' }, { code: 'hi', flag: '🇮🇳' }, { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' }, { code: 'de', flag: '🇩🇪' }, { code: 'zh', flag: '🇨🇳' },
    { code: 'ja', flag: '🇯🇵' },
  ]

  const translations = {
    en: { home: 'Home', about: 'About', contact: 'Contact', pricing: 'Pricing', title: 'Contact Us', desc: 'Get in touch with our team.', name: 'Name', email: 'Email', message: 'Message', send: 'Send Message', copyright: '© 2026 Theology & Geopolitics' },
    hi: { home: 'होम', about: 'परिचय', contact: 'संपर्क', pricing: 'मूल्य', title: 'हमसे संपर्क करें', desc: 'हमारी टीम से संपर्क करें।', name: 'नाम', email: 'ईमेल', message: 'संदेश', send: 'संदेश भेजें', copyright: '© 2026 धर्मशास्त्र और भू-राजनीति' },
    es: { home: 'Inicio', about: 'Acerca de', contact: 'Contacto', pricing: 'Precios', title: 'Contacta con Nosotros', desc: 'Comunícate con nuestro equipo.', name: 'Nombre', email: 'Correo', message: 'Mensaje', send: 'Enviar', copyright: '© 2026 Teología y Geopolítica' },
    fr: { home: 'Accueil', about: 'À Propos', contact: 'Contact', pricing: 'Tarifs', title: 'Nous Contacter', desc: 'Entrez en contact avec notre équipe.', name: 'Nom', email: 'Email', message: 'Message', send: 'Envoyer', copyright: '© 2026 Théologie et Géopolitique' },
    de: { home: 'Startseite', about: 'Über Uns', contact: 'Kontakt', pricing: 'Preise', title: 'Kontaktieren Sie Uns', desc: 'Nehmen Sie Kontakt mit unserem Team auf.', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Senden', copyright: '© 2026 Theologie und Geopolitik' },
    zh: { home: '首页', about: '关于', contact: '联系', pricing: '价格', title: '联系我们', desc: '与我们的团队联系。', name: '姓名', email: '电子邮件', message: '消息', send: '发送', copyright: '© 2026 神学与地缘政治' },
    ja: { home: 'ホーム', about: '概要', contact: 'お問い合わせ', pricing: '料金', title: 'お問い合わせ', desc: '私たちのチームにお問い合わせください。', name: '名前', email: 'メール', message: 'メッセージ', send: '送信', copyright: '© 2026 神学と地政学' }
  }

  const t = translations[language] || translations.en

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'en')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert('Message sent! (Demo - integrate with API)')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');`}</style>
      
      <nav style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.15)', padding: '1.5rem 2rem', background: 'rgba(15, 15, 30, 0.92)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.6rem', fontWeight: '900', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none' }}>T&G</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.home}</Link>
            <Link href="/about" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.about}</Link>
            <Link href="/contact" style={{ fontWeight: '500', color: '#64c8ff', textDecoration: 'none' }}>{t.contact}</Link>
            <Link href="/pricing" style={{ fontWeight: '500', color: '#b0b0b0', textDecoration: 'none' }}>{t.pricing}</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: '"Playfair Display", serif', background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>{t.title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '3rem' }}>{t.desc}</p>

        <form onSubmit={handleSubmit} style={{ background: 'rgba(100, 200, 255, 0.08)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64c8ff', fontWeight: '700' }}>{t.name}</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(100, 200, 255, 0.05)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '6px', color: '#e0e0e0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64c8ff', fontWeight: '700' }}>{t.email}</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(100, 200, 255, 0.05)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '6px', color: '#e0e0e0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64c8ff', fontWeight: '700' }}>{t.message}</label>
            <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(100, 200, 255, 0.05)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '6px', color: '#e0e0e0', minHeight: '150px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #64c8ff, #ff64c8)', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>{t.send}</button>
        </form>
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
