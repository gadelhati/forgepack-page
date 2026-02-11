import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '@/components/DocsNavigation';

export function ServicesReference() {
  const { language } = useLanguage();

  const coordinateParsingCode = `// Coordinate parsing utilities
export const parseCoordinateFile = (content: string): L.LatLng[] => {
  const lines = content.split('\\n').filter(line => line.trim())
  
  return lines.map(line => {
    const [lat, lng] = line.trim().split(/\\s+/).map(Number)
    if (isNaN(lat) || isNaN(lng)) {
      throw new Error(\`Invalid coordinate: \${line}\`)
    }
    return L.latLng(lat, lng)
  })
}

// CSV coordinate parsing
export const parseCSVCoordinates = (content: string): L.LatLng[] => {
  const lines = content.split('\\n').filter(line => line.trim())
  const header = lines[0].toLowerCase()
  
  if (header.includes('lat') && header.includes('lng')) {
    return lines.slice(1).map(line => {
      const [lat, lng] = line.split(',').map(coord => parseFloat(coord.trim()))
      return L.latLng(lat, lng)
    })
  }
  
  throw new Error('CSV must contain lat and lng columns')
}`;

  const distanceCalculationCode = `// Distance calculation in nautical miles
export const calculateNauticalDistance = (
  point1: L.LatLng, 
  point2: L.LatLng
): number => {
  const distanceInMeters = point1.distanceTo(point2)
  return distanceInMeters / 1852 // Convert to nautical miles
}

// Calculate total route distance
export const calculateRouteDistance = (points: L.LatLng[]): number => {
  let totalDistance = 0
  
  for (let i = 0; i < points.length - 1; i++) {
    totalDistance += calculateNauticalDistance(points[i], points[i + 1])
  }
  
  return totalDistance
}

// Calculate bearing between two points
export const calculateBearing = (
  point1: L.LatLng, 
  point2: L.LatLng
): number => {
  const lat1 = point1.lat * Math.PI / 180
  const lat2 = point2.lat * Math.PI / 180
  const deltaLng = (point2.lng - point1.lng) * Math.PI / 180
  
  const y = Math.sin(deltaLng) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - 
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng)
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI
  return (bearing + 360) % 360 // Normalize to 0-360
}`;

  const fileUtilitiesCode = `// File format detection
export const detectFileFormat = (file: File): 'coordinates' | 'image' | 'unknown' => {
  const { name, type } = file
  
  // Check for georeferenced image naming pattern
  const geoImagePattern = /^-?\\d+\\.\\d+_-?\\d+\\.\\d+_-?\\d+\\.\\d+_-?\\d+\\.\\d+\\./
  if (geoImagePattern.test(name) && type.startsWith('image/')) {
    return 'image'
  }
  
  // Check for coordinate file extensions
  const coordExtensions = ['.txt', '.csv', '.coords']
  if (coordExtensions.some(ext => name.toLowerCase().endsWith(ext))) {
    return 'coordinates'
  }
  
  return 'unknown'
}

// Extract bounds from georeferenced image filename
export const extractBoundsFromFilename = (filename: string): L.LatLngBounds | null => {
  const pattern = /(-?\\d+\\.\\d+)_(-?\\d+\\.\\d+)_(-?\\d+\\.\\d+)_(-?\\d+\\.\\d+)/
  const match = filename.match(pattern)
  
  if (match) {
    const [, swLat, swLng, neLat, neLng] = match.map(Number)
    return L.latLngBounds([swLat, swLng], [neLat, neLng])
  }
  
  return null
}

// Read file as text
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}`;

  const imageProcessingCode = `// Create image overlay from file and bounds
export const createImageOverlay = (
  file: File,
  bounds: L.LatLngBounds,
  options?: L.ImageOverlayOptions
): Promise<L.ImageOverlay> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const overlay = L.imageOverlay(url, bounds, {
      opacity: 0.7,
      interactive: true,
      ...options
    })
    
    // Clean up object URL when overlay is removed
    overlay.on('remove', () => {
      URL.revokeObjectURL(url)
    })
    
    resolve(overlay)
  })
}

// Validate image file
export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 50 * 1024 * 1024 // 50MB
  
  return validTypes.includes(file.type) && file.size <= maxSize
}

// Generate thumbnail for image preview
export const generateImageThumbnail = (
  file: File,
  maxWidth: number = 200,
  maxHeight: number = 200
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      const { width, height } = img
      const ratio = Math.min(maxWidth / width, maxHeight / height)
      
      canvas.width = width * ratio
      canvas.height = height * ratio
      
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
      
      URL.revokeObjectURL(img.src)
    }
    
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Services API Reference' : 'Referência da API dos Serviços'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Utility services for coordinate processing, distance calculations, and file handling in @forgepack/leaflet.'
            : 'Serviços utilitários para processamento de coordenadas, cálculos de distância e manipulação de arquivos no @forgepack/leaflet.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? 'Coordinate Processing' : 'Processamento de Coordenadas'}</h2>
        <p>
          {language === 'en' 
            ? 'Services for parsing and processing coordinate data from various file formats.'
            : 'Serviços para análise e processamento de dados de coordenadas de vários formatos de arquivo.'
          }
        </p>
        <CodeBlock code={coordinateParsingCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>parseCoordinateFile</strong> - {language === 'en' ? 'Parse space-separated coordinate files' : 'Analisa arquivos de coordenadas separadas por espaço'}</li>
          <li><strong>parseCSVCoordinates</strong> - {language === 'en' ? 'Parse CSV files with lat/lng columns' : 'Analisa arquivos CSV com colunas lat/lng'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Distance Calculations' : 'Cálculos de Distância'}</h2>
        <p>
          {language === 'en' 
            ? 'Maritime-focused distance calculation utilities with support for nautical miles and bearing calculations.'
            : 'Utilitários de cálculo de distância focados em marítimo com suporte para milhas náuticas e cálculos de rumo.'
          }
        </p>
        <CodeBlock code={distanceCalculationCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>calculateNauticalDistance</strong> - {language === 'en' ? 'Calculate distance between two points in nautical miles' : 'Calcula a distância entre dois pontos em milhas náuticas'}</li>
          <li><strong>calculateRouteDistance</strong> - {language === 'en' ? 'Calculate total distance for a route with multiple waypoints' : 'Calcula a distância total para uma rota com múltiplos pontos de referência'}</li>
          <li><strong>calculateBearing</strong> - {language === 'en' ? 'Calculate bearing between two points in degrees' : 'Calcula o rumo entre dois pontos em graus'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'File Utilities' : 'Utilitários de Arquivo'}</h2>
        <p>
          {language === 'en' 
            ? 'Helper functions for file format detection, bounds extraction, and file reading operations.'
            : 'Funções auxiliares para detecção de formato de arquivo, extração de limites e operações de leitura de arquivos.'
          }
        </p>
        <CodeBlock code={fileUtilitiesCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>detectFileFormat</strong> - {language === 'en' ? 'Automatically detect file type from name and MIME type' : 'Detecta automaticamente o tipo de arquivo pelo nome e tipo MIME'}</li>
          <li><strong>extractBoundsFromFilename</strong> - {language === 'en' ? 'Extract geographic bounds from georeferenced image filenames' : 'Extrai limites geográficos de nomes de arquivos de imagens georreferenciadas'}</li>
          <li><strong>readFileAsText</strong> - {language === 'en' ? 'Read file content as text with Promise-based API' : 'Lê conteúdo de arquivo como texto com API baseada em Promise'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Image Processing' : 'Processamento de Imagem'}</h2>
        <p>
          {language === 'en' 
            ? 'Services for creating image overlays, validation, and thumbnail generation.'
            : 'Serviços para criação de sobreposições de imagem, validação e geração de miniaturas.'
          }
        </p>
        <CodeBlock code={imageProcessingCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>createImageOverlay</strong> - {language === 'en' ? 'Create Leaflet image overlay from file and bounds' : 'Cria sobreposição de imagem Leaflet a partir de arquivo e limites'}</li>
          <li><strong>validateImageFile</strong> - {language === 'en' ? 'Validate image file type and size constraints' : 'Valida tipo de arquivo de imagem e restrições de tamanho'}</li>
          <li><strong>generateImageThumbnail</strong> - {language === 'en' ? 'Generate thumbnail preview from image file' : 'Gera miniatura de pré-visualização a partir de arquivo de imagem'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Error Handling' : 'Tratamento de Erros'}</h2>
        <p>
          {language === 'en' 
            ? 'All service functions include comprehensive error handling for common scenarios:'
            : 'Todas as funções de serviço incluem tratamento abrangente de erros para cenários comuns:'
          }
        </p>
        <ul>
          <li>{language === 'en' ? 'Invalid coordinate format validation' : 'Validação de formato de coordenada inválido'}</li>
          <li>{language === 'en' ? 'File reading error recovery' : 'Recuperação de erro de leitura de arquivo'}</li>
          <li>{language === 'en' ? 'Image processing failure handling' : 'Tratamento de falha no processamento de imagem'}</li>
          <li>{language === 'en' ? 'Memory cleanup for object URLs' : 'Limpeza de memória para URLs de objeto'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Usage with Components' : 'Uso com Componentes'}</h2>
        <p>
          {language === 'en' 
            ? 'These services are primarily used internally by the HandleInputFile component and useMap hook, but can also be used directly for custom implementations.'
            : 'Esses serviços são usados principalmente internamente pelo componente HandleInputFile e hook useMap, mas também podem ser usados diretamente para implementações personalizadas.'
          }
        </p>
      </section>

      <DocsNavigation />
    </div>
  );
}