import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';

export function QuickStart() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Quick Start',
      subtitle: 'Get up and running with @forgepack/request in 5 minutes.',
      step1: 'Step 1: Install the Package',
      step2: 'Step 2: Create API Client',
      step2Desc: 'Create a configured Axios instance for your API:',
      step3: 'Step 3: Wrap with AuthProvider',
      step3Desc: 'Add the authentication context to your app:',
      step4: 'Step 4: Create a Login Form',
      step4Desc: 'Build a simple login form using the useAuth hook:',
      step5: 'Step 5: Protect Routes',
      step5Desc: 'Secure your dashboard and other pages:',
      step6: 'Step 6: Fetch Data',
      step6Desc: 'Use the CRUD functions to interact with your API:',
      done: "That's it!",
      doneDesc: 'You now have a fully functional authentication system with protected routes and data fetching. Explore the detailed guides to learn more about each feature.',
      next: 'Next: Authentication',
      prev: 'Previous: Installation',
    },
    pt: {
      title: 'Início Rápido',
      subtitle: 'Configure @forgepack/request em 5 minutos.',
      step1: 'Passo 1: Instalar o Pacote',
      step2: 'Passo 2: Criar Cliente API',
      step2Desc: 'Crie uma instância Axios configurada para sua API:',
      step3: 'Passo 3: Envolver com AuthProvider',
      step3Desc: 'Adicione o contexto de autenticação ao seu app:',
      step4: 'Passo 4: Criar um Formulário de Login',
      step4Desc: 'Construa um formulário de login simples usando o hook useAuth:',
      step5: 'Passo 5: Proteger Rotas',
      step5Desc: 'Proteja seu dashboard e outras páginas:',
      step6: 'Passo 6: Buscar Dados',
      step6Desc: 'Use as funções CRUD para interagir com sua API:',
      done: 'Pronto!',
      doneDesc: 'Agora você tem um sistema de autenticação totalmente funcional com rotas protegidas e busca de dados. Explore os guias detalhados para aprender mais sobre cada recurso.',
      next: 'Próximo: Autenticação',
      prev: 'Anterior: Instalação',
    },
  };

  const t = content[language];

  const installCode = `npm install @forgepack/request`;

  const apiClientCode = `// src/api/client.ts
import { createApiClient } from '@forgepack/request'

export const api = createApiClient({
  baseURL: "https://api.yourservice.com",
  onUnauthorized: () => window.location.href = "/login",
  onForbidden: () => window.location.href = "/forbidden"
})`;

  const appCode = `// src/App.tsx
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@forgepack/request'
import { api } from './api/client'
import { AppRoutes } from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider api={api}>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}`;

  const loginCode = `// src/pages/Login.tsx
import { useAuth } from '@forgepack/request'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    
    const result = await loginUser({
      email: form.get('email') as string,
      password: form.get('password') as string,
    })

    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}`;

  const routesCode = `// src/routes.tsx
import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from '@forgepack/request'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/dashboard" element={
        <RequireAuth allowedRoles={['USER', 'ADMIN']}>
          <Dashboard />
        </RequireAuth>
      } />
      
      <Route path="/admin" element={
        <RequireAuth allowedRoles={['ADMIN']}>
          <AdminPanel />
        </RequireAuth>
      } />
    </Routes>
  )
}`;

  const fetchCode = `// src/pages/Dashboard.tsx
import { retrieve } from '@forgepack/request'
import { api } from '../api/client'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

export function Dashboard() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loadUsers() {
      const data = await retrieve<User[]>(api, 'users')
      setUsers(data || [])
    }
    loadUsers()
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.step1}</h2>
      <CodeBlock code={installCode} language="bash" />

      <h2>{t.step2}</h2>
      <p>{t.step2Desc}</p>
      <CodeBlock code={apiClientCode} language="tsx" filename="src/api/client.ts" />

      <h2>{t.step3}</h2>
      <p>{t.step3Desc}</p>
      <CodeBlock code={appCode} language="tsx" filename="src/App.tsx" />

      <h2>{t.step4}</h2>
      <p>{t.step4Desc}</p>
      <CodeBlock code={loginCode} language="tsx" filename="src/pages/Login.tsx" />

      <h2>{t.step5}</h2>
      <p>{t.step5Desc}</p>
      <CodeBlock code={routesCode} language="tsx" filename="src/routes.tsx" />

      <h2>{t.step6}</h2>
      <p>{t.step6Desc}</p>
      <CodeBlock code={fetchCode} language="tsx" filename="src/pages/Dashboard.tsx" />

      <h2>{t.done}</h2>
      <p>{t.doneDesc}</p>

      <nav className="docs-nav">
        <Link to="/docs/request/getting-started" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/authentication" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
