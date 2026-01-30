import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function CrudOperations() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'CRUD Operations',
      subtitle: 'Standardized create, read, update, and delete operations for your REST API.',
      overview: 'Overview',
      overviewDesc: 'The CRUD functions provide a consistent interface for interacting with your REST API. All functions handle authentication automatically and return typed responses.',
      functions: 'Available Functions',
      create: 'Create',
      createDesc: 'Create a new resource:',
      retrieve: 'Retrieve',
      retrieveDesc: 'Fetch resources with optional pagination:',
      update: 'Update',
      updateDesc: 'Update an existing resource:',
      remove: 'Remove',
      removeDesc: 'Delete a resource by ID:',
      pagination: 'Pagination',
      paginationDesc: 'The retrieve function supports pagination parameters:',
      next: 'Next: Token Management',
      prev: 'Previous: Requests',
    },
    pt: {
      title: 'Operações CRUD',
      subtitle: 'Operações padronizadas de criar, ler, atualizar e deletar para sua API REST.',
      overview: 'Visão Geral',
      overviewDesc: 'As funções CRUD fornecem uma interface consistente para interagir com sua API REST. Todas as funções gerenciam autenticação automaticamente e retornam respostas tipadas.',
      functions: 'Funções Disponíveis',
      create: 'Criar',
      createDesc: 'Criar um novo recurso:',
      retrieve: 'Recuperar',
      retrieveDesc: 'Buscar recursos com paginação opcional:',
      update: 'Atualizar',
      updateDesc: 'Atualizar um recurso existente:',
      remove: 'Remover',
      removeDesc: 'Deletar um recurso pelo ID:',
      pagination: 'Paginação',
      paginationDesc: 'A função retrieve suporta parâmetros de paginação:',
      next: 'Próximo: Gerenciamento de Tokens',
      prev: 'Anterior: Requisições',
    },
  };

  const t = content[language];

  const overviewCode = `import { create, retrieve, update, remove } from '@forgepack/request'
import { api } from './api/client'

// All functions follow the same pattern:
// functionName(apiClient, endpoint, data?, options?)`;

  const createCode = `import { create } from '@forgepack/request'
import { api } from './api/client'

interface User {
  id: string
  name: string
  email: string
}

// Create a new user
const newUser = await create<User>(api, 'users', {
  name: 'John Doe',
  email: 'john@example.com'
})

if (newUser) {
  console.log('Created user:', newUser.id)
}`;

  const retrieveCode = `import { retrieve } from '@forgepack/request'
import { api } from './api/client'

// Retrieve all users
const allUsers = await retrieve(api, 'users')

// Retrieve a single user by ID
const user = await retrieve(api, 'users/123')

// Retrieve with pagination
const page = await retrieve(api, 'users', {
  page: 0,
  size: 10
})

// Retrieve with filters
const filtered = await retrieve(api, 'users', {
  role: 'admin',
  status: 'active'
})`;

  const updateCode = `import { update } from '@forgepack/request'
import { api } from './api/client'

// Update a user
const updatedUser = await update(api, 'users', {
  id: '123',
  name: 'John Smith',
  email: 'johnsmith@example.com'
})

// The update function uses PUT by default
// The id field determines which resource to update`;

  const removeCode = `import { remove } from '@forgepack/request'
import { api } from './api/client'

// Delete a user by ID
await remove(api, 'users', '123')

// Delete returns void on success
// Throws an error if the deletion fails`;

  const paginationCode = `import { retrieve } from '@forgepack/request'
import { api } from './api/client'

interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number  // current page
  first: boolean
  last: boolean
}

// Fetch page 0 with 20 items per page
const result = await retrieve<PaginatedResponse<User>>(api, 'users', {
  page: 0,
  size: 20,
  sort: 'createdAt,desc'  // optional sorting
})

console.log('Total users:', result.totalElements)
console.log('Current page:', result.number)
console.log('Users on this page:', result.content)`;

  return (
    <article>
      <h1>{t.title}</h1>
      <p className="docs-subtitle">{t.subtitle}</p>

      <h2>{t.overview}</h2>
      <p>{t.overviewDesc}</p>
      <CodeBlock code={overviewCode} language="tsx" />

      <h2>{t.create}</h2>
      <p>{t.createDesc}</p>
      <CodeBlock code={createCode} language="tsx" />

      <h2>{t.retrieve}</h2>
      <p>{t.retrieveDesc}</p>
      <CodeBlock code={retrieveCode} language="tsx" />

      <h2>{t.update}</h2>
      <p>{t.updateDesc}</p>
      <CodeBlock code={updateCode} language="tsx" />

      <h2>{t.remove}</h2>
      <p>{t.removeDesc}</p>
      <CodeBlock code={removeCode} language="tsx" />

      <h2>{t.pagination}</h2>
      <p>{t.paginationDesc}</p>
      <CodeBlock code={paginationCode} language="tsx" />

      <nav className="docs-nav">
        <Link to="/docs/request/requests" className="docs-nav-link">
          <span className="docs-nav-label">{t.prev.split(':')[0]}</span>
          <span className="docs-nav-title">{t.prev.split(':')[1]}</span>
        </Link>
        <Link to="/docs/request/token-management" className="docs-nav-link next">
          <span className="docs-nav-label">{t.next.split(':')[0]}</span>
          <span className="docs-nav-title">{t.next.split(':')[1]}</span>
        </Link>
      </nav>
    </article>
  );
}
