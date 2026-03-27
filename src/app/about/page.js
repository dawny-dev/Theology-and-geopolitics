export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <style>{`
        .navbar {
          background: linear-gradient(135deg, #1a2332 0%, #2a3344 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .section-title {
          color: #1a2332;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .content-text {
          color: #333;
          line-height: 1.8;
          font-size: 1.05rem;
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-yellow-400 transition">
              T&G
            </h1>
          </a>
          <div className="flex gap-8">
            <a href="/about" className="text-white hover:text-yellow-400 transition">About</a>
            <a href="/contact" className="text-white hover:text-yellow-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="section-title">About Theology & Geopolitics</h1>

        <div className="content-text mb-8">
          <p className="mb-6">
            Welcome to Theology & Geopolitics, a platform dedicated to exploring the profound intersections between religious thought, faith traditions, and global political dynamics.
          </p>

          <p className="mb-6">
            In an increasingly complex world, understanding how theology influences geopolitical decisions is essential. This website brings together in-depth analysis, historical perspectives, and contemporary insights into how religious beliefs shape international relations, conflict, and cooperation.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" style={{ color: '#1a2332' }}>Our Mission</h2>
          <p className="mb-6">
            To provide thoughtful, nuanced analysis of how theology and faith intersect with global politics, power structures, and international affairs. We believe that understanding these connections is crucial for informed global citizenship.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" style={{ color: '#1a2332' }}>What We Cover</h2>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>Religious influence on international relations</li>
            <li>Faith and global power dynamics</li>
            <li>Historical theological perspectives on politics</li>
            <li>Contemporary geopolitical analysis through a theological lens</li>
            <li>Case studies of religion in global conflicts and cooperation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" style={{ color: '#1a2332' }}>Contact Us</h2>
          <p>
            Have questions or want to contribute? <a href="/contact" className="text-blue-600 hover:underline">Get in touch</a>.
          </p>
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

