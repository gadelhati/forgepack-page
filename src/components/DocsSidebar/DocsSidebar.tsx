import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import './DocsSidebar.css';

interface DocsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  const { t } = useLanguage();
  const location = useLocation();

  // Detect package from URL path
  const pathSegments = location.pathname.split('/');
  const currentPackage = pathSegments[2] || 'request'; // /docs/[package]/...
  
  const getPackageConfig = (pkg: string) => {
    switch (pkg) {
      case 'leaflet':
        return {
          name: '@forgepack/leaflet',
          version: 'v1.0.0',
          sections: [
            {
              title: t.sidebar.overview,
              items: [
                { label: t.sidebar.overview, path: '/docs/leaflet' },
                { label: t.sidebar.gettingStarted, path: '/docs/leaflet/getting-started' },
              ],
            },
            {
              title: t.sidebar.examples,
              items: [
                { label: t.sidebar.basicMap, path: '/docs/leaflet/examples/basic-map' },
                { label: t.sidebar.markers, path: '/docs/leaflet/examples/markers' },
                { label: t.sidebar.routePlanning, path: '/docs/leaflet/examples/route-planning' },
                { label: t.sidebar.imageOverlays, path: '/docs/leaflet/examples/image-overlays' },
              ],
            },
            {
              title: t.sidebar.apiReference,
              items: [
                { label: t.sidebar.components, path: '/docs/leaflet/reference/components' },
                { label: t.sidebar.hooks, path: '/docs/leaflet/reference/hooks' },
                { label: t.sidebar.services, path: '/docs/leaflet/reference/services' },
                { label: t.sidebar.types, path: '/docs/leaflet/reference/types' },
                { label: t.sidebar.utilities, path: '/docs/leaflet/reference/utilities' },
              ],
            },
          ],
        };
      default: // 'request'
        return {
          name: '@forgepack/request',
          version: 'v1.1.1',
          sections: [
            {
              title: t.sidebar.overview,
              items: [
                { label: t.sidebar.overview, path: '/docs/request' },
                { label: t.sidebar.gettingStarted, path: '/docs/request/getting-started' },
                { label: t.sidebar.quickStart, path: '/docs/request/quick-start' },
              ],
            },
            {
              title: t.sidebar.guides,
              items: [
                { label: t.sidebar.authentication, path: '/docs/request/authentication' },
                { label: t.sidebar.routeProtection, path: '/docs/request/route-protection' },
                { label: t.sidebar.requests, path: '/docs/request/requests' },
                { label: t.sidebar.crudOperations, path: '/docs/request/crud-operations' },
                { label: t.sidebar.tokenManagement, path: '/docs/request/token-management' },
              ],
            },
            {
              title: t.sidebar.apiReference,
              items: [
                { label: t.sidebar.hooks, path: '/docs/request/reference/hooks' },
                { label: t.sidebar.components, path: '/docs/request/reference/components' },
                { label: t.sidebar.services, path: '/docs/request/reference/services' },
                { label: t.sidebar.types, path: '/docs/request/reference/types' },
                { label: t.sidebar.utilities, path: '/docs/request/reference/utilities' },
              ],
            },
            {
              title: t.sidebar.examples,
              items: [
                { label: t.sidebar.loginForm, path: '/docs/request/examples/login-form' },
                { label: t.sidebar.dashboard, path: '/docs/request/examples/dashboard' },
                { label: t.sidebar.usersList, path: '/docs/request/examples/users-list' },
              ],
            },
          ],
        };
    }
  };

  const packageConfig = getPackageConfig(currentPackage);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`docs-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-package-name">{packageConfig.name}</span>
          <span className="sidebar-version">{packageConfig.version}</span>
        </div>

        <nav className="sidebar-nav">
          {packageConfig.sections.map((section) => (
            <div key={section.title} className="sidebar-section">
              <h3 className="sidebar-section-title">{section.title}</h3>
              <ul className="sidebar-list">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="sidebar-link"
                      onClick={onClose}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
