import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';

export function RequestOverview() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: '@forgepack/request',
      subtitle: 'Production-ready HTTP client with JWT authentication for React applications.',
      description: 'This package provides a complete solution for managing HTTP requests and authentication in React applications. It includes ready-to-use hooks, components, and utilities that eliminate common boilerplate code.',
      features: [
        { icon: '🔐', title: 'JWT Authentication', desc: 'Complete system with automatic interceptors' },
        { icon: '🛡️', title: 'Route Protection', desc: 'Role-based access control with RequireAuth' },
        { icon: '📊', title: 'Reactive Requests', desc: 'Hooks with automatic state management' },
        { icon: '⚡', title: 'Simplified CRUD', desc: 'Standardized create, read, update, delete' },
        { icon: '🔑', title: 'Token Management', desc: 'Automatic validation and secure storage' },
        { icon: '📦', title: 'TypeScript First', desc: 'Full type safety with comprehensive types' },
      ],
      installation: 'Installation',
      quickstart: 'Quick Start',
      next: 'Next: Installation',
    },
    pt: {
      title: '@forgepack/request',
      subtitle: 'Cliente HTTP pronto para produção com autenticação JWT para aplicações React.',
      description: 'Este pacote fornece uma solução completa para gerenciar requisições HTTP e autenticação em aplicações React. Inclui hooks, componentes e utilitários prontos para uso que eliminam código repetitivo comum.',
      features: [
        { icon: '🔐', title: 'Autenticação JWT', desc: 'Sistema completo com interceptadores automáticos' },
        { icon: '🛡️', title: 'Proteção de Rotas', desc: 'Controle de acesso baseado em funções com RequireAuth' },
        { icon: '📊', title: 'Requisições Reativas', desc: 'Hooks com gerenciamento automático de estado' },
        { icon: '⚡', title: 'CRUD Simplificado', desc: 'Criar, ler, atualizar, deletar padronizados' },
        { icon: '🔑', title: 'Gerenciamento de Tokens', desc: 'Validação automática e armazenamento seguro' },
        { icon: '📦', title: 'TypeScript Primeiro', desc: 'Tipagem completa com tipos abrangentes' },
      ],
      installation: 'Instalação',
      quickstart: 'Início Rápido',
      next: 'Próximo: Instalação',
    },
  };

  const t = content[language];

  const installCode = `npm install @forgepack/request

# or with yarn
yarn add @forgepack/request

# or with pnpm
pnpm add @forgepack/request`;

  const quickstartCode = `import { createApiClient, AuthProvider } from '@forgepack/request'

// 1. Create your API client
export const api = createApiClient({
  baseURL: "https://api.yourservice.com",
  onUnauthorized: () => window.location.href = "/login",
  onForbidden: () => window.location.href = "/not-allowed"
})

// 2. Wrap your app with AuthProvider
function App() {
  return (
    <AuthProvider api={api}>
      <YourRoutes />
    </AuthProvider>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <p>{t.description}</p>

      <h2>Features</h2>
      <div className="feature-grid" style={{ marginTop: 'var(--space-6)' }}>
        {t.features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h4>{feature.title}</h4>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <h2>{t.installation}</h2>
      <CodeBlock code={installCode} language="bash" />

      <h2>{t.quickstart}</h2>
      <CodeBlock code={quickstartCode} language="tsx" filename="src/App.tsx" />

      <nav className="docs-nav">
        <div />
        <Link to="/docs/request/getting-started" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
