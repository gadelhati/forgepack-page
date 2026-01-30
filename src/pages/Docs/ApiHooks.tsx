import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function ApiHooks() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Hooks API Reference',
      subtitle: 'Complete reference for all available hooks.',
      useAuth: 'useAuth',
      useAuthDesc: 'Hook for authentication state and actions.',
      useRequest: 'useRequest',
      useRequestDesc: 'Hook for data fetching with automatic state management.',
    },
    pt: {
      title: 'Referência de API - Hooks',
      subtitle: 'Referência completa para todos os hooks disponíveis.',
      useAuth: 'useAuth',
      useAuthDesc: 'Hook para estado e ações de autenticação.',
      useRequest: 'useRequest',
      useRequestDesc: 'Hook para busca de dados com gerenciamento automático de estado.',
    },
  };

  const t = content[language];

  const useAuthCode = `const {
  isAuthenticated: boolean,     // Whether user is logged in
  user: User | null,            // Current user data
  loading: boolean,             // Auth state loading
  loginUser: (credentials) => Promise<LoginResult>,
  logoutUser: () => void,
} = useAuth()`;

  const useRequestCode = `const {
  data: T | null,               // Fetched data
  loading: boolean,             // Request in progress
  error: Error | null,          // Error if request failed
  refresh: () => void,          // Manually refresh data
} = useRequest<T>(
  api: AxiosInstance,           // API client
  endpoint: string,             // API endpoint
  params?: Record<string, any>  // Query parameters
)`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.useAuth}</h2>
      <p>{t.useAuthDesc}</p>
      <CodeBlock code={useAuthCode} language="tsx" />

      <h2>{t.useRequest}</h2>
      <p>{t.useRequestDesc}</p>
      <CodeBlock code={useRequestCode} language="tsx" />
    </article>
  );
}
