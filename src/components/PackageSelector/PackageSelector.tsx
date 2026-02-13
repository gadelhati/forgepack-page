import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PackageSelector.css';

interface Package {
  name: string;
  path: string;
  description: string;
  icon: string;
  npmUrl: string;
}

export function PackageSelector() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const packages: Package[] = [
    {
      name: '@forgepack/request',
      path: '/docs/request',
      description: 'HTTP client with JWT authentication',
      icon: '🔐',
      npmUrl: 'https://www.npmjs.com/package/@forgepack/request',
    },
    {
      name: '@forgepack/leaflet',
      path: '/docs/leaflet', 
      description: 'Interactive maps and geospatial data',
      icon: '🗺️',
      npmUrl: 'https://www.npmjs.com/package/@forgepack/leaflet',
    },
  ];

  const currentPackage = packages.find(pkg => 
    location.pathname.startsWith(pkg.path)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  const handleNpmClick = (e: React.MouseEvent, npmUrl: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(npmUrl, '_blank');
  };

  return (
    <div 
      className={`package-selector ${isOpen ? 'open' : ''}`} 
      ref={dropdownRef}
    >
      <div 
        className="current-package" 
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle(e as any);
          }
        }}
      >
        <div className="current-package-info">
          <span className="package-icon">{currentPackage?.icon}</span>
          <span className="package-name">{currentPackage?.name}</span>
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`}>▼</span>
      </div>
      
      <div className={`package-dropdown ${isOpen ? 'visible' : ''}`}>
        {packages.map((pkg) => {
          const isActive = location.pathname.startsWith(pkg.path);
          return (
            <div 
              key={pkg.name} 
              className={`package-option-wrapper ${isActive ? 'active' : ''}`}
            >
              <Link
                to={pkg.path}
                className={`package-option ${isActive ? 'active' : ''}`}
                onClick={handleOptionClick}
              >
                <div className="package-option-main">
                  <span className="package-icon">{pkg.icon}</span>
                  <div className="package-details">
                    <span className="package-name">{pkg.name}</span>
                    <span className="package-description">{pkg.description}</span>
                  </div>
                </div>
              </Link>
              <button
                className="npm-link-btn"
                onClick={(e) => handleNpmClick(e, pkg.npmUrl)}
                title={`View ${pkg.name} on npm`}
                aria-label={`Open ${pkg.name} npm package page`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 7.334v8h6.666v1.332H12V7.334H0zm6.666 6.664H5.334v-4H3.999v4H1.333V8.667h5.333v5.331zm5.334-5.331v5.332h2.666V8.667h1.334v4h1.333v-4h1.333v5.331H24V7.334h-12v.333z"/>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}