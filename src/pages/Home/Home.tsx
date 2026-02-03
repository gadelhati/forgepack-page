import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import './Home.css';

export function Home() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter packages based on active filter and search term
  const filteredPackages = packages.filter(pkg => {
    // Filter by type
    const typeMatch = activeFilter === 'all' || pkg.type === activeFilter;
    
    // Filter by search term (name, description, or tags)
    const searchMatch = searchTerm === '' || 
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return typeMatch && searchMatch;
  });

  // Count packages by type
  const packageCounts = {
    all: packages.length,
    npm: packages.filter(pkg => pkg.type === 'npm').length,
    maven: packages.filter(pkg => pkg.type === 'maven').length,
  };

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
              href="#packages"
              className="btn btn-secondary"
            >
              {t.packages.title}
            </a>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="packages-section">
        <div className="container">
          <div className="section-header">
            <h2>{t.packages.title}</h2>
            <p>{t.packages.subtitle}</p>
          </div>
          
          {/* Package Filters */}
          <div className="package-filters">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All <span className="filter-count">{packageCounts.all}</span>
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'npm' ? 'active' : ''}`}
                onClick={() => setActiveFilter('npm')}
              >
                npm <span className="filter-count">{packageCounts.npm}</span>
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'maven' ? 'active' : ''}`}
                onClick={() => setActiveFilter('maven')}
              >
                Maven <span className="filter-count">{packageCounts.maven}</span>
              </button>
            </div>
            
            <div className="search-container">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
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
                      {pkg.stars && pkg.stars > 0 && (
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
