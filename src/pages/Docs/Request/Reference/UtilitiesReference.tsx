import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function ApiUtilities() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Utilities API Reference',
      subtitle: 'Complete reference for utility functions.',
    },
    pt: {
      title: 'Referência de API - Utilitários',
      subtitle: 'Referência completa para funções utilitárias.',
    },
  };

  const t = content[language];

  const utilitiesCode = `// Token utilities
getToken(): AuthToken | null
// Returns the stored authentication token or null

isValidToken(): boolean
// Returns true if a valid, non-expired token exists

getPayload(): JwtPayload | null
// Returns the decoded JWT payload or null

clearToken(): void
// Removes the stored token from localStorage

// API client utilities
createApiClient(config: ApiClientConfig): AxiosInstance
// Creates a configured Axios instance with interceptors

interface ApiClientConfig {
  baseURL: string
  onUnauthorized?: () => void  // Called on 401 errors
  onForbidden?: () => void     // Called on 403 errors
  timeout?: number             // Request timeout in ms
  headers?: Record<string, string>
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>
      <CodeBlock code={utilitiesCode} language="tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/reference/types" className="docs-nav-link">
          <span className="docs-nav-label">Previous</span>
          <span className="docs-nav-title">Types API</span>
        </Link>
        <Link to="/docs/request/examples/login-form" className="docs-nav-link next">
          <span className="docs-nav-label">Next</span>
          <span className="docs-nav-title">Login Form Example</span>
        </Link>
      </nav>
    </article>
  );
}
