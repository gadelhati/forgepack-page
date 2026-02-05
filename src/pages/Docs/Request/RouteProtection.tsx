import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';

export function RouteProtection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Route Protection',
      subtitle: 'Secure your routes with role-based access control using the RequireAuth component.',
      overview: 'Overview',
      overviewDesc: 'The RequireAuth component protects routes based on authentication status and user roles. It automatically redirects unauthorized users and handles loading states.',
      basicUsage: 'Basic Usage',
      basicUsageDesc: 'Wrap any route with RequireAuth to require authentication:',
      roleBased: 'Role-Based Protection',
      roleBasedDesc: 'Restrict routes to specific user roles:',
      redirect: 'Custom Redirects',
      redirectDesc: 'Configure where unauthenticated users are redirected:',
      nested: 'Nested Routes',
      nestedDesc: 'Protect entire sections of your application:',
      next: 'Next: Requests',
      prev: 'Previous: Authentication',
    },
    pt: {
      title: 'Proteção de Rotas',
      subtitle: 'Proteja suas rotas com controle de acesso baseado em funções usando o componente RequireAuth.',
      overview: 'Visão Geral',
      overviewDesc: 'O componente RequireAuth protege rotas com base no status de autenticação e funções do usuário. Ele redireciona automaticamente usuários não autorizados e gerencia estados de carregamento.',
      basicUsage: 'Uso Básico',
      basicUsageDesc: 'Envolva qualquer rota com RequireAuth para exigir autenticação:',
      roleBased: 'Proteção Baseada em Funções',
      roleBasedDesc: 'Restrinja rotas para funções específicas de usuário:',
      redirect: 'Redirecionamentos Personalizados',
      redirectDesc: 'Configure para onde usuários não autenticados são redirecionados:',
      nested: 'Rotas Aninhadas',
      nestedDesc: 'Proteja seções inteiras da sua aplicação:',
      next: 'Próximo: Requisições',
      prev: 'Anterior: Autenticação',
    },
  };

  const t = content[language];

  const basicUsageCode = `import { RequireAuth } from '@forgepack/request'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Public routes - no authentication required */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected route - requires authentication */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } 
      />
    </Routes>
  )
}`;

  const roleBasedCode = `import { RequireAuth } from '@forgepack/request'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Any authenticated user can access */}
      <Route 
        path="/profile" 
        element={
          <RequireAuth allowedRoles={['USER', 'ADMIN', 'MODERATOR']}>
            <ProfilePage />
          </RequireAuth>
        } 
      />
      
      {/* Only users with USER or ADMIN role */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAuth allowedRoles={['USER', 'ADMIN']}>
            <Dashboard />
          </RequireAuth>
        } 
      />
      
      {/* Admin-only section */}
      <Route 
        path="/admin/*" 
        element={
          <RequireAuth allowedRoles={['ADMIN']}>
            <AdminPanel />
          </RequireAuth>
        } 
      />
    </Routes>
  )
}`;

  const redirectCode = `import { RequireAuth } from '@forgepack/request'

// Default: redirects to /login
<RequireAuth>
  <ProtectedComponent />
</RequireAuth>

// Custom redirect path
<RequireAuth redirectTo="/auth/signin">
  <ProtectedComponent />
</RequireAuth>

// Redirect with return URL
<RequireAuth redirectTo="/login?returnTo=/dashboard">
  <Dashboard />
</RequireAuth>`;

  const nestedCode = `import { RequireAuth } from '@forgepack/request'
import { Route, Routes, Outlet } from 'react-router-dom'

// Protected layout component
function ProtectedLayout() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </RequireAuth>
  )
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* All admin routes are protected */}
      <Route element={<ProtectedLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.overview}</h2>
      <p>{t.overviewDesc}</p>

      <h2>{t.basicUsage}</h2>
      <p>{t.basicUsageDesc}</p>
      <CodeBlock code={basicUsageCode} language="tsx" filename="App.tsx" />

      <h2>{t.roleBased}</h2>
      <p>{t.roleBasedDesc}</p>
      <CodeBlock code={roleBasedCode} language="tsx" />

      <h2>{t.redirect}</h2>
      <p>{t.redirectDesc}</p>
      <CodeBlock code={redirectCode} language="tsx" />

      <h2>{t.nested}</h2>
      <p>{t.nestedDesc}</p>
      <CodeBlock code={nestedCode} language="tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/authentication" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/requests" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
