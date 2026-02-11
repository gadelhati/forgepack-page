import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '../../../components/DocsNavigation';

export function LeafletOverview() {
  const { language } = useLanguage();

  const installationCode = `# npm
npm install @forgepack/leaflet leaflet

# yarn
yarn add @forgepack/leaflet leaflet

# pnpm
pnpm add @forgepack/leaflet leaflet

# Required peer dependencies
npm install react react-dom leaflet

# TypeScript users also need
npm install --save-dev @types/leaflet`;

  const basicUsageCode = `// src/App.tsx
import React from 'react'
import { Map } from '@forgepack/leaflet'

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map />
    </div>
  )
}

export default App`;

  return (
    <div className="docs-content">
      <header>
        <h1>@forgepack/leaflet</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Complete documentation for the React Leaflet components library for interactive map visualization and geospatial data management.'
            : 'Documentação completa para a biblioteca de componentes React Leaflet para visualização interativa de mapas e gerenciamento de dados geoespaciais.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? '🚀 Main Features' : '🚀 Principais Recursos'}</h2>
        <ul>
          <li>🗺️ {language === 'en' ? 'Interactive Maps - Full-featured Leaflet integration with React' : 'Mapas Interativos - Integração completa do Leaflet com React'}</li>
          <li>📍 {language === 'en' ? 'Layer Management - Create, toggle, and manage map layers' : 'Gerenciamento de Camadas - Criar, alternar e gerenciar camadas do mapa'}</li>
          <li>🎨 {language === 'en' ? 'Interactive Drawing - Point-and-click route creation with real-time preview' : 'Desenho Interativo - Criação de rotas por clique com pré-visualização em tempo real'}</li>
          <li>📁 {language === 'en' ? 'File Processing - Support for coordinate files and georeferenced images' : 'Processamento de Arquivos - Suporte para arquivos de coordenadas e imagens georreferenciadas'}</li>
          <li>📏 {language === 'en' ? 'Distance Calculation - Automatic distance labeling for routes (nautical miles)' : 'Cálculo de Distância - Rotulagem automática de distância para rotas (milhas náuticas)'}</li>
          <li>🖼️ {language === 'en' ? 'Image Overlays - Georeferenced image overlay support' : 'Sobreposições de Imagem - Suporte para sobreposições de imagens georreferenciadas'}</li>
          <li>🧭 {language === 'en' ? 'Navigation Tools - Maritime and nautical chart support' : 'Ferramentas de Navegação - Suporte para cartas marítimas e náuticas'}</li>
          <li>⚡ {language === 'en' ? 'TypeScript Support - Full type safety and IntelliSense' : 'Suporte ao TypeScript - Segurança de tipos completa e IntelliSense'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? '💡 Package Philosophy' : '💡 Filosofia do Pacote'}</h2>
        <p>
          {language === 'en' 
            ? 'This package was developed specifically for maritime and geospatial applications that need:'
            : 'Este pacote foi desenvolvido especificamente para aplicações marítimas e geoespaciais que precisam de:'
          }
        </p>
        <ol>
          <li>{language === 'en' ? 'Interactive map visualization with Leaflet integration' : 'Visualização interativa de mapas com integração do Leaflet'}</li>
          <li>{language === 'en' ? 'Coordinate-based layer creation from text files' : 'Criação de camadas baseada em coordenadas a partir de arquivos de texto'}</li>
          <li>{language === 'en' ? 'Real-time route drawing with distance calculations' : 'Desenho de rotas em tempo real com cálculos de distância'}</li>
          <li>{language === 'en' ? 'Image overlay management for charts and nautical data' : 'Gerenciamento de sobreposições de imagem para cartas e dados náuticos'}</li>
          <li>{language === 'en' ? 'Layer organization with visual cards and controls' : 'Organização de camadas com cartões visuais e controles'}</li>
          <li>{language === 'en' ? 'Maritime-focused features like nautical mile calculations' : 'Recursos focados em marítimo como cálculos de milhas náuticas'}</li>
        </ol>
      </section>

      <section>
        <h2>{language === 'en' ? '🎯 Ideal Use Cases' : '🎯 Casos de Uso Ideais'}</h2>
        <ul>
          <li>{language === 'en' ? 'Maritime navigation applications' : 'Aplicações de navegação marítima'}</li>
          <li>{language === 'en' ? 'Hydrographic data visualization' : 'Visualização de dados hidrográficos'}</li>
          <li>{language === 'en' ? 'Nautical chart management systems' : 'Sistemas de gerenciamento de cartas náuticas'}</li>
          <li>{language === 'en' ? 'Oceanographic monitoring dashboards' : 'Painéis de monitoramento oceanográfico'}</li>
          <li>{language === 'en' ? 'Geospatial analysis tools' : 'Ferramentas de análise geoespacial'}</li>
          <li>{language === 'en' ? 'Interactive mapping applications' : 'Aplicações de mapeamento interativo'}</li>
          <li>{language === 'en' ? 'Route planning and navigation systems' : 'Sistemas de planejamento de rotas e navegação'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? '🌊 Maritime Features' : '🌊 Recursos Marítimos'}</h2>
        <ul>
          <li><strong>{language === 'en' ? 'Nautical Charts' : 'Cartas Náuticas'}:</strong> {language === 'en' ? 'Support for nautical chart overlays' : 'Suporte para sobreposições de cartas náuticas'}</li>
          <li><strong>{language === 'en' ? 'Navigation' : 'Navegação'}:</strong> {language === 'en' ? 'Route planning with ETA calculations' : 'Planejamento de rotas com cálculos de ETA'}</li>
          <li><strong>{language === 'en' ? 'Hydrography' : 'Hidrografia'}:</strong> {language === 'en' ? 'Tide stations and maritime data visualization' : 'Estações de maré e visualização de dados marítimos'}</li>
          <li><strong>{language === 'en' ? 'Lighthouse Management' : 'Gerenciamento de Faróis'}:</strong> {language === 'en' ? 'Maritime infrastructure mapping' : 'Mapeamento de infraestrutura marítima'}</li>
          <li><strong>{language === 'en' ? 'Distance Calculations' : 'Cálculos de Distância'}:</strong> {language === 'en' ? 'Precise nautical mile measurements' : 'Medições precisas de milhas náuticas'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? '📦 Installation' : '📦 Instalação'}</h2>
        <CodeBlock code={installationCode} language="bash" />
      </section>

      <section>
        <h2>{language === 'en' ? '🚀 Quick Start' : '🚀 Início Rápido'}</h2>
        <CodeBlock code={basicUsageCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? '📋 Prerequisites' : '📋 Pré-requisitos'}</h2>
        <ul>
          <li>React 18+</li>
          <li>Leaflet 1.9+</li>
          <li>TypeScript ({language === 'en' ? 'recommended' : 'recomendado'})</li>
          <li>{language === 'en' ? 'Modern bundler (Vite, Webpack, etc.)' : 'Bundler moderno (Vite, Webpack, etc.)'}</li>
        </ul>
      </section>

      <DocsNavigation />

      <footer className="docs-footer">
        <p>
          {language === 'en' 
            ? 'Built with ❤️ for the maritime and geospatial community'
            : 'Construído com ❤️ para a comunidade marítima e geoespacial'
          }
        </p>
      </footer>
    </div>
  );
}