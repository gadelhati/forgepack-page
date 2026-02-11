import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '../../../components/DocsNavigation';

export function GettingStarted() {
  const { language } = useLanguage();

  const installationCode = `# npm
npm install @forgepack/leaflet leaflet

# yarn
yarn add @forgepack/leaflet leaflet

# pnpm
pnpm add @forgepack/leaflet leaflet`;

  const peerDependenciesCode = `# Required peer dependencies
npm install react react-dom leaflet

# TypeScript users also need
npm install --save-dev @types/leaflet`;

  const basicMapCode = `// src/App.tsx
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

  const mapHookCode = `// src/MapComponent.tsx
import React, { useEffect } from 'react'
import { Map, useMap } from '@forgepack/leaflet'
import * as L from 'leaflet'

function MapComponent() {
  const { 
    map, 
    layers, 
    addMarkers, 
    addPolyline, 
    toggleFromMap,
    startDrawingRoute,
    finishDrawingRoute 
  } = useMap()

  useEffect(() => {
    if (map) {
      // Add some initial markers
      const points = [
        L.latLng(-22.8156, -43.1078),
        L.latLng(-22.9068, -43.1729)
      ]
      const markerLayer = addMarkers(points)
      toggleFromMap(markerLayer)
    }
  }, [map])

  return (
    <div style={{ height: '500px', position: 'relative' }}>
      <Map />
    </div>
  )
}

export default MapComponent`;

  const fileHandlerCode = `// src/FileHandler.tsx
import React from 'react'
import { HandleInputFile } from '@forgepack/leaflet'
import { useMap } from '@forgepack/leaflet'

function FileHandler() {
  const { 
    map, 
    addMarkers, 
    addPolyline, 
    addPolygon, 
    addOverlay, 
    toggleFromMap 
  } = useMap()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (map) {
      HandleInputFile({
        event,
        map,
        toggleFromMap,
        addMarkers,
        addPolyline,
        addPolygon,
        addOverlay
      })
    }
  }

  return (
    <input 
      type="file" 
      onChange={handleFileChange}
      accept=".txt,.jpg,.jpeg,.png,.gif"
      multiple
    />
  )
}`;

  const completeExampleCode = `// src/CompleteMap.tsx
import React from 'react'
import { Map, Card, Menu } from '@forgepack/leaflet'
import { useMap } from '@forgepack/leaflet'

function CompleteMap() {
  const { 
    map, 
    layers, 
    toggleFromMap,
    startDrawingRoute,
    finishDrawingRoute,
    cancelDrawingRoute,
    isDrawingRoute 
  } = useMap()

  return (
    <div className="map-container">
      <Map />
      <Card 
        map={map} 
        layers={layers} 
        toggleFromMap={toggleFromMap} 
      />
      <Menu 
        startDrawingRoute={startDrawingRoute}
        finishDrawingRoute={finishDrawingRoute}
        cancelDrawingRoute={cancelDrawingRoute}
        isDrawingRoute={isDrawingRoute}
      />
    </div>
  )
}

export default CompleteMap`;

  const stylingCode = `// These are imported automatically when you import from '@forgepack/leaflet'
import "leaflet/dist/leaflet.css"
import "./styles/card.css"
import "./styles/index.css"
import "./styles/map.css"
import "./styles/menu.css"
import "./styles/useMap.css"`;

  const mapContainerCSS = `.map-container {
  height: 400px; /* Required! */
  width: 100%;
}`;

  const typeScriptInstallCode = `npm install --save-dev @types/leaflet`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Installation and Setup' : 'Instalação e Configuração'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Complete guide to get started with @forgepack/leaflet in your React application.'
            : 'Guia completo para começar com @forgepack/leaflet em sua aplicação React.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? '📦 Installation' : '📦 Instalação'}</h2>
        <CodeBlock code={installationCode} language="bash" />
      </section>

      <section>
        <h2>{language === 'en' ? '📋 Dependencies' : '📋 Dependências'}</h2>
        <p>
          {language === 'en' 
            ? 'The package requires these peer dependencies:'
            : 'O pacote requer essas dependências:'
          }
        </p>
        <CodeBlock code={peerDependenciesCode} language="bash" />
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
        <CodeBlock code={basicMapCode} language="tsx" filename="BasicMap.tsx" />

        <h3>{language === 'en' ? '2. Using the Map Hook' : '2. Usando o Hook do Mapa'}</h3>
        <p>
          {language === 'en' 
            ? 'For more control over the map functionality:'
            : 'Para ter mais controle sobre a funcionalidade do mapa:'
          }
        </p>
        <CodeBlock code={mapHookCode} language="tsx" filename="MapWithHook.tsx" />

        <h3>{language === 'en' ? '3. File Input for Coordinate Data' : '3. Entrada de Arquivo para Dados de Coordenadas'}</h3>
        <p>
          {language === 'en' 
            ? 'Handle coordinate files and image overlays:'
            : 'Manipule arquivos de coordenadas e sobreposições de imagem:'
          }
        </p>
        <CodeBlock code={fileHandlerCode} language="tsx" filename="FileHandler.tsx" />

        <h3>{language === 'en' ? '4. Complete Example with All Components' : '4. Exemplo Completo com Todos os Componentes'}</h3>
        <CodeBlock code={completeExampleCode} language="tsx" filename="CompleteMap.tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? '🎨 Styling' : '🎨 Estilização'}</h2>
        <p>
          {language === 'en' 
            ? 'The package automatically imports the required CSS files:'
            : 'O pacote importa automaticamente os arquivos CSS necessários:'
          }
        </p>
        <CodeBlock code={stylingCode} language="javascript" />
        <p>
          {language === 'en' 
            ? 'You can override the default styles by adding your own CSS classes or using CSS modules.'
            : 'Você pode substituir os estilos padrão adicionando suas próprias classes CSS ou usando módulos CSS.'
          }
        </p>
      </section>

      <section>
        <h2>{language === 'en' ? '🔧 Common Issues' : '🔧 Problemas Comuns'}</h2>
        
        <h3>{language === 'en' ? 'Map not showing' : 'Mapa não aparecendo'}</h3>
        <p>
          {language === 'en' 
            ? 'Ensure Leaflet CSS is properly imported and the map container has a defined height:'
            : 'Certifique-se de que o CSS do Leaflet está devidamente importado e que o contêiner do mapa tem uma altura definida:'
          }
        </p>
        <CodeBlock code={mapContainerCSS} language="css" filename="map-styles.css" />

        <h3>{language === 'en' ? 'TypeScript errors' : 'Erros do TypeScript'}</h3>
        <p>
          {language === 'en' 
            ? 'Make sure to install the Leaflet type definitions:'
            : 'Certifique-se de instalar as definições de tipo do Leaflet:'
          }
        </p>
        <CodeBlock code={typeScriptInstallCode} language="bash" />
      </section>

      <nav className="docs-nav">
        <Link to="/docs/leaflet" className="docs-nav-link">
          <span className="docs-nav-label">{language === 'en' ? 'Previous' : 'Anterior'}</span>
          <span className="docs-nav-title">{language === 'en' ? 'Overview' : 'Visão Geral'}</span>
        </Link>
        <Link to="/docs/leaflet/examples/basic-map" className="docs-nav-link next">
          <span className="docs-nav-label">{language === 'en' ? 'Next' : 'Próximo'}</span>
          <span className="docs-nav-title">{language === 'en' ? 'Basic Map Examples' : 'Exemplos de Mapas Básicos'}</span>
        </Link>
      </nav>

      <DocsNavigation />
    </div>
  );
}