import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';
import './Home.css';

const installCode = `npm install @forgepack/request`;

const quickStartCode = `import { createApiClient, AuthProvider } from '@forgepack/request'

export const api = createApiClient({
  baseURL: "https://api.service.com",
  onUnauthorized: () => window.location.href = "/login",
})

function App() {
  return (
    <AuthProvider api={api}>
      <YourApp />
    </AuthProvider>
  )
}`;

export function Home() {
  const { t } = useLanguage();

  const packages = [
    {
      name: '@forgepack/request',
      description: 'Production-ready HTTP client with JWT authentication for React',
      type: 'npm',
      version: '1.1.1',
      path: '/docs/request',
      available: true,
      tags: ['react', 'typescript', 'jwt', 'http-client', 'authentication'],
      githubRepo: 'forgepack/request',
      downloads: '12.5k',
      stars: 87,
    },
    {
      name: '@forgepack/leaflet',
      description: 'Interactive maps and geospatial data visualization for React',
      type: 'npm',
      version: '1.0.0',
      path: '/docs/leaflet',
      available: true,
      tags: ['react', 'typescript', 'maps', 'leaflet', 'geospatial', 'maritime'],
      githubRepo: 'forgepack/leaflet',
      downloads: '2.1k',
      stars: 34,
    },
    {
      name: '@forgepack/auth-jwt',
      description: 'Backend JWT authentication utilities for Spring Boot',
      type: 'maven',
      version: '-',
      path: '#',
      available: false,
      tags: ['spring-boot', 'jwt', 'security', 'authentication'],
      githubRepo: '',
      downloads: '-',
      stars: 0,
    },
    {
      name: '@forgepack/crud',
      description: 'Advanced CRUD components with forms',
      type: 'npm',
      version: '-',
      path: '#',
      available: false,
      tags: ['react', 'crud', 'forms', 'components'],
      githubRepo: '',
      downloads: '-',
      stars: 0,
    },
    {
      name: '@forgepack/datatable',
      description: 'Data tables with pagination and sorting',
      type: 'npm',
      version: '-',
      path: '#',
      available: false,
      tags: ['react', 'table', 'pagination', 'sorting'],
      githubRepo: '',
      downloads: '-',
      stars: 0,
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="badge">{t.hero.badge}</span>
          <h1 className="hero-title">
            {t.hero.title} <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <Link to="/docs/request/getting-started" className="btn btn-primary">
              {t.hero.cta}
            </Link>
            <a
              href="https://github.com/forgepack"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section className="install-section">
        <div className="container">
          <CodeBlock code={installCode} language="bash" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>{t.features.title}</h2>
            <p>{t.features.subtitle}</p>
          </div>
          <div className="feature-grid">
            {t.features.items.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quickstart-section">
        <div className="container">
          <div className="quickstart-content">
            <div className="quickstart-text">
              <h2>Quick Start</h2>
              <p>Get up and running in minutes with our simple API.</p>
              <Link to="/docs/request/getting-started" className="btn btn-primary">
                {t.nav.getStarted}
              </Link>
            </div>
            <div className="quickstart-code">
              <CodeBlock code={quickStartCode} language="tsx" filename="src/App.tsx" />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages-section">
        <div className="container">
          <div className="section-header">
            <h2>{t.packages.title}</h2>
            <p>{t.packages.subtitle}</p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg) => (
              pkg.available ? (
                <Link 
                  key={pkg.name} 
                  to={pkg.path} 
                  className="package-card clickable"
                >
                  {/* Name and Type in same line */}
                  <div className="package-name-row">
                    <h3 className="package-name">{pkg.name}</h3>
                    <span className="package-type">{pkg.type}</span>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  
                  {/* Tags */}
                  <div className="package-tags">
                    {pkg.tags.map((tag, index) => (
                      <span key={index} className="package-tag">{tag}</span>
                    ))}
                  </div>
                  
                  {/* Bottom row with version and stats */}
                  <div className="package-bottom">
                    <div className="package-info">
                      <span className="package-version">v{pkg.version}</span>
                      <div className="stat-item">
                        <span className="stat-icon">↓</span>
                        <span className="stat-value">{pkg.downloads}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">☆</span>
                        <span className="stat-value">{pkg.stars}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div key={pkg.name} className="package-card coming-soon">
                  {/* Name and Type in same line */}
                  <div className="package-name-row">
                    <h3 className="package-name">{pkg.name}</h3>
                    <span className="package-type">{pkg.type}</span>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  
                  {/* Tags */}
                  <div className="package-tags">
                    {pkg.tags.map((tag, index) => (
                      <span key={index} className="package-tag">{tag}</span>
                    ))}
                  </div>
                  
                  {/* Bottom row with version, stats and Coming Soon */}
                  <div className="package-bottom">
                    <div className="package-info">
                      {pkg.version && pkg.version !== '-' && (
                        <span className="package-version">v{pkg.version}</span>
                      )}
                      {pkg.downloads && pkg.downloads !== '-' && pkg.downloads !== '0' && (
                        <div className="stat-item">
                          <span className="stat-icon">↓</span>
                          <span className="stat-value">{pkg.downloads}</span>
                        </div>
                      )}
                      {pkg.stars && pkg.stars > 0 && pkg.stars !== '0' && pkg.stars !== 0 && (
                        <div className="stat-item">
                          <span className="stat-icon">☆</span>
                          <span className="stat-value">{pkg.stars}</span>
                        </div>
                      )}
                    </div>
                    <span className="package-coming-soon">{t.packages.comingSoon}</span>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
