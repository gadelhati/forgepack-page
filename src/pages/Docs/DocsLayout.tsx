import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DocsSidebar } from '../../components/DocsSidebar/DocsSidebar';
import { PackageSelector } from '../../components/PackageSelector/PackageSelector';
import './DocsLayout.css';

export function DocsLayout() {
  const location = useLocation();
  
  // Define the packages with npm URLs
  const packages = [
    {
      name: '@forgepack/request',
      path: '/docs/request',
      npmUrl: 'https://www.npmjs.com/package/@forgepack/request',
    },
    {
      name: '@forgepack/leaflet',
      path: '/docs/leaflet',
      npmUrl: 'https://www.npmjs.com/package/@forgepack/leaflet',
    },
  ];

  const currentPackage = packages.find(pkg => 
    location.pathname.startsWith(pkg.path)
  );

  const handleNpmClick = () => {
    if (currentPackage) {
      window.open(currentPackage.npmUrl, '_blank');
    }
  };

  return (
    <div className="docs-layout">
      <DocsSidebar isOpen={false} onClose={() => {}} />
      <main className="docs-main">
        <div className="docs-content">
          <div className="docs-header">
            <button
              className="docs-npm-btn"
              onClick={handleNpmClick}
              disabled={!currentPackage}
              title={currentPackage ? `View ${currentPackage.name} on npm` : 'No package selected'}
              aria-label={currentPackage ? `Open ${currentPackage.name} npm package page` : 'No package selected'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 7.334v8h6.666v1.332H12V7.334H0zm6.666 6.664H5.334v-4H3.999v4H1.333V8.667h5.333v5.331zm5.334-5.331v5.332h2.666V8.667h1.334v4h1.333v-4h1.333v5.331H24V7.334h-12v.333z"/>
              </svg>
              <span>npm</span>
            </button>
            <PackageSelector />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
