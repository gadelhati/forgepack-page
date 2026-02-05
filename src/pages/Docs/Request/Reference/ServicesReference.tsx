import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function ApiServices() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Services API Reference',
      subtitle: 'Complete reference for CRUD service functions.',
    },
    pt: {
      title: 'Referência de API - Serviços',
      subtitle: 'Referência completa para funções de serviço CRUD.',
    },
  };

  const t = content[language];

  const servicesCode = `// Create a new resource
create<T>(
  api: AxiosInstance,
  endpoint: string,
  data: Partial<T>
): Promise<T | null>

// Retrieve resource(s)
retrieve<T>(
  api: AxiosInstance,
  endpoint: string,
  params?: Record<string, any>
): Promise<T | null>

// Update a resource
update<T>(
  api: AxiosInstance,
  endpoint: string,
  data: T & { id: string }
): Promise<T | null>

// Delete a resource
remove(
  api: AxiosInstance,
  endpoint: string,
  id: string
): Promise<void>

// Create API client
createApiClient(config: {
  baseURL: string,
  onUnauthorized?: () => void,
  onForbidden?: () => void,
  timeout?: number
}): AxiosInstance`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>
      <CodeBlock code={servicesCode} language="tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/reference/components" className="docs-nav-link">
          <span className="docs-nav-label">Previous</span>
          <span className="docs-nav-title">Components API</span>
        </Link>
        <Link to="/docs/request/reference/types" className="docs-nav-link next">
          <span className="docs-nav-label">Next</span>
          <span className="docs-nav-title">Types API</span>
        </Link>
      </nav>
    </article>
  );
}
