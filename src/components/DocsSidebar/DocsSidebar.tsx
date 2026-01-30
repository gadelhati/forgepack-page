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

  const isActive = (path: string) => location.pathname === path;

  const sidebarSections = [
    {
      title: t.sidebar.gettingStarted,
      items: [
        { label: t.sidebar.installation, path: '/docs/request/getting-started' },
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
        { label: t.sidebar.hooks, path: '/docs/request/api/hooks' },
        { label: t.sidebar.components, path: '/docs/request/api/components' },
        { label: t.sidebar.services, path: '/docs/request/api/services' },
        { label: t.sidebar.types, path: '/docs/request/api/types' },
        { label: t.sidebar.utilities, path: '/docs/request/api/utilities' },
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
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`docs-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-package-name">@forgepack/request</span>
          <span className="sidebar-version">v1.0.0</span>
        </div>

        <nav className="sidebar-nav">
          {sidebarSections.map((section) => (
            <div key={section.title} className="sidebar-section">
              <h3 className="sidebar-section-title">{section.title}</h3>
              <ul className="sidebar-list">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
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
