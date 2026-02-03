import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function LeafletOverview() {
  const { language } = useLanguage();

  const installationCode = `# npm
npm install @forgepack/leaflet leaflet

# yarn
yarn add @forgepack/leaflet leaflet

# pnpm
pnpm add @forgepack/leaflet leaflet`;

  const basicUsageCode = `import React from 'react';
import { MapContainer } from '@forgepack/leaflet';

export function App() {
  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Your map layers and components */}
      </MapContainer>
    </div>
  );
}`;

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
          <li>
            <strong>🗺️ {language === 'en' ? 'Interactive Maps' : 'Mapas Interativos'}</strong> - 
            {language === 'en' 
              ? ' Full-featured Leaflet integration with React'
              : ' Integração completa do Leaflet com React'
            }
          </li>
          <li>
            <strong>📍 {language === 'en' ? 'Layer Management' : 'Gerenciamento de Camadas'}</strong> - 
            {language === 'en' 
              ? ' Create, toggle, and manage map layers'
              : ' Crie, alterne e gerencie camadas de mapa'
            }
          </li>
          <li>
            <strong>🎨 {language === 'en' ? 'Interactive Drawing' : 'Desenho Interativo'}</strong> - 
            {language === 'en' 
              ? ' Point-and-click route creation with real-time preview'
              : ' Criação de rotas por clique com visualização em tempo real'
            }
          </li>
          <li>
            <strong>📁 {language === 'en' ? 'File Processing' : 'Processamento de Arquivos'}</strong> - 
            {language === 'en' 
              ? ' Support for coordinate files and georeferenced images'
              : ' Suporte para arquivos de coordenadas e imagens georreferenciadas'
            }
          </li>
          <li>
            <strong>📏 {language === 'en' ? 'Distance Calculation' : 'Cálculo de Distância'}</strong> - 
            {language === 'en' 
              ? ' Automatic distance labeling for routes (nautical miles)'
              : ' Rotulagem automática de distância para rotas (milhas náuticas)'
            }
          </li>
          <li>
            <strong>🖼️ {language === 'en' ? 'Image Overlays' : 'Sobreposições de Imagem'}</strong> - 
            {language === 'en' 
              ? ' Georeferenced image overlay support'
              : ' Suporte para sobreposições de imagem georreferenciadas'
            }
          </li>
          <li>
            <strong>🧭 {language === 'en' ? 'Navigation Tools' : 'Ferramentas de Navegação'}</strong> - 
            {language === 'en' 
              ? ' Maritime and nautical chart support'
              : ' Suporte para cartas marítimas e náuticas'
            }
          </li>
          <li>
            <strong>⚡ {language === 'en' ? 'TypeScript Support' : 'Suporte TypeScript'}</strong> - 
            {language === 'en' 
              ? ' Full type safety and IntelliSense'
              : ' Tipagem completa e IntelliSense'
            }
          </li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? '🎯 Ideal Use Cases' : '🎯 Casos de Uso Ideais'}</h2>
        <ul>
          <li>{language === 'en' ? 'Maritime navigation applications' : 'Aplicações de navegação marítima'}</li>
          <li>{language === 'en' ? 'Hydrographic data visualization' : 'Visualização de dados hidrográficos'}</li>
          <li>{language === 'en' ? 'Nautical chart management systems' : 'Sistemas de gerenciamento de cartas náuticas'}</li>
          <li>{language === 'en' ? 'Oceanographic monitoring dashboards' : 'Dashboards de monitoramento oceanográfico'}</li>
          <li>{language === 'en' ? 'Geospatial analysis tools' : 'Ferramentas de análise geoespacial'}</li>
          <li>{language === 'en' ? 'Interactive mapping applications' : 'Aplicações de mapeamento interativo'}</li>
          <li>{language === 'en' ? 'Route planning and navigation systems' : 'Sistemas de planejamento de rotas e navegação'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? '🌊 Maritime Features' : '🌊 Recursos Marítimos'}</h2>
        <ul>
          <li>
            <strong>{language === 'en' ? 'Nautical Charts' : 'Cartas Náuticas'}:</strong> 
            {language === 'en' 
              ? ' Support for nautical chart overlays'
              : ' Suporte para sobreposições de cartas náuticas'
            }
          </li>
          <li>
            <strong>{language === 'en' ? 'Navigation' : 'Navegação'}:</strong> 
            {language === 'en' 
              ? ' Route planning with ETA calculations'
              : ' Planejamento de rotas com cálculos de ETA'
            }
          </li>
          <li>
            <strong>{language === 'en' ? 'Hydrography' : 'Hidrografia'}:</strong> 
            {language === 'en' 
              ? ' Tide stations and maritime data visualization'
              : ' Estações de maré e visualização de dados marítimos'
            }
          </li>
          <li>
            <strong>{language === 'en' ? 'Lighthouse Management' : 'Gerenciamento de Faróis'}:</strong> 
            {language === 'en' 
              ? ' Maritime infrastructure mapping'
              : ' Mapeamento de infraestrutura marítima'
            }
          </li>
          <li>
            <strong>{language === 'en' ? 'Distance Calculations' : 'Cálculos de Distância'}:</strong> 
            {language === 'en' 
              ? ' Precise nautical mile measurements'
              : ' Medições precisas de milhas náuticas'
            }
          </li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? '📦 Installation' : '📦 Instalação'}</h2>
        <CodeBlock language="bash" code={installationCode} />
        <p>
          {language === 'en' 
            ? 'The package requires these peer dependencies:'
            : 'O pacote requer estas dependências peer:'
          }
        </p>
        <CodeBlock 
          language="bash" 
          code={`# Required peer dependencies
npm install react react-dom leaflet

# TypeScript users also need
npm install --save-dev @types/leaflet`} 
        />
      </section>

      <section>
        <h2>{language === 'en' ? '⚡ Quick Start' : '⚡ Início Rápido'}</h2>
        <p>
          {language === 'en' 
            ? 'Get started with a basic map in just a few lines of code:'
            : 'Comece com um mapa básico em apenas algumas linhas de código:'
          }
        </p>
        <CodeBlock language="tsx" code={basicUsageCode} />
      </section>

      <section>
        <h2>{language === 'en' ? '📚 Next Steps' : '📚 Próximos Passos'}</h2>
        <div className="grid">
          <Link to="/docs/leaflet/getting-started" className="card">
            <h3>{language === 'en' ? '🚀 Getting Started' : '🚀 Primeiros Passos'}</h3>
            <p>
              {language === 'en' 
                ? 'Learn how to install and set up your first interactive map'
                : 'Aprenda como instalar e configurar seu primeiro mapa interativo'
              }
            </p>
          </Link>

          <Link to="/docs/leaflet/examples/basic-map" className="card">
            <h3>{language === 'en' ? '📋 Examples' : '📋 Exemplos'}</h3>
            <p>
              {language === 'en' 
                ? 'Explore practical examples and common use cases'
                : 'Explore exemplos práticos e casos de uso comuns'
              }
            </p>
          </Link>

          <Link to="/docs/leaflet/api/components" className="card">
            <h3>{language === 'en' ? '🔧 API Reference' : '🔧 Referência da API'}</h3>
            <p>
              {language === 'en' 
                ? 'Complete documentation of all components and hooks'
                : 'Documentação completa de todos os componentes e hooks'
              }
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}