import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function LeafletGettingStarted() {
  const { language } = useLanguage();

  const installationCode = `# npm
npm install @forgepack/leaflet leaflet

# yarn
yarn add @forgepack/leaflet leaflet

# pnpm
pnpm add @forgepack/leaflet leaflet`;

  const dependenciesCode = `# Required peer dependencies
npm install react react-dom leaflet

# TypeScript users also need
npm install --save-dev @types/leaflet`;

  const basicMapCode = `import React from 'react';
import { MapContainer, TileLayer } from '@forgepack/leaflet';
import 'leaflet/dist/leaflet.css';

export function BasicMap() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}`;

  const providerCode = `// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MapProvider } from '@forgepack/leaflet';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <MapProvider>
        <AppRoutes />
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;`;

  const nextjsCode = `// pages/_app.tsx
import type { AppProps } from 'next/app';
import { MapProvider } from '@forgepack/leaflet';
import 'leaflet/dist/leaflet.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  );
}`;

  const viteCode = `// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MapProvider } from '@forgepack/leaflet';
import App from './App.tsx';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MapProvider>
        <App />
      </MapProvider>
    </BrowserRouter>
  </React.StrictMode>,
);`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Installation and Setup' : 'Instalação e Configuração'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Learn how to install and configure @forgepack/leaflet in your React application.'
            : 'Aprenda como instalar e configurar @forgepack/leaflet em sua aplicação React.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? '📦 Installation' : '📦 Instalação'}</h2>
        <CodeBlock language="bash" code={installationCode} />
      </section>

      <section>
        <h2>{language === 'en' ? '📋 Dependencies' : '📋 Dependências'}</h2>
        <p>
          {language === 'en' 
            ? 'The package requires these peer dependencies:'
            : 'O pacote requer estas dependências peer:'
          }
        </p>
        <CodeBlock language="bash" code={dependenciesCode} />
      </section>

      <section>
        <h2>{language === 'en' ? '⚙️ Initial Setup' : '⚙️ Configuração Inicial'}</h2>
        
        <h3>{language === 'en' ? '1. Basic Map Component' : '1. Componente de Mapa Básico'}</h3>
        <p>
          {language === 'en' 
            ? 'Start with the simplest implementation:'
            : 'Comece com a implementação mais simples:'
          }
        </p>
        <CodeBlock language="tsx" code={basicMapCode} />

        <div className="callout callout-info">
          <h4>💡 {language === 'en' ? 'Important Note' : 'Nota Importante'}</h4>
          <p>
            {language === 'en' 
              ? "Don't forget to import the Leaflet CSS file. Without it, the map will not display properly."
              : 'Não esqueça de importar o arquivo CSS do Leaflet. Sem ele, o mapa não será exibido corretamente.'
            }
          </p>
        </div>

        <h3>{language === 'en' ? '2. Map Provider' : '2. Provedor de Mapa'}</h3>
        <p>
          {language === 'en' 
            ? 'Configure the MapProvider at the root of your application for advanced features:'
            : 'Configure o MapProvider na raiz da sua aplicação para recursos avançados:'
          }
        </p>
        <CodeBlock language="tsx" code={providerCode} />

        <h3>{language === 'en' ? '3. Configuration for Next.js' : '3. Configuração para Next.js'}</h3>
        <CodeBlock language="tsx" code={nextjsCode} />

        <h3>{language === 'en' ? '4. Configuration for Vite' : '4. Configuração para Vite'}</h3>
        <CodeBlock language="tsx" code={viteCode} />
      </section>

      <section>
        <h2>{language === 'en' ? '🔧 Configuration Options' : '🔧 Opções de Configuração'}</h2>
        <p>
          {language === 'en' 
            ? 'The MapProvider accepts several configuration options:'
            : 'O MapProvider aceita várias opções de configuração:'
          }
        </p>
        
        <CodeBlock 
          language="tsx" 
          code={`<MapProvider
  defaultCenter={[51.505, -0.09]}
  defaultZoom={13}
  enableGeolocation={true}
  enableDrawing={true}
  enableLayerControl={true}
  theme="light" // or "dark"
>
  <App />
</MapProvider>`} 
        />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Option' : 'Opção'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>defaultCenter</code></td>
                <td><code>[number, number]</code></td>
                <td><code>[0, 0]</code></td>
                <td>{language === 'en' ? 'Default map center coordinates' : 'Coordenadas do centro padrão do mapa'}</td>
              </tr>
              <tr>
                <td><code>defaultZoom</code></td>
                <td><code>number</code></td>
                <td><code>2</code></td>
                <td>{language === 'en' ? 'Default zoom level' : 'Nível de zoom padrão'}</td>
              </tr>
              <tr>
                <td><code>enableGeolocation</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{language === 'en' ? 'Enable geolocation features' : 'Habilitar recursos de geolocalização'}</td>
              </tr>
              <tr>
                <td><code>enableDrawing</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{language === 'en' ? 'Enable drawing tools' : 'Habilitar ferramentas de desenho'}</td>
              </tr>
              <tr>
                <td><code>enableLayerControl</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>{language === 'en' ? 'Enable layer control panel' : 'Habilitar painel de controle de camadas'}</td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td><code>'light' | 'dark'</code></td>
                <td><code>'light'</code></td>
                <td>{language === 'en' ? 'Map theme' : 'Tema do mapa'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '✅ Verification' : '✅ Verificação'}</h2>
        <p>
          {language === 'en' 
            ? 'To verify your installation is working correctly, create a simple test component:'
            : 'Para verificar se sua instalação está funcionando corretamente, crie um componente de teste simples:'
          }
        </p>
        
        <CodeBlock 
          language="tsx" 
          code={`import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from '@forgepack/leaflet';

export function TestMap() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          Hello from @forgepack/leaflet! 🗺️
        </Popup>
      </Marker>
    </MapContainer>
  );
}`} 
        />

        <div className="callout callout-success">
          <h4>🎉 {language === 'en' ? 'Success!' : 'Sucesso!'}</h4>
          <p>
            {language === 'en' 
              ? 'If you can see an interactive map with a marker and popup, your installation is complete!'
              : 'Se você conseguir ver um mapa interativo com um marcador e popup, sua instalação está completa!'
            }
          </p>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🚀 Next Steps' : '🚀 Próximos Passos'}</h2>
        <ul>
          <li>
            <a href="/docs/leaflet/quick-start">
              {language === 'en' ? 'Quick Start Guide' : 'Guia de Início Rápido'}
            </a> - 
            {language === 'en' 
              ? ' Learn the basics of creating interactive maps'
              : ' Aprenda o básico sobre criar mapas interativos'
            }
          </li>
          <li>
            <a href="/docs/leaflet/examples/basic-map">
              {language === 'en' ? 'Basic Map Example' : 'Exemplo de Mapa Básico'}
            </a> - 
            {language === 'en' 
              ? ' See a complete working example'
              : ' Veja um exemplo completo funcionando'
            }
          </li>
          <li>
            <a href="/docs/leaflet/api/components">
              {language === 'en' ? 'API Reference' : 'Referência da API'}
            </a> - 
            {language === 'en' 
              ? ' Explore all available components and props'
              : ' Explore todos os componentes e propriedades disponíveis'
            }
          </li>
        </ul>
      </section>
    </div>
  );
}