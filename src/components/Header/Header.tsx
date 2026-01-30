import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import './Header.css';

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">⚒️</span>
          <span className="logo-text">forgepack</span>
        </Link>

        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.home}
          </Link>
          <Link 
            to="/docs/request" 
            className={`nav-link ${isActive('/docs') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.docs}
          </Link>
          <a 
            href="https://github.com/forgepack" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            {t.nav.github}
          </a>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <Link to="/docs/request/getting-started" className="btn btn-primary btn-sm">
            {t.nav.getStarted}
          </Link>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
