export type Language = 'en' | 'pt';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      docs: 'Documentation',
      packages: 'Packages',
      github: 'GitHub',
      getStarted: 'Get Started',
    },
    // Hero
    hero: {
      badge: 'Open Source',
      title: 'Build faster with',
      titleHighlight: 'Forgepack',
      description: 'Production-ready packages for React and Spring Boot. Eliminate boilerplate, accelerate development, and ship with confidence.',
      cta: 'Get Started',
      secondary: 'View on GitHub',
    },
    // Features
    features: {
      title: 'Why Forgepack?',
      subtitle: 'Enterprise-grade packages designed for modern development workflows.',
      items: [
        {
          icon: '🔐',
          title: 'JWT Authentication',
          description: 'Complete authentication system with automatic token refresh and interceptors.',
        },
        {
          icon: '🛡️',
          title: 'Route Protection',
          description: 'Role-based access control with the RequireAuth component.',
        },
        {
          icon: '📊',
          title: 'Smart Requests',
          description: 'useRequest hook with built-in pagination, loading, and error states.',
        },
        {
          icon: '⚡',
          title: 'CRUD Operations',
          description: 'Standardized create, read, update, delete operations out of the box.',
        },
        {
          icon: '🔑',
          title: 'Token Management',
          description: 'Secure token storage with automatic validation and decoding.',
        },
        {
          icon: '📦',
          title: 'TypeScript First',
          description: 'Full type safety with comprehensive TypeScript definitions.',
        },
      ],
    },
    // Packages
    packages: {
      title: 'Packages',
      subtitle: 'Our growing ecosystem of production-ready packages.',
      npm: 'NPM Packages',
      maven: 'Maven Packages',
      viewDocs: 'View Docs',
      comingSoon: 'Coming Soon',
    },
    // Sidebar
    sidebar: {
      gettingStarted: 'Getting Started',
      installation: 'Installation',
      quickStart: 'Quick Start',
      guides: 'Guides',
      authentication: 'Authentication',
      routeProtection: 'Route Protection',
      requests: 'Requests & Pagination',
      crudOperations: 'CRUD Operations',
      tokenManagement: 'Token Management',
      apiReference: 'API Reference',
      hooks: 'Hooks',
      components: 'Components',
      services: 'Services',
      types: 'TypeScript Types',
      utilities: 'Utilities',
      examples: 'Examples',
      loginForm: 'Login Form',
      dashboard: 'Dashboard',
      usersList: 'Users List',
    },
    // Footer
    footer: {
      description: 'Production-ready packages for modern web development.',
      resources: 'Resources',
      documentation: 'Documentation',
      examples: 'Examples',
      changelog: 'Changelog',
      community: 'Community',
      twitter: 'Twitter',
      discord: 'Discord',
      legal: 'Legal',
      license: 'MIT License',
      copyright: '© 2024 Forgepack. All rights reserved.',
    },
    // Docs
    docs: {
      onThisPage: 'On this page',
      editPage: 'Edit this page',
      nextPage: 'Next',
      prevPage: 'Previous',
    },
  },
  pt: {
    // Navigation
    nav: {
      home: 'Início',
      docs: 'Documentação',
      packages: 'Pacotes',
      github: 'GitHub',
      getStarted: 'Começar',
    },
    // Hero
    hero: {
      badge: 'Código Aberto',
      title: 'Construa mais rápido com',
      titleHighlight: 'Forgepack',
      description: 'Pacotes prontos para produção para React e Spring Boot. Elimine código repetitivo, acelere o desenvolvimento e entregue com confiança.',
      cta: 'Começar',
      secondary: 'Ver no GitHub',
    },
    // Features
    features: {
      title: 'Por que Forgepack?',
      subtitle: 'Pacotes de nível empresarial projetados para fluxos de desenvolvimento modernos.',
      items: [
        {
          icon: '🔐',
          title: 'Autenticação JWT',
          description: 'Sistema completo de autenticação com refresh automático de tokens e interceptadores.',
        },
        {
          icon: '🛡️',
          title: 'Proteção de Rotas',
          description: 'Controle de acesso baseado em funções com o componente RequireAuth.',
        },
        {
          icon: '📊',
          title: 'Requisições Inteligentes',
          description: 'Hook useRequest com paginação, loading e estados de erro integrados.',
        },
        {
          icon: '⚡',
          title: 'Operações CRUD',
          description: 'Operações padronizadas de criar, ler, atualizar e deletar prontas para uso.',
        },
        {
          icon: '🔑',
          title: 'Gerenciamento de Tokens',
          description: 'Armazenamento seguro de tokens com validação e decodificação automáticas.',
        },
        {
          icon: '📦',
          title: 'TypeScript Primeiro',
          description: 'Tipagem completa com definições TypeScript abrangentes.',
        },
      ],
    },
    // Packages
    packages: {
      title: 'Pacotes',
      subtitle: 'Nosso ecossistema crescente de pacotes prontos para produção.',
      npm: 'Pacotes NPM',
      maven: 'Pacotes Maven',
      viewDocs: 'Ver Docs',
      comingSoon: 'Em Breve',
    },
    // Sidebar
    sidebar: {
      gettingStarted: 'Primeiros Passos',
      installation: 'Instalação',
      quickStart: 'Início Rápido',
      guides: 'Guias',
      authentication: 'Autenticação',
      routeProtection: 'Proteção de Rotas',
      requests: 'Requisições e Paginação',
      crudOperations: 'Operações CRUD',
      tokenManagement: 'Gerenciamento de Tokens',
      apiReference: 'Referência da API',
      hooks: 'Hooks',
      components: 'Componentes',
      services: 'Serviços',
      types: 'Tipos TypeScript',
      utilities: 'Utilitários',
      examples: 'Exemplos',
      loginForm: 'Formulário de Login',
      dashboard: 'Dashboard',
      usersList: 'Lista de Usuários',
    },
    // Footer
    footer: {
      description: 'Pacotes prontos para produção para desenvolvimento web moderno.',
      resources: 'Recursos',
      documentation: 'Documentação',
      examples: 'Exemplos',
      changelog: 'Changelog',
      community: 'Comunidade',
      twitter: 'Twitter',
      discord: 'Discord',
      legal: 'Legal',
      license: 'Licença MIT',
      copyright: '© 2024 Forgepack. Todos os direitos reservados.',
    },
    // Docs
    docs: {
      onThisPage: 'Nesta página',
      editPage: 'Editar esta página',
      nextPage: 'Próximo',
      prevPage: 'Anterior',
    },
  },
};

export type Translations = typeof translations.en;
