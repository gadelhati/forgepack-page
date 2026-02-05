import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';

export function TokenManagement() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Token Management',
      subtitle: 'Utilities for managing JWT tokens, validation, and payload decoding.',
      overview: 'Overview',
      overviewDesc: 'The token management utilities provide low-level access to JWT tokens stored in the browser. These are useful for advanced use cases where you need direct access to token data.',
      getToken: 'Getting the Token',
      getTokenDesc: 'Retrieve the stored authentication token:',
      validate: 'Validating Tokens',
      validateDesc: 'Check if the current token is valid and not expired:',
      decode: 'Decoding the Payload',
      decodeDesc: 'Access the decoded JWT payload data:',
      storage: 'Token Storage',
      storageDesc: 'Tokens are stored in localStorage with the following structure:',
      security: 'Security Considerations',
      securityList: [
        'Tokens are stored in localStorage - be aware of XSS vulnerabilities',
        'Implement proper HTTPS in production',
        'Use short token expiration times with refresh tokens',
        'Clear tokens on logout to prevent session hijacking',
      ],
      next: 'Next: Hooks API',
      prev: 'Previous: CRUD Operations',
    },
    pt: {
      title: 'Gerenciamento de Tokens',
      subtitle: 'Utilitários para gerenciar tokens JWT, validação e decodificação de payload.',
      overview: 'Visão Geral',
      overviewDesc: 'Os utilitários de gerenciamento de tokens fornecem acesso de baixo nível aos tokens JWT armazenados no navegador. Estes são úteis para casos de uso avançados onde você precisa de acesso direto aos dados do token.',
      getToken: 'Obtendo o Token',
      getTokenDesc: 'Recupere o token de autenticação armazenado:',
      validate: 'Validando Tokens',
      validateDesc: 'Verifique se o token atual é válido e não expirou:',
      decode: 'Decodificando o Payload',
      decodeDesc: 'Acesse os dados do payload JWT decodificado:',
      storage: 'Armazenamento de Token',
      storageDesc: 'Os tokens são armazenados no localStorage com a seguinte estrutura:',
      security: 'Considerações de Segurança',
      securityList: [
        'Tokens são armazenados no localStorage - esteja ciente de vulnerabilidades XSS',
        'Implemente HTTPS adequado em produção',
        'Use tempos de expiração curtos com refresh tokens',
        'Limpe os tokens no logout para prevenir sequestro de sessão',
      ],
      next: 'Próximo: API de Hooks',
      prev: 'Anterior: Operações CRUD',
    },
  };

  const t = content[language];

  const getTokenCode = `import { getToken } from '@forgepack/request'

// Get the complete token object
const auth = getToken()

if (auth) {
  console.log('Access Token:', auth.accessToken)
  console.log('Refresh Token:', auth.refreshToken)
  console.log('User Role:', auth.role)
  console.log('User ID:', auth.userId)
}

// Returns null if no token is stored
if (!auth) {
  console.log('User is not authenticated')
}`;

  const validateCode = `import { isValidToken } from '@forgepack/request'

// Check if a valid, non-expired token exists
if (isValidToken()) {
  console.log('User has a valid session')
  // Proceed with authenticated operations
} else {
  console.log('User needs to log in')
  // Redirect to login page
  window.location.href = '/login'
}

// Use in components
function AuthGuard({ children }) {
  if (!isValidToken()) {
    return <Navigate to="/login" />
  }
  return children
}`;

  const decodeCode = `import { getPayload } from '@forgepack/request'

// Get the decoded JWT payload
const payload = getPayload()

if (payload) {
  // Standard JWT claims
  console.log('Subject (User ID):', payload.sub)
  console.log('Issued At:', new Date(payload.iat * 1000))
  console.log('Expires At:', new Date(payload.exp * 1000))
  
  // Custom claims (depends on your backend)
  console.log('Username:', payload.username)
  console.log('Email:', payload.email)
  console.log('Roles:', payload.roles)
  
  // Check if token is expired
  const isExpired = payload.exp * 1000 < Date.now()
  console.log('Is Expired:', isExpired)
}`;

  const storageCode = `// Token structure stored in localStorage
interface StoredToken {
  accessToken: string    // The JWT access token
  refreshToken?: string  // Optional refresh token
  role: string          // User role (e.g., 'ADMIN', 'USER')
  userId: string        // User identifier
  expiresAt: number     // Token expiration timestamp
}

// Storage key
const STORAGE_KEY = 'auth_token'

// The package handles storage automatically, but you can:
// - Clear manually: localStorage.removeItem('auth_token')
// - Read manually: JSON.parse(localStorage.getItem('auth_token'))`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.overview}</h2>
      <p>{t.overviewDesc}</p>

      <h2>{t.getToken}</h2>
      <p>{t.getTokenDesc}</p>
      <CodeBlock code={getTokenCode} language="tsx" />

      <h2>{t.validate}</h2>
      <p>{t.validateDesc}</p>
      <CodeBlock code={validateCode} language="tsx" />

      <h2>{t.decode}</h2>
      <p>{t.decodeDesc}</p>
      <CodeBlock code={decodeCode} language="tsx" />

      <h2>{t.storage}</h2>
      <p>{t.storageDesc}</p>
      <CodeBlock code={storageCode} language="tsx" />

      <h2>{t.security}</h2>
      <ul>
        {t.securityList.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <nav className="docs-nav">
        <Link to="/docs/request/crud-operations" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/reference/hooks" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
