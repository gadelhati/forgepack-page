import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function TypesReference() {
  const { language } = useLanguage();

  const mapConfigCode = `// Map configuration interface
export interface MapConfig {
  center?: L.LatLngExpression
  zoom?: number
  tileLayer?: {
    url: string
    attribution: string
    options?: L.TileLayerOptions
  }
  options?: L.MapOptions
}

// Default map configuration
export const DEFAULT_MAP_CONFIG: MapConfig = {
  center: [-22.8, -43], // Rio de Janeiro
  zoom: 11,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  }
}`;

  const layerTypesCode = `// Layer management types
export interface LayerInfo {
  id: string
  name: string
  type: 'markers' | 'polyline' | 'polygon' | 'overlay'
  visible: boolean
  data?: any
  createdAt: Date
}

export interface MarkerLayer extends L.FeatureGroup {
  layerType: 'markers'
  points: L.LatLng[]
}

export interface PolylineLayer extends L.FeatureGroup {
  layerType: 'polyline' 
  points: L.LatLng[]
  totalDistance?: number // in nautical miles
}

export interface PolygonLayer extends L.FeatureGroup {
  layerType: 'polygon'
  points: L.LatLng[]
  area?: number // in square meters
}

export interface OverlayLayer extends L.FeatureGroup {
  layerType: 'overlay'
  bounds: L.LatLngBounds
  imageUrl: string
}`;

  const eventHandlersCode = `// Event handler types
export interface MapEventHandlers {
  onMapReady?: (map: L.Map) => void
  onLayerAdd?: (layer: L.Layer) => void
  onLayerRemove?: (layer: L.Layer) => void
  onMarkerClick?: (marker: L.Marker, event: L.LeafletMouseEvent) => void
  onRouteStart?: () => void
  onRouteComplete?: (route: L.FeatureGroup) => void
  onRouteCancel?: () => void
}

// File input event types
export interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList
  }
}

// Drawing event types
export interface DrawingEvents {
  onDrawStart?: () => void
  onDrawVertex?: (point: L.LatLng) => void
  onDrawComplete?: (layer: L.FeatureGroup) => void
  onDrawCancel?: () => void
}`;

  const fileFormatsCode = `// File format definitions
export interface CoordinateFile {
  type: 'coordinates'
  format: 'txt' | 'csv' | 'coords'
  encoding?: string
  delimiter?: string
  hasHeader?: boolean
}

export interface ImageFile {
  type: 'image'
  format: 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp'
  bounds?: L.LatLngBounds
  isGeoreferenced: boolean
}

export interface FileProcessingOptions {
  validateCoordinates?: boolean
  maxFileSize?: number // in bytes
  supportedFormats?: string[]
  coordinateThreshold?: number // minimum points required
}

// Coordinate parsing result
export interface CoordinateParsingResult {
  points: L.LatLng[]
  errors: string[]
  metadata?: {
    totalPoints: number
    boundsDetected?: L.LatLngBounds
    format: string
  }
}`;

  const hookTypesCode = `// useMap hook return type
export interface UseMapReturn {
  // Core map instance
  map: L.Map | undefined
  
  // Layer management
  layers: L.FeatureGroup[]
  createLayer: (elements: L.Layer[]) => L.FeatureGroup
  toggleFromMap: (layer: L.Layer) => void
  
  // Layer creation methods
  addMarkers: (points: L.LatLng[], options?: L.MarkerOptions) => L.FeatureGroup
  addPolyline: (points: L.LatLng[], options?: L.PolylineOptions) => L.FeatureGroup
  addPolygon: (points: L.LatLng[], options?: L.PolygonOptions) => L.FeatureGroup
  addOverlay: (
    sw: L.LatLngExpression, 
    ne: L.LatLngExpression, 
    file: File,
    options?: L.ImageOverlayOptions
  ) => L.FeatureGroup
  
  // Interactive drawing
  startDrawingRoute: () => void
  finishDrawingRoute: () => L.FeatureGroup | null
  cancelDrawingRoute: () => void
  isDrawingRoute: boolean
  routePoints: L.LatLng[]
  
  // Map state
  isLoading: boolean
  error: string | null
}

// Hook options
export interface UseMapOptions {
  config?: MapConfig
  onError?: (error: Error) => void
  onLayerChange?: (layers: L.FeatureGroup[]) => void
  enableDrawing?: boolean
}`;

  const styleTypesCode = `// Styling configuration types
export interface MarkerStyles {
  default?: L.MarkerOptions
  highlighted?: L.MarkerOptions
  cluster?: L.MarkerClusterGroupOptions
}

export interface LineStyles {
  polyline?: L.PolylineOptions
  polygon?: L.PolygonOptions
  route?: L.PolylineOptions & {
    showDistance?: boolean
    distanceLabelStyle?: L.DivIconOptions
  }
}

export interface OverlayStyles {
  opacity?: number
  interactive?: boolean
  attribution?: string
  pane?: string
}

export interface ThemeConfig {
  markers: MarkerStyles
  lines: LineStyles
  overlays: OverlayStyles
  colors: {
    primary: string
    secondary: string
    accent: string
    success: string
    warning: string
    error: string
  }
}`;

  const utilityTypesCode = `// Distance calculation types
export interface DistanceCalculation {
  totalDistance: number // nautical miles
  segments: Array<{
    from: L.LatLng
    to: L.LatLng
    distance: number
    bearing: number
  }>
}

// Bounds calculation result
export interface BoundsResult {
  bounds: L.LatLngBounds
  center: L.LatLng
  zoom: number
  area?: number // square meters
}

// Coordinate conversion types
export type CoordinateFormat = 'DD' | 'DMS' | 'UTM' | 'MGRS'

export interface CoordinateConversion {
  format: CoordinateFormat
  value: string
  precision?: number
}

// Validation result types
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  suggestions?: string[]
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'TypeScript Types Reference' : 'Referência dos Tipos TypeScript'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Complete TypeScript interface definitions and type declarations for @forgepack/leaflet.'
            : 'Definições completas de interfaces TypeScript e declarações de tipo para @forgepack/leaflet.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? 'Map Configuration' : 'Configuração do Mapa'}</h2>
        <p>
          {language === 'en' 
            ? 'Types for configuring map initialization and default settings.'
            : 'Tipos para configuração de inicialização de mapa e configurações padrão.'
          }
        </p>
        <CodeBlock code={mapConfigCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Layer Types' : 'Tipos de Camadas'}</h2>
        <p>
          {language === 'en' 
            ? 'Interface definitions for different types of map layers and their properties.'
            : 'Definições de interface para diferentes tipos de camadas de mapa e suas propriedades.'
          }
        </p>
        <CodeBlock code={layerTypesCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Event Handlers' : 'Manipuladores de Eventos'}</h2>
        <p>
          {language === 'en' 
            ? 'Type definitions for event handling functions and callback interfaces.'
            : 'Definições de tipo para funções de manipulação de eventos e interfaces de callback.'
          }
        </p>
        <CodeBlock code={eventHandlersCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'File Formats' : 'Formatos de Arquivo'}</h2>
        <p>
          {language === 'en' 
            ? 'Types for file processing, coordinate parsing, and image handling operations.'
            : 'Tipos para processamento de arquivos, análise de coordenadas e operações de manipulação de imagem.'
          }
        </p>
        <CodeBlock code={fileFormatsCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Hook Types' : 'Tipos de Hook'}</h2>
        <p>
          {language === 'en' 
            ? 'Complete type definitions for the useMap hook and its configuration options.'
            : 'Definições de tipo completas para o hook useMap e suas opções de configuração.'
          }
        </p>
        <CodeBlock code={hookTypesCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Style Configuration' : 'Configuração de Estilo'}</h2>
        <p>
          {language === 'en' 
            ? 'Types for customizing the appearance of map elements and themes.'
            : 'Tipos para personalizar a aparência de elementos do mapa e temas.'
          }
        </p>
        <CodeBlock code={styleTypesCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Utility Types' : 'Tipos Utilitários'}</h2>
        <p>
          {language === 'en' 
            ? 'Helper types for calculations, conversions, and validation operations.'
            : 'Tipos auxiliares para cálculos, conversões e operações de validação.'
          }
        </p>
        <CodeBlock code={utilityTypesCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Generic Types' : 'Tipos Genéricos'}</h2>
        <p>
          {language === 'en' 
            ? 'Common generic types used throughout the library:'
            : 'Tipos genéricos comuns usados em toda a biblioteca:'
          }
        </p>
        <ul>
          <li><strong>LatLngExpression</strong> - {language === 'en' ? 'Leaflet coordinate expression (tuple, object, or LatLng)' : 'Expressão de coordenada Leaflet (tupla, objeto ou LatLng)'}</li>
          <li><strong>LayerGroup</strong> - {language === 'en' ? 'Collection of map layers' : 'Coleção de camadas de mapa'}</li>
          <li><strong>Bounds</strong> - {language === 'en' ? 'Geographic boundary definition' : 'Definição de limite geográfico'}</li>
          <li><strong>FeatureGroup</strong> - {language === 'en' ? 'Interactive layer group with event handling' : 'Grupo de camadas interativo com tratamento de eventos'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Type Guards' : 'Guardiões de Tipo'}</h2>
        <p>
          {language === 'en' 
            ? 'The library includes TypeScript type guards for runtime type checking:'
            : 'A biblioteca inclui guardiões de tipo TypeScript para verificação de tipo em tempo de execução:'
          }
        </p>
        <ul>
          <li><code>isLatLng(obj): obj is L.LatLng</code></li>
          <li><code>isFeatureGroup(layer): layer is L.FeatureGroup</code></li>
          <li><code>isImageFile(file): file is ImageFile</code></li>
          <li><code>isCoordinateFile(file): file is CoordinateFile</code></li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Usage Examples' : 'Exemplos de Uso'}</h2>
        <p>
          {language === 'en' 
            ? 'These types enable full IntelliSense support and compile-time type checking:'
            : 'Esses tipos habilitam suporte completo ao IntelliSense e verificação de tipo em tempo de compilação:'
          }
        </p>
        <CodeBlock code={`// Type-safe configuration
const mapConfig: MapConfig = {
  center: [-22.8, -43],
  zoom: 11,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap'
  }
}

// Type-safe event handling
const handleLayerAdd: MapEventHandlers['onLayerAdd'] = (layer) => {
  console.log('Layer added:', layer)
}

// Type-safe hook usage
const {
  map,
  addMarkers,
  toggleFromMap
}: UseMapReturn = useMap()`} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Related Documentation' : 'Documentação Relacionada'}</h2>
        <ul>
          <li>
            <Link to="/docs/leaflet/reference/components">
              {language === 'en' ? 'Components API' : 'API dos Componentes'}
            </Link> - {language === 'en' ? 'See types used in components' : 'Veja tipos usados em componentes'}
          </li>
          <li>
            <Link to="/docs/leaflet/reference/hooks">
              {language === 'en' ? 'Hooks API' : 'API dos Hooks'}
            </Link> - {language === 'en' ? 'Hook interfaces and return types' : 'Interfaces de hooks e tipos de retorno'}
          </li>
          <li>
            <Link to="/docs/leaflet/getting-started">
              {language === 'en' ? 'Getting Started' : 'Começando'}
            </Link> - {language === 'en' ? 'TypeScript setup and configuration' : 'Configuração e setup do TypeScript'}
          </li>
        </ul>
      </section>

      <nav className="docs-nav">
        <Link to="/docs/leaflet/reference/services" className="docs-nav-link docs-nav-prev">
          <span className="docs-nav-label">
            {language === 'en' ? 'Previous' : 'Anterior'}
          </span>
          <span className="docs-nav-title">
            {language === 'en' ? 'Services API' : 'API de Serviços'}
          </span>
        </Link>
        <Link to="/docs/leaflet/reference/utilities" className="docs-nav-link docs-nav-next">
          <span className="docs-nav-label">
            {language === 'en' ? 'Next' : 'Próximo'}
          </span>
          <span className="docs-nav-title">
            {language === 'en' ? 'Utilities API' : 'API de Utilitários'}
          </span>
        </Link>
      </nav>
    </div>
  );
}