import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PackageSelector.css';

interface Package {
  name: string;
  path: string;
  description: string;
  icon: string;
}

export function PackageSelector() {
  const location = useLocation();
  
  const packages: Package[] = [
    {
      name: '@forgepack/request',
      path: '/docs/request',
      description: 'HTTP client with JWT authentication',
      icon: '🔐',
    },
    {
      name: '@forgepack/leaflet',
      path: '/docs/leaflet', 
      description: 'Interactive maps and geospatial data',
      icon: '🗺️',
    },
  ];

  const currentPackage = packages.find(pkg => 
    location.pathname.startsWith(pkg.path)
  );

  return (
    <div className="package-selector">
      <div className="current-package">
        <div className="current-package-info">
          <span className="package-icon">{currentPackage?.icon}</span>
          <span className="package-name">{currentPackage?.name}</span>
        </div>
        <span className="dropdown-arrow">▼</span>
      </div>
      
      <div className="package-dropdown">
        {packages.map((pkg) => (
          <Link
            key={pkg.name}
            to={pkg.path}
            className={`package-option ${
              location.pathname.startsWith(pkg.path) ? 'active' : ''
            }`}
          >
            <div className="package-option-main">
              <span className="package-icon">{pkg.icon}</span>
              <div className="package-details">
                <span className="package-name">{pkg.name}</span>
                <span className="package-description">{pkg.description}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}