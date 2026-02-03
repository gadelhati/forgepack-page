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
    },
    {
      name: '@forgepack/leaflet',
      description: 'Interactive maps and geospatial data visualization for React',
      type: 'npm',
      version: '1.0.0',
      path: '/docs/leaflet',
      available: true,
    },
    {
      name: '@forgepack/auth-jwt',
      description: 'Backend JWT authentication utilities for Spring Boot',
      type: 'maven',
      version: '-',
      path: '#',
      available: false,
    },
    {
      name: '@forgepack/crud',
      description: 'Advanced CRUD components with forms',
      type: 'npm',
      version: '-',
      path: '#',
      available: false,
    },
    {
      name: '@forgepack/datatable',
      description: 'Data tables with pagination and sorting',
      type: 'npm',
      version: '-',
      path: '#',
      available: false,
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
              <div key={pkg.name} className={`package-card ${!pkg.available ? 'coming-soon' : ''}`}>
                <div className="package-header">
                  <span className="package-type">{pkg.type}</span>
                  {pkg.available ? (
                    <span className="package-version">v{pkg.version}</span>
                  ) : (
                    <span className="package-coming-soon">{t.packages.comingSoon}</span>
                  )}
                </div>
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-description">{pkg.description}</p>
                {pkg.available && (
                  <Link to={pkg.path} className="btn btn-secondary btn-sm">
                    {t.packages.viewDocs}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
