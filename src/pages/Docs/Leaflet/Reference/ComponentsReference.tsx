import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '@/components/DocsNavigation/DocsNavigation';

export function ComponentsReference() {
  const { language } = useLanguage();

  const mapUsageCode = `import React from 'react'
import { Map } from '@forgepack/leaflet'

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map />
    </div>
  )
}`;

  const cardUsageCode = `import React from 'react'
import { Card, useMap } from '@forgepack/leaflet'

function LayerManager() {
  const { map, layers, toggleFromMap } = useMap()
  
  return (
    <Card 
      map={map}
      layers={layers}
      toggleFromMap={toggleFromMap}
    />
  )
}`;

  const cardPropsCode = `interface CardProps {
  map: L.Map           // The Leaflet map instance
  layers: L.Layer[]    // Array of map layers to display in cards
  toggleFromMap: (feature: L.Layer) => void  // Function to toggle layer visibility
}`;

  const menuUsageCode = `import React from 'react'
import { Menu, useMap } from '@forgepack/leaflet'

function MapControls() {
  const { 
    startDrawingRoute, 
    finishDrawingRoute, 
    cancelDrawingRoute, 
    isDrawingRoute 
  } = useMap()
  
  return (
    <Menu 
      startDrawingRoute={startDrawingRoute}
      finishDrawingRoute={finishDrawingRoute}
      cancelDrawingRoute={cancelDrawingRoute}
      isDrawingRoute={isDrawingRoute}
    />
  )
}`;

  const menuPropsCode = `interface MenuProps {
  startDrawingRoute: () => void     // Function to start interactive route drawing
  finishDrawingRoute: () => void    // Function to complete route drawing
  cancelDrawingRoute: () => void    // Function to cancel route drawing
  isDrawingRoute: boolean           // Whether route drawing mode is active
}`;

  const handleInputFileUsageCode = `import React from 'react'
import { HandleInputFile, useMap } from '@forgepack/leaflet'

function FileUploader() {
  const { 
    map, 
    addMarkers, 
    addPolyline, 
    addPolygon, 
    addOverlay, 
    toggleFromMap 
  } = useMap()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <input 
      type="file" 
      onChange={handleFileChange}
      accept=".txt,.jpg,.jpeg,.png,.gif"
      multiple
    />
  )
}`;

  const handleInputFilePropsCode = `interface InputProps {
  event: ChangeEvent<HTMLInputElement>                          // File input change event
  map: L.Map                                                    // Leaflet map instance
  toggleFromMap: (feature: L.FeatureGroup) => void            // Function to add/remove layers
  addMarkers?: (points: L.LatLng[]) => L.FeatureGroup         // Optional marker creation function
  addPolygon?: (points: L.LatLng[]) => L.FeatureGroup         // Optional polygon creation function
  addPolyline?: (points: L.LatLng[]) => L.FeatureGroup        // Optional polyline creation function
  addOverlay?: (sw: L.LatLngExpression, ne: L.LatLngExpression, file: File) => L.FeatureGroup  // Optional overlay function
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Components API Reference' : 'Referência da API dos Componentes'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'The components module provides React components for interactive map visualization and layer management using Leaflet.'
            : 'O módulo de componentes fornece componentes React para visualização interativa de mapas e gerenciamento de camadas usando Leaflet.'
          }
        </p>
      </header>

      <section>
        <h2>Map</h2>
        <p>
          {language === 'en' 
            ? 'Main map component that orchestrates all map-related functionality.'
            : 'Componente principal do mapa que orquestra toda a funcionalidade relacionada ao mapa.'
          }
        </p>
        
        <h3>{language === 'en' ? 'Usage' : 'Uso'}</h3>
        <CodeBlock code={mapUsageCode} language="tsx" />

        <h3>{language === 'en' ? 'Features' : 'Recursos'}</h3>
        <ul>
          <li>{language === 'en' ? 'Renders the map container' : 'Renderiza o contêiner do mapa'}</li>
          <li>{language === 'en' ? 'Integrates the map hook for map management' : 'Integra o hook do mapa para gerenciamento'}</li>
          <li>{language === 'en' ? 'Displays layer management cards' : 'Exibe cartões de gerenciamento de camadas'}</li>
          <li>{language === 'en' ? 'Shows the control menu' : 'Mostra o menu de controle'}</li>
          <li>{language === 'en' ? 'Handles route drawing with visual feedback' : 'Lida com o desenho de rotas com feedback visual'}</li>
        </ul>
      </section>

      <section>
        <h2>Card</h2>
        <p>
          {language === 'en' 
            ? 'Card component for displaying and managing map layers with visual interface for layer management.'
            : 'Componente de cartão para exibir e gerenciar camadas do mapa com interface visual para gerenciamento de camadas.'
          }
        </p>

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <CodeBlock code={cardPropsCode} language="tsx" />

        <h3>{language === 'en' ? 'Usage' : 'Uso'}</h3>
        <CodeBlock code={cardUsageCode} language="tsx" />

        <h3>{language === 'en' ? 'Features' : 'Recursos'}</h3>
        <ul>
          <li>{language === 'en' ? 'Visual representation of active map layers' : 'Representação visual das camadas ativas do mapa'}</li>
          <li>{language === 'en' ? 'Remove functionality for individual layers' : 'Funcionalidade de remoção para camadas individuais'}</li>
          <li>{language === 'en' ? 'Automatic layer card generation' : 'Geração automática de cartões de camada'}</li>
          <li>{language === 'en' ? 'Integrated with map layer management' : 'Integrado com o gerenciamento de camadas do mapa'}</li>
        </ul>
      </section>

      <section>
        <h2>Menu</h2>
        <p>
          {language === 'en' 
            ? 'Menu component providing controls for map interaction and route drawing functionality.'
            : 'Componente de menu que fornece controles para interação do mapa e funcionalidade de desenho de rotas.'
          }
        </p>

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <CodeBlock code={menuPropsCode} language="tsx" />

        <h3>{language === 'en' ? 'Usage' : 'Uso'}</h3>
        <CodeBlock code={menuUsageCode} language="tsx" />

        <h3>{language === 'en' ? 'Features' : 'Recursos'}</h3>
        <ul>
          <li>{language === 'en' ? 'Interactive route drawing controls' : 'Controles interativos de desenho de rotas'}</li>
          <li>{language === 'en' ? 'Start/finish/cancel route drawing modes' : 'Modos de iniciar/finalizar/cancelar desenho de rotas'}</li>
          <li>{language === 'en' ? 'Visual feedback for drawing state' : 'Feedback visual para o estado de desenho'}</li>
          <li>{language === 'en' ? 'Integration with map interaction' : 'Integração com interação do mapa'}</li>
        </ul>
      </section>

      <section>
        <h2>HandleInputFile</h2>
        <p>
          {language === 'en' 
            ? 'Utility function for processing coordinate files and creating map layers from uploaded files.'
            : 'Função utilitária para processar arquivos de coordenadas e criar camadas do mapa a partir de arquivos enviados.'
          }
        </p>

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <CodeBlock code={handleInputFilePropsCode} language="tsx" />

        <h3>{language === 'en' ? 'Usage' : 'Uso'}</h3>
        <CodeBlock code={handleInputFileUsageCode} language="tsx" />

        <h3>{language === 'en' ? 'Supported File Types' : 'Tipos de Arquivo Suportados'}</h3>
        <ol>
          <li>
            <strong>{language === 'en' ? 'Image overlays' : 'Sobreposições de imagem'}:</strong> 
            {language === 'en' 
              ? ' Files named with pattern "swLat_swLng_neLat_neLng.ext" are treated as georeferenced images'
              : ' Arquivos nomeados com padrão "swLat_swLng_neLat_neLng.ext" são tratados como imagens georreferenciadas'
            }
          </li>
          <li>
            <strong>{language === 'en' ? 'Coordinate files' : 'Arquivos de coordenadas'}:</strong> 
            {language === 'en' 
              ? ' Text files containing lat/lng coordinates (space-separated, one per line)'
              : ' Arquivos de texto contendo coordenadas lat/lng (separadas por espaço, uma por linha)'
            }
          </li>
        </ol>

        <h3>{language === 'en' ? 'Features' : 'Recursos'}</h3>
        <ul>
          <li>{language === 'en' ? 'Automatic file type detection' : 'Detecção automática do tipo de arquivo'}</li>
          <li>{language === 'en' ? 'Georeferenced image overlay support' : 'Suporte para sobreposições de imagens georreferenciadas'}</li>
          <li>{language === 'en' ? 'Coordinate file parsing for markers, polygons, and polylines' : 'Análise de arquivos de coordenadas para marcadores, polígonos e polilinhas'}</li>
          <li>{language === 'en' ? 'Integration with map layer management' : 'Integração com gerenciamento de camadas do mapa'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'File Format Examples' : 'Exemplos de Formato de Arquivo'}</h2>
        
        <h3>{language === 'en' ? 'Georeferenced Image Naming' : 'Nomenclatura de Imagem Georreferenciada'}</h3>
        <CodeBlock code="swLat_swLng_neLat_neLng.jpg
Example: -23.1_-43.5_-22.8_-43.0.png" language="text" />

        <h3>{language === 'en' ? 'Coordinate File Format' : 'Formato de Arquivo de Coordenadas'}</h3>
        <CodeBlock code="-22.8956 -43.1844
-23.9608 -46.3081
-20.3155 -40.2872" language="text" />
      </section>

      <DocsNavigation />
    </div>
  );
}