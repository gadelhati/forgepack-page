import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function ApiComponents() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Components API Reference',
      subtitle: 'Complete reference for all available components.',
      authProvider: 'AuthProvider',
      authProviderDesc: 'Context provider for authentication. Must wrap your application.',
      requireAuth: 'RequireAuth',
      requireAuthDesc: 'Protects routes based on authentication and roles.',
    },
    pt: {
      title: 'Referência de API - Componentes',
      subtitle: 'Referência completa para todos os componentes disponíveis.',
      authProvider: 'AuthProvider',
      authProviderDesc: 'Provider de contexto para autenticação. Deve envolver sua aplicação.',
      requireAuth: 'RequireAuth',
      requireAuthDesc: 'Protege rotas baseado em autenticação e funções.',
    },
  };

  const t = content[language];

  const authProviderCode = `<AuthProvider
  api={AxiosInstance}           // Required: configured API client
  loginEndpoint?: string        // Default: '/auth/login'
  logoutEndpoint?: string       // Default: '/auth/logout'
>
  {children}
</AuthProvider>`;

  const requireAuthCode = `<RequireAuth
  allowedRoles?: string[]       // Roles allowed to access (e.g., ['ADMIN', 'USER'])
  redirectTo?: string           // Redirect path for unauthorized users (default: '/login')
>
  {children}
</RequireAuth>`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.authProvider}</h2>
      <p>{t.authProviderDesc}</p>
      <CodeBlock code={authProviderCode} language="tsx" />

      <h2>{t.requireAuth}</h2>
      <p>{t.requireAuthDesc}</p>
      <CodeBlock code={requireAuthCode} language="tsx" />
    </article>
  );
}
