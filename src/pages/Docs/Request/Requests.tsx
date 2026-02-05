import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';

export function Requests() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Requests & Pagination',
      subtitle: 'Use the useRequest hook for reactive data fetching with built-in pagination.',
      overview: 'Overview',
      overviewDesc: 'The useRequest hook provides a complete solution for fetching data with automatic state management, pagination, and search functionality.',
      basicUsage: 'Basic Usage',
      basicUsageDesc: 'Fetch data with automatic loading and error states:',
      pagination: 'Pagination',
      paginationDesc: 'Handle paginated API responses:',
      search: 'Search & Filtering',
      searchDesc: 'Add search functionality with debouncing:',
      refresh: 'Manual Refresh',
      refreshDesc: 'Trigger data refresh programmatically:',
      next: 'Next: CRUD Operations',
      prev: 'Previous: Route Protection',
    },
    pt: {
      title: 'Requisições e Paginação',
      subtitle: 'Use o hook useRequest para busca de dados reativa com paginação integrada.',
      overview: 'Visão Geral',
      overviewDesc: 'O hook useRequest fornece uma solução completa para buscar dados com gerenciamento automático de estado, paginação e funcionalidade de busca.',
      basicUsage: 'Uso Básico',
      basicUsageDesc: 'Busque dados com estados de loading e erro automáticos:',
      pagination: 'Paginação',
      paginationDesc: 'Gerencie respostas de API paginadas:',
      search: 'Busca e Filtragem',
      searchDesc: 'Adicione funcionalidade de busca com debouncing:',
      refresh: 'Atualização Manual',
      refreshDesc: 'Dispare atualização de dados programaticamente:',
      next: 'Próximo: Operações CRUD',
      prev: 'Anterior: Proteção de Rotas',
    },
  };

  const t = content[language];

  const basicUsageCode = `import { useRequest } from '@forgepack/request'
import { api } from '../api/client'

interface User {
  id: string
  name: string
  email: string
}

function UsersList() {
  const { data, loading, error } = useRequest<User[]>(api, 'users')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`;

  const paginationCode = `import { useRequest } from '@forgepack/request'
import { api } from '../api/client'
import { useState } from 'react'

interface PaginatedResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  number: number
}

function PaginatedUsersList() {
  const [page, setPage] = useState(0)
  const [size] = useState(10)

  const { data, loading } = useRequest<PaginatedResponse<User>>(
    api, 
    'users',
    { page, size }
  )

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul>
            {data?.content.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
          
          <div className="pagination">
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </button>
            
            <span>Page {page + 1} of {data?.totalPages}</span>
            
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= (data?.totalPages || 1) - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}`;

  const searchCode = `import { useRequest } from '@forgepack/request'
import { api } from '../api/client'
import { useState, useMemo } from 'react'

function SearchableUsersList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)

  // Debounce search term
  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout
    return (value: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setSearchTerm(value)
        setPage(0) // Reset to first page on search
      }, 300)
    }
  }, [])

  const { data, loading } = useRequest(api, 'users', {
    page,
    size: 10,
    search: searchTerm,
  })

  return (
    <div>
      <input
        type="search"
        placeholder="Search users..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.content.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}`;

  const refreshCode = `import { useRequest } from '@forgepack/request'
import { api } from '../api/client'

function UsersListWithRefresh() {
  const { data, loading, refresh } = useRequest(api, 'users')

  const handleAddUser = async () => {
    // After adding a user, refresh the list
    await createUser({ name: 'New User' })
    refresh()
  }

  return (
    <div>
      <button onClick={refresh} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      
      <button onClick={handleAddUser}>Add User</button>
      
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
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
      <CodeBlock code={basicUsageCode} language="tsx" />

      <h2>{t.pagination}</h2>
      <p>{t.paginationDesc}</p>
      <CodeBlock code={paginationCode} language="tsx" />

      <h2>{t.search}</h2>
      <p>{t.searchDesc}</p>
      <CodeBlock code={searchCode} language="tsx" />

      <h2>{t.refresh}</h2>
      <p>{t.refreshDesc}</p>
      <CodeBlock code={refreshCode} language="tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/route-protection" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/crud-operations" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
