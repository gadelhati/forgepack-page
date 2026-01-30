import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function ApiTypes() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'TypeScript Types Reference',
      subtitle: 'Complete reference for all exported TypeScript types.',
    },
    pt: {
      title: 'Referência de Tipos TypeScript',
      subtitle: 'Referência completa para todos os tipos TypeScript exportados.',
    },
  };

  const t = content[language];

  const typesCode = `// Authentication types
interface LoginCredentials {
  email: string
  password: string
}

interface LoginResult {
  success: boolean
  errors?: string[]
}

interface AuthToken {
  accessToken: string
  refreshToken?: string
  role: string
  userId: string
  expiresAt: number
}

interface JwtPayload {
  sub: string          // Subject (user ID)
  iat: number          // Issued at (timestamp)
  exp: number          // Expiration (timestamp)
  username?: string
  email?: string
  roles?: string[]
  [key: string]: any   // Additional custom claims
}

// Pagination types
interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

interface PaginationParams {
  page?: number
  size?: number
  sort?: string
  [key: string]: any
}

// Request types
interface UseRequestResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refresh: () => void
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>
      <CodeBlock code={typesCode} language="tsx" />
    </article>
  );
}
