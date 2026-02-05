import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function ExampleDashboard() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Dashboard Example',
      subtitle: 'A protected dashboard with data fetching and user info.',
    },
    pt: {
      title: 'Exemplo de Dashboard',
      subtitle: 'Um dashboard protegido com busca de dados e informações do usuário.',
    },
  };

  const t = content[language];

  const code = `import { useAuth, useRequest } from '@forgepack/request'
import { api } from '../api/client'
import { useNavigate } from 'react-router-dom'

interface Stats {
  totalUsers: number
  activeUsers: number
  revenue: number
}

export function Dashboard() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const { data: stats, loading } = useRequest<Stats>(api, 'dashboard/stats')

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-content">
        {loading ? (
          <div className="loading">Loading stats...</div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats?.totalUsers}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats?.activeUsers}</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">\${stats?.revenue}</span>
              <span className="stat-label">Revenue</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>
      <CodeBlock code={code} language="tsx" filename="src/pages/Dashboard.tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/examples/login-form" className="docs-nav-link">
          <span className="docs-nav-label">Previous</span>
          <span className="docs-nav-title">Login Form Example</span>
        </Link>
        <Link to="/docs/request/examples/users-list" className="docs-nav-link next">
          <span className="docs-nav-label">Next</span>
          <span className="docs-nav-title">Users List Example</span>
        </Link>
      </nav>
    </article>
  );
}
