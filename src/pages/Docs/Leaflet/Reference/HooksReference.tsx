import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '@/components/DocsNavigation/DocsNavigation';

export function HooksReference() {
  const { language } = useLanguage();

  const returnInterfaceCode = `interface UseMapReturn {
  map: L.Map | undefined                        // The initialized Leaflet map instance, undefined during initialization
  layers: L.FeatureGroup[]                      // Array of feature groups representing map layers
  createLayer: (elements: L.Layer[]) => L.FeatureGroup          // Function to create a new feature group from an array of layers
  addMarkers: (points: L.LatLng[]) => L.FeatureGroup           // Function to create marker layers from coordinate points
  addPolygon: (points: L.LatLng[]) => L.FeatureGroup           // Function to create polygon layers from coordinate points
  addPolyline: (points: L.LatLng[]) => L.FeatureGroup          // Function to create polyline layers with distance annotations
  addOverlay: (sw: L.LatLngExpression, ne: L.LatLngExpression, file: File) => L.FeatureGroup  // Function to create image overlay layers
  toggleFromMap: (layer: L.Layer) => void      // Function to toggle layer visibility on the map
  startDrawingRoute: () => void                 // Function to start interactive route drawing mode
  finishDrawingRoute: () => L.FeatureGroup | null  // Function to complete route drawing and create the final layer
  cancelDrawingRoute: () => void                // Function to cancel route drawing mode
  isDrawingRoute: boolean                       // Whether route drawing mode is currently active
  routePoints: L.LatLng[]                      // Array of points in the current route being drawn
}`;

  const basicUsageCode = `import React, { useEffect } from 'react'
import { useMap } from '@forgepack/leaflet'
import * as L from 'leaflet'

function MapComponent() {
  const { map, addMarkers, toggleFromMap } = useMap()

  useEffect(() => {
    if (map) {
      // Add some initial markers when map is ready
      const points = [
        L.latLng(-22.8156, -43.1078), // Christ the Redeemer
        L.latLng(-22.9068, -43.1729), // Copacabana Beach
      ]
      const markerLayer = addMarkers(points)
      toggleFromMap(markerLayer)
    }
  }, [map])

  return <div id="map" style={{ height: '400px' }} />
}`;

  const advancedUsageCode = `import React, { useState, useEffect } from 'react'
import { useMap } from '@forgepack/leaflet'
import * as L from 'leaflet'

function AdvancedMapComponent() {
  const {
    map,
    layers,
    addMarkers,
    addPolyline,
    addPolygon,
    toggleFromMap,
    startDrawingRoute,
    finishDrawingRoute,
    cancelDrawingRoute,
    isDrawingRoute
  } = useMap()

  const [selectedPoints, setSelectedPoints] = useState<L.LatLng[]>([])

  // Create markers from selected points
  const handleCreateMarkers = () => {
    if (selectedPoints.length > 0) {
      const markerLayer = addMarkers(selectedPoints)
      toggleFromMap(markerLayer)
      setSelectedPoints([])
    }
  }

  // Create polyline from selected points
  const handleCreatePolyline = () => {
    if (selectedPoints.length >= 2) {
      const polylineLayer = addPolyline(selectedPoints)
      toggleFromMap(polylineLayer)
      setSelectedPoints([])
    }
  }

  // Create polygon from selected points
  const handleCreatePolygon = () => {
    if (selectedPoints.length >= 3) {
      const polygonLayer = addPolygon(selectedPoints)
      toggleFromMap(polygonLayer)
      setSelectedPoints([])
    }
  }

  // Handle route drawing
  const handleStartRoute = () => {
    startDrawingRoute()
  }

  const handleFinishRoute = () => {
    const routeLayer = finishDrawingRoute()
    if (routeLayer) {
      toggleFromMap(routeLayer)
    }
  }

  return (
    <div>
      <div id="map" style={{ height: '400px' }} />
      
      <div className="controls">
        <button onClick={handleCreateMarkers} disabled={selectedPoints.length === 0}>
          Create Markers ({selectedPoints.length})
        </button>
        <button onClick={handleCreatePolyline} disabled={selectedPoints.length < 2}>
          Create Route ({selectedPoints.length} points)
        </button>
        <button onClick={handleCreatePolygon} disabled={selectedPoints.length < 3}>
          Create Area ({selectedPoints.length} points)
        </button>
        
        <div className="route-controls">
          {!isDrawingRoute ? (
            <button onClick={handleStartRoute}>
              Start Drawing Route
            </button>
          ) : (
            <>
              <button onClick={handleFinishRoute}>
                Finish Route
              </button>
              <button onClick={cancelDrawingRoute}>
                Cancel Route
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="layer-info">
        <p>Active Layers: {layers.length}</p>
      </div>
    </div>
  )
}`;

  const fileProcessingCode = `import React from 'react'
import { useMap, HandleInputFile } from '@forgepack/leaflet'

function FileProcessingComponent() {
  const {
    map,
    addMarkers,
    addPolyline,
    addPolygon,
    addOverlay,
    toggleFromMap
  } = useMap()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div>
      <div id="map" style={{ height: '400px' }} />
      
      <div className="file-controls">
        <label htmlFor="coordinate-file">
          Upload Coordinate File:
        </label>
        <input
          id="coordinate-file"
          type="file"
          onChange={handleFileUpload}
          accept=".txt"
        />
        
        <label htmlFor="image-overlay">
          Upload Georeferenced Image:
        </label>
        <input
          id="image-overlay"
          type="file"
          onChange={handleFileUpload}
          accept=".jpg,.jpeg,.png,.gif"
        />
      </div>
    </div>
  )
}`;

  const mapConfigCode = `const MAP_CONFIG = {
  center: L.latLng(-22.8, -43),  // Rio de Janeiro
  zoom: 11,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  }
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Hooks API Reference' : 'Referência da API dos Hooks'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'The hooks module provides React hooks for map management and interaction functionality.'
            : 'O módulo de hooks fornece hooks React para funcionalidades de gerenciamento e interação de mapas.'
          }
        </p>
      </header>

      <section>
        <h2>useMap</h2>
        <p>
          {language === 'en' 
            ? 'Custom React hook for comprehensive Leaflet map management, handling map initialization, layer management, interactive drawing, and file processing.'
            : 'Hook React customizado para gerenciamento abrangente de mapas Leaflet, lidando com inicialização de mapas, gerenciamento de camadas, desenho interativo e processamento de arquivos.'
          }
        </p>

        <h3>{language === 'en' ? 'Return Interface' : 'Interface de Retorno'}</h3>
        <CodeBlock code={returnInterfaceCode} language="tsx" />

        <h3>{language === 'en' ? 'Basic Usage' : 'Uso Básico'}</h3>
        <CodeBlock code={basicUsageCode} language="tsx" />

        <h3>{language === 'en' ? 'Advanced Usage with Layer Management' : 'Uso Avançado com Gerenciamento de Camadas'}</h3>
        <CodeBlock code={advancedUsageCode} language="tsx" />

        <h3>{language === 'en' ? 'File Processing Integration' : 'Integração com Processamento de Arquivos'}</h3>
        <CodeBlock code={fileProcessingCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Features' : 'Recursos'}</h2>

        <h3>{language === 'en' ? 'Map Initialization' : 'Inicialização do Mapa'}</h3>
        <p>{language === 'en' ? 'The hook automatically initializes a Leaflet map with:' : 'O hook inicializa automaticamente um mapa Leaflet com:'}</p>
        <ul>
          <li>{language === 'en' ? 'Default center at coordinates (-22.8, -43) - Rio de Janeiro area' : 'Centro padrão nas coordenadas (-22.8, -43) - área do Rio de Janeiro'}</li>
          <li>{language === 'en' ? 'Default zoom level of 11' : 'Nível de zoom padrão de 11'}</li>
          <li>{language === 'en' ? 'OpenStreetMap tile layer' : 'Camada de tiles do OpenStreetMap'}</li>
          <li>{language === 'en' ? 'Attribution control' : 'Controle de atribuição'}</li>
        </ul>

        <h3>{language === 'en' ? 'Layer Management' : 'Gerenciamento de Camadas'}</h3>
        <ul>
          <li><strong>createLayer:</strong> {language === 'en' ? 'Creates new feature groups from arrays of Leaflet layers' : 'Cria novos grupos de recursos a partir de arrays de camadas Leaflet'}</li>
          <li><strong>toggleFromMap:</strong> {language === 'en' ? 'Adds or removes layers from the map' : 'Adiciona ou remove camadas do mapa'}</li>
          <li><strong>layers:</strong> {language === 'en' ? 'Tracks all active layers in state' : 'Rastreia todas as camadas ativas no estado'}</li>
        </ul>

        <h3>{language === 'en' ? 'Marker Creation' : 'Criação de Marcadores'}</h3>
        <ul>
          <li><strong>addMarkers:</strong> {language === 'en' ? 'Creates marker layers from coordinate points' : 'Cria camadas de marcadores a partir de pontos de coordenadas'}</li>
          <li>{language === 'en' ? 'Automatic marker styling and popup generation' : 'Estilização automática de marcadores e geração de popups'}</li>
          <li>{language === 'en' ? 'Support for custom marker icons' : 'Suporte para ícones de marcadores customizados'}</li>
        </ul>

        <h3>{language === 'en' ? 'Polyline Creation' : 'Criação de Polilinhas'}</h3>
        <ul>
          <li><strong>addPolyline:</strong> {language === 'en' ? 'Creates polyline layers with distance annotations' : 'Cria camadas de polilinhas com anotações de distância'}</li>
          <li>{language === 'en' ? 'Automatic distance calculation in nautical miles' : 'Cálculo automático de distância em milhas náuticas'}</li>
          <li>{language === 'en' ? 'Distance labels displayed along the route' : 'Rótulos de distância exibidos ao longo da rota'}</li>
          <li>{language === 'en' ? 'Support for multi-segment routes' : 'Suporte para rotas de múltiplos segmentos'}</li>
        </ul>

        <h3>{language === 'en' ? 'Polygon Creation' : 'Criação de Polígonos'}</h3>
        <ul>
          <li><strong>addPolygon:</strong> {language === 'en' ? 'Creates polygon/area layers from coordinate points' : 'Cria camadas de polígonos/áreas a partir de pontos de coordenadas'}</li>
          <li>{language === 'en' ? 'Automatic area calculation' : 'Cálculo automático de área'}</li>
          <li>{language === 'en' ? 'Customizable fill and stroke styles' : 'Estilos de preenchimento e contorno personalizáveis'}</li>
        </ul>

        <h3>{language === 'en' ? 'Image Overlays' : 'Sobreposições de Imagem'}</h3>
        <ul>
          <li><strong>addOverlay:</strong> {language === 'en' ? 'Creates image overlay layers from files and bounds' : 'Cria camadas de sobreposição de imagem a partir de arquivos e limites'}</li>
          <li>{language === 'en' ? 'Support for georeferenced images' : 'Suporte para imagens georreferenciadas'}</li>
          <li>{language === 'en' ? 'Automatic bounds detection from filename patterns' : 'Detecção automática de limites a partir de padrões de nome de arquivo'}</li>
          <li>{language === 'en' ? 'File format support: JPG, PNG, GIF' : 'Suporte para formatos de arquivo: JPG, PNG, GIF'}</li>
        </ul>

        <h3>{language === 'en' ? 'Interactive Route Drawing' : 'Desenho Interativo de Rotas'}</h3>
        <ul>
          <li><strong>startDrawingRoute:</strong> {language === 'en' ? 'Enters interactive drawing mode' : 'Entra no modo de desenho interativo'}</li>
          <li><strong>finishDrawingRoute:</strong> {language === 'en' ? 'Completes route and creates layer' : 'Completa a rota e cria a camada'}</li>
          <li><strong>cancelDrawingRoute:</strong> {language === 'en' ? 'Cancels current drawing operation' : 'Cancela a operação de desenho atual'}</li>
          <li><strong>isDrawingRoute:</strong> {language === 'en' ? 'State indicator for drawing mode' : 'Indicador de estado para o modo de desenho'}</li>
          <li><strong>routePoints:</strong> {language === 'en' ? 'Current route points being drawn' : 'Pontos de rota atuais sendo desenhados'}</li>
        </ul>

        <h3>{language === 'en' ? 'Map Configuration' : 'Configuração do Mapa'}</h3>
        <p>
          {language === 'en' 
            ? 'The hook uses default configuration that can be customized:'
            : 'O hook usa configuração padrão que pode ser personalizada:'
          }
        </p>
        <CodeBlock code={mapConfigCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Performance Notes' : 'Notas de Performance'}</h2>
        <ul>
          <li>{language === 'en' ? 'Map instance is memoized to prevent re-initialization' : 'A instância do mapa é memorizada para prevenir re-inicialização'}</li>
          <li>{language === 'en' ? 'Layer operations are optimized for batch processing' : 'Operações de camada são otimizadas para processamento em lote'}</li>
          <li>{language === 'en' ? 'File processing is handled asynchronously' : 'Processamento de arquivos é tratado de forma assíncrona'}</li>
          <li>{language === 'en' ? 'Memory cleanup on component unmount' : 'Limpeza de memória na desmontagem do componente'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Error Handling' : 'Tratamento de Erros'}</h2>
        <p>
          {language === 'en' 
            ? 'The hook includes built-in error handling for:'
            : 'O hook inclui tratamento de erro integrado para:'
          }
        </p>
        <ul>
          <li>{language === 'en' ? 'Map initialization failures' : 'Falhas de inicialização do mapa'}</li>
          <li>{language === 'en' ? 'Invalid coordinate data' : 'Dados de coordenadas inválidos'}</li>
          <li>{language === 'en' ? 'File processing errors' : 'Erros de processamento de arquivos'}</li>
          <li>{language === 'en' ? 'Layer creation failures' : 'Falhas na criação de camadas'}</li>
        </ul>
      </section>

      <DocsNavigation />
    </div>
  );
}