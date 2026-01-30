import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function ExampleUsersList() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Users List Example',
      subtitle: 'A paginated list with CRUD operations.',
    },
    pt: {
      title: 'Exemplo de Lista de Usuários',
      subtitle: 'Uma lista paginada com operações CRUD.',
    },
  };

  const t = content[language];

  const code = `import { useRequest, create, update, remove } from '@forgepack/request'
import { api } from '../api/client'
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface PaginatedUsers {
  content: User[]
  totalPages: number
  number: number
}

export function UsersList() {
  const [page, setPage] = useState(0)
  const { data, loading, refresh } = useRequest<PaginatedUsers>(
    api, 'users', { page, size: 10 }
  )

  const handleCreate = async () => {
    const name = prompt('Enter user name:')
    const email = prompt('Enter user email:')
    
    if (name && email) {
      await create(api, 'users', { name, email })
      refresh()
    }
  }

  const handleUpdate = async (user: User) => {
    const name = prompt('Enter new name:', user.name)
    
    if (name) {
      await update(api, 'users', { ...user, name })
      refresh()
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await remove(api, 'users', id)
      refresh()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="users-list">
      <header>
        <h1>Users</h1>
        <button onClick={handleCreate}>Add User</button>
      </header>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.content.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleUpdate(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          onClick={() => setPage(p => p - 1)} 
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
    </div>
  )
}`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>
      <CodeBlock code={code} language="tsx" filename="src/pages/UsersList.tsx" />
    </article>
  );
}
