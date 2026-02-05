import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function ExampleLoginForm() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Login Form Example',
      subtitle: 'A complete login form implementation with error handling.',
    },
    pt: {
      title: 'Exemplo de Formulário de Login',
      subtitle: 'Uma implementação completa de formulário de login com tratamento de erros.',
    },
  };

  const t = content[language];

  const code = `import { useAuth } from '@forgepack/request'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function LoginPage() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const credentials = {
      email: form.get('email') as string,
      password: form.get('password') as string,
    }

    try {
      const result = await loginUser(credentials)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.errors?.join(', ') || 'Invalid credentials')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Sign In</h1>
        
        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>
      <CodeBlock code={code} language="tsx" filename="src/pages/LoginPage.tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/reference/utilities" className="docs-nav-link">
          <span className="docs-nav-label">Previous</span>
          <span className="docs-nav-title">Utilities API</span>
        </Link>
        <Link to="/docs/request/examples/dashboard" className="docs-nav-link next">
          <span className="docs-nav-label">Next</span>
          <span className="docs-nav-title">Dashboard Example</span>
        </Link>
      </nav>
    </article>
  );
}
