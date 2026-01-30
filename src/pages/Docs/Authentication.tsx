import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function Authentication() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Authentication',
      subtitle: 'Complete guide to implementing JWT authentication with @forgepack/request.',
      overview: 'Overview',
      overviewDesc: 'The authentication system provides a complete solution for JWT-based authentication in React applications. It handles token storage, automatic refresh, and provides hooks for managing user sessions.',
      useAuth: 'The useAuth Hook',
      useAuthDesc: 'The useAuth hook provides all the authentication functionality you need:',
      login: 'Login',
      loginDesc: 'To authenticate a user, use the loginUser function:',
      logout: 'Logout',
      logoutDesc: 'To log out the current user:',
      checkAuth: 'Checking Authentication Status',
      checkAuthDesc: 'You can check if a user is authenticated using the isAuthenticated property:',
      tokenInfo: 'Token Information',
      tokenInfoDesc: 'Access the current user information from the decoded JWT:',
      next: 'Next: Route Protection',
      prev: 'Previous: Quick Start',
    },
    pt: {
      title: 'Autenticação',
      subtitle: 'Guia completo para implementar autenticação JWT com @forgepack/request.',
      overview: 'Visão Geral',
      overviewDesc: 'O sistema de autenticação fornece uma solução completa para autenticação baseada em JWT em aplicações React. Ele gerencia armazenamento de tokens, refresh automático e fornece hooks para gerenciar sessões de usuário.',
      useAuth: 'O Hook useAuth',
      useAuthDesc: 'O hook useAuth fornece toda a funcionalidade de autenticação que você precisa:',
      login: 'Login',
      loginDesc: 'Para autenticar um usuário, use a função loginUser:',
      logout: 'Logout',
      logoutDesc: 'Para fazer logout do usuário atual:',
      checkAuth: 'Verificando Status de Autenticação',
      checkAuthDesc: 'Você pode verificar se um usuário está autenticado usando a propriedade isAuthenticated:',
      tokenInfo: 'Informações do Token',
      tokenInfoDesc: 'Acesse as informações do usuário atual a partir do JWT decodificado:',
      next: 'Próximo: Proteção de Rotas',
      prev: 'Anterior: Início Rápido',
    },
  };

  const t = content[language];

  const useAuthCode = `import { useAuth } from '@forgepack/request'

function MyComponent() {
  const {
    isAuthenticated,  // boolean - is user logged in?
    user,             // object - current user data
    loginUser,        // function - authenticate user
    logoutUser,       // function - end user session
    loading,          // boolean - auth state loading?
  } = useAuth()
  
  // Use these in your component...
}`;

  const loginCode = `import { useAuth } from '@forgepack/request'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setError('')
    
    const result = await loginUser(credentials)
    
    if (result.success) {
      // User is now authenticated
      navigate('/dashboard')
    } else {
      // Handle login errors
      setError(result.errors?.join(', ') || 'Login failed')
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleLogin({
        email: e.target.email.value,
        password: e.target.password.value
      })
    }}>
      {error && <div className="error">{error}</div>}
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}`;

  const logoutCode = `import { useAuth } from '@forgepack/request'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const { logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}`;

  const checkAuthCode = `import { useAuth } from '@forgepack/request'

function Header() {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user?.name}</span>
          <LogoutButton />
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  )
}`;

  const tokenInfoCode = `import { getToken, getPayload, isValidToken } from '@forgepack/request'

// Check if token exists and is valid
if (isValidToken()) {
  console.log('User is authenticated')
}

// Get the raw token data
const auth = getToken()
console.log(auth.accessToken)  // JWT string
console.log(auth.role)         // User role

// Decode the JWT payload
const payload = getPayload()
console.log('User ID:', payload.sub)
console.log('Username:', payload.username)
console.log('Expires at:', new Date(payload.exp * 1000))`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.overview}</h2>
      <p>{t.overviewDesc}</p>

      <h2>{t.useAuth}</h2>
      <p>{t.useAuthDesc}</p>
      <CodeBlock code={useAuthCode} language="tsx" />

      <h2>{t.login}</h2>
      <p>{t.loginDesc}</p>
      <CodeBlock code={loginCode} language="tsx" filename="LoginForm.tsx" />

      <h2>{t.logout}</h2>
      <p>{t.logoutDesc}</p>
      <CodeBlock code={logoutCode} language="tsx" />

      <h2>{t.checkAuth}</h2>
      <p>{t.checkAuthDesc}</p>
      <CodeBlock code={checkAuthCode} language="tsx" />

      <h2>{t.tokenInfo}</h2>
      <p>{t.tokenInfoDesc}</p>
      <CodeBlock code={tokenInfoCode} language="tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/quick-start" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/route-protection" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
