import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function GettingStarted() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Getting Started',
      subtitle: 'Learn how to install and configure @forgepack/request in your React project.',
      prereq: 'Prerequisites',
      prereqDesc: 'Before you begin, make sure your project meets these requirements:',
      prereqList: [
        'React 18+ with React Router DOM 6+',
        'TypeScript (recommended but not required)',
        'A backend API with JWT authentication',
      ],
      installation: 'Installation',
      installDesc: 'Install the package using your preferred package manager:',
      peerDeps: 'Peer Dependencies',
      peerDepsDesc: 'These packages are required and will be installed automatically:',
      setup: 'Basic Setup',
      setupStep1: 'Step 1: Create the API Client',
      setupStep1Desc: 'Create a file to configure your API client with the base URL and error handlers:',
      setupStep2: 'Step 2: Configure the Auth Provider',
      setupStep2Desc: 'Wrap your application with the AuthProvider to enable authentication context:',
      setupStep3: 'Step 3: Use in Components',
      setupStep3Desc: 'Now you can use the authentication hooks in any component:',
      next: 'Next: Quick Start',
      prev: 'Previous: Overview',
    },
    pt: {
      title: 'Primeiros Passos',
      subtitle: 'Aprenda como instalar e configurar @forgepack/request no seu projeto React.',
      prereq: 'Pré-requisitos',
      prereqDesc: 'Antes de começar, certifique-se de que seu projeto atende a estes requisitos:',
      prereqList: [
        'React 18+ com React Router DOM 6+',
        'TypeScript (recomendado mas não obrigatório)',
        'Uma API backend com autenticação JWT',
      ],
      installation: 'Instalação',
      installDesc: 'Instale o pacote usando seu gerenciador de pacotes preferido:',
      peerDeps: 'Dependências de Pares',
      peerDepsDesc: 'Estes pacotes são necessários e serão instalados automaticamente:',
      setup: 'Configuração Básica',
      setupStep1: 'Passo 1: Criar o Cliente API',
      setupStep1Desc: 'Crie um arquivo para configurar seu cliente API com a URL base e handlers de erro:',
      setupStep2: 'Passo 2: Configurar o Auth Provider',
      setupStep2Desc: 'Envolva sua aplicação com o AuthProvider para habilitar o contexto de autenticação:',
      setupStep3: 'Passo 3: Usar nos Componentes',
      setupStep3Desc: 'Agora você pode usar os hooks de autenticação em qualquer componente:',
      next: 'Próximo: Início Rápido',
      prev: 'Anterior: Visão Geral',
    },
  };

  const t = content[language];

  const installCode = `npm install @forgepack/request

# or with yarn
yarn add @forgepack/request

# or with pnpm  
pnpm add @forgepack/request`;

  const apiClientCode = `// src/api/client.ts
import { createApiClient } from '@forgepack/request'

export const api = createApiClient({
  baseURL: "https://api.yourservice.com",
  
  // Called when token expires (401)
  onUnauthorized: () => {
    window.location.href = "/login"
  },
  
  // Called when user lacks permission (403)
  onForbidden: () => {
    window.location.href = "/not-allowed"
  }
})`;

  const authProviderCode = `// src/App.tsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@forgepack/request'
import { api } from './api/client'
import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider api={api}>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App`;

  const useAuthCode = `// src/pages/LoginPage.tsx
import { useAuth } from '@forgepack/request'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await loginUser({ email, password })
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      console.error('Login failed:', result.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.prereq}</h2>
      <p>{t.prereqDesc}</p>
      <ul>
        {t.prereqList.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t.installation}</h2>
      <p>{t.installDesc}</p>
      <CodeBlock code={installCode} language="bash" />

      <h2>{t.setup}</h2>

      <h3>{t.setupStep1}</h3>
      <p>{t.setupStep1Desc}</p>
      <CodeBlock code={apiClientCode} language="tsx" filename="src/api/client.ts" />

      <h3>{t.setupStep2}</h3>
      <p>{t.setupStep2Desc}</p>
      <CodeBlock code={authProviderCode} language="tsx" filename="src/App.tsx" />

      <h3>{t.setupStep3}</h3>
      <p>{t.setupStep3Desc}</p>
      <CodeBlock code={useAuthCode} language="tsx" filename="src/pages/LoginPage.tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/quick-start" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
