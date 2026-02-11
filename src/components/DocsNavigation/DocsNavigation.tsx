import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { useDocsNavigation } from './useDocsNavigation';

export function DocsNavigation() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { previousPage, nextPage } = useDocsNavigation(language);

  // Detect current package from URL
  const pathSegments = location.pathname.split('/');
  const currentPackage = pathSegments[2] || 'request'; // /docs/[package]/...
  
  // Get repository URL for current package
  const getRepositoryUrl = (pkg: string) => {
    const packageRepoMap: Record<string, string> = {
      'request': 'https://github.com/forgepack/request',
      'leaflet': 'https://github.com/forgepack/leaflet',
    };
    
    return packageRepoMap[pkg] || 'https://github.com/forgepack/docs';
  };

  const repositoryUrl = getRepositoryUrl(currentPackage);
  const issueUrl = `${repositoryUrl}/issues/new?template=documentation-issue.md&title=Documentation%20Issue%3A%20&body=**Page%20URL%3A**%20${encodeURIComponent(window.location.href)}%0A%0A**Issue%20Description%3A**%0A%0A**Expected%3A**%0A%0A**Actual%3A**%0A`;
  const prUrl = `${repositoryUrl}/compare`;

  return (
    <>
      {/* Navigation between pages */}
      {(previousPage || nextPage) && (
        <nav className="docs-nav">
          {previousPage && (
            <Link to={previousPage.path} className="docs-nav-link">
              <span className="docs-nav-label">{t.docs.prevPage}</span>
              <span className="docs-nav-title">{previousPage.title}</span>
            </Link>
          )}
          {nextPage && (
            <Link to={nextPage.path} className="docs-nav-link next">
              <span className="docs-nav-label">{t.docs.nextPage}</span>
              <span className="docs-nav-title">{nextPage.title}</span>
            </Link>
          )}
        </nav>
      )}
      
      {/* Contribution section */}
      <div className="docs-contribution">
        <div className="docs-contribution-content">
          <h3 className="docs-contribution-title">{t.docs.contributionTitle}</h3>
          <p className="docs-contribution-description">{t.docs.foundError}</p>
          
          <div className="docs-contribution-actions">
            <a
              href={issueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="docs-contribution-link issue"
            >
              <svg className="docs-contribution-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/>
              </svg>
              {t.docs.openIssue}
            </a>
            
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="docs-contribution-link pr"
            >
              <svg className="docs-contribution-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6-4c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM15 7V4.5c0-.83-.67-1.5-1.5-1.5S12 3.67 12 4.5V7H9V4.5C9 2.57 10.57 1 12.5 1S16 2.57 16 4.5V7h-1z"/>
              </svg>
              {t.docs.openPR}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}