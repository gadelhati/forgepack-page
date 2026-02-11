import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '@/components/DocsNavigation/DocsNavigation';

export function UtilitiesReference() {
  const { language } = useLanguage();

  const coordinateConversionCode = `// Coordinate format conversion utilities
export const convertCoordinates = {
  // Convert decimal degrees to degrees, minutes, seconds
  toDMS: (lat: number, lng: number): { lat: string; lng: string } => {
    const convertToDMS = (coord: number, isLat: boolean): string => {
      const direction = isLat 
        ? (coord >= 0 ? 'N' : 'S') 
        : (coord >= 0 ? 'E' : 'W')
      
      const abs = Math.abs(coord)
      const degrees = Math.floor(abs)
      const minutes = Math.floor((abs - degrees) * 60)
      const seconds = ((abs - degrees) * 60 - minutes) * 60
      
      return \`\${degrees}° \${minutes}' \${seconds.toFixed(2)}" \${direction}\`
    }
    
    return {
      lat: convertToDMS(lat, true),
      lng: convertToDMS(lng, false)
    }
  },

  // Convert DMS to decimal degrees
  fromDMS: (dmsString: string): number => {
    const match = dmsString.match(/(\\d+)°\\s*(\\d+)'\\s*([\\d.]+)"\\s*([NSEW])/)
    if (!match) throw new Error('Invalid DMS format')
    
    const [, degrees, minutes, seconds, direction] = match
    let decimal = parseInt(degrees) + parseInt(minutes)/60 + parseFloat(seconds)/3600
    
    if (['S', 'W'].includes(direction)) decimal *= -1
    return decimal
  },

  // Validate coordinate bounds
  isValidLatLng: (lat: number, lng: number): boolean => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  }
}`;

  const boundsCalculationCode = `// Bounds calculation utilities
export const boundsUtils = {
  // Calculate bounds from array of points
  calculateBounds: (points: L.LatLng[]): L.LatLngBounds => {
    if (points.length === 0) {
      throw new Error('Cannot calculate bounds from empty points array')
    }
    
    const lats = points.map(p => p.lat)
    const lngs = points.map(p => p.lng)
    
    return L.latLngBounds([
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)]
    ])
  },

  // Calculate optimal zoom level for bounds
  calculateOptimalZoom: (
    bounds: L.LatLngBounds, 
    containerSize: { width: number; height: number }
  ): number => {
    const WORLD_DIM = { height: 256, width: 256 }
    const ZOOM_MAX = 18
    
    const latRad = (lat: number) => {
      const sin = Math.sin(lat * Math.PI / 180)
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
    }
    
    const ne = bounds.getNorthEast()
    const sw = bounds.getSouthWest()
    
    const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI
    const lngDiff = ne.lng - sw.lng
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360
    
    const latZoom = Math.floor(Math.log(containerSize.height / WORLD_DIM.height / latFraction) / Math.LN2)
    const lngZoom = Math.floor(Math.log(containerSize.width / WORLD_DIM.width / lngFraction) / Math.LN2)
    
    return Math.min(latZoom, lngZoom, ZOOM_MAX)
  },

  // Expand bounds by percentage
  expandBounds: (bounds: L.LatLngBounds, factor: number = 0.1): L.LatLngBounds => {
    const center = bounds.getCenter()
    const size = bounds.getSize()
    
    const expandedSize = {
      lat: size.lat * (1 + factor),
      lng: size.lng * (1 + factor)
    }
    
    return L.latLngBounds([
      [center.lat - expandedSize.lat/2, center.lng - expandedSize.lng/2],
      [center.lat + expandedSize.lat/2, center.lng + expandedSize.lng/2]
    ])
  }
}`;

  const formatValidationCode = `// Format validation utilities
export const validators = {
  // Validate coordinate file format
  validateCoordinateFile: (content: string): { 
    isValid: boolean
    errors: string[]
    pointCount: number
  } => {
    const errors: string[] = []
    const lines = content.split('\\n').filter(line => line.trim())
    let validPoints = 0
    
    if (lines.length === 0) {
      errors.push('File is empty')
      return { isValid: false, errors, pointCount: 0 }
    }
    
    lines.forEach((line, index) => {
      const parts = line.trim().split(/\\s+/)
      
      if (parts.length < 2) {
        errors.push(\`Line \${index + 1}: Expected lat lng format\`)
        return
      }
      
      const [latStr, lngStr] = parts
      const lat = parseFloat(latStr)
      const lng = parseFloat(lngStr)
      
      if (isNaN(lat) || isNaN(lng)) {
        errors.push(\`Line \${index + 1}: Invalid numeric coordinates\`)
        return
      }
      
      if (!coordinateConversion.isValidLatLng(lat, lng)) {
        errors.push(\`Line \${index + 1}: Coordinates out of valid range\`)
        return
      }
      
      validPoints++
    })
    
    return {
      isValid: errors.length === 0,
      errors,
      pointCount: validPoints
    }
  },

  // Validate georeferenced image filename
  validateGeoImageFilename: (filename: string): {
    isValid: boolean
    bounds?: L.LatLngBounds
    error?: string
  } => {
    const pattern = /^(-?\\d+\\.\\d+)_(-?\\d+\\.\\d+)_(-?\\d+\\.\\d+)_(-?\\d+\\.\\d+)\\./
    const match = filename.match(pattern)
    
    if (!match) {
      return {
        isValid: false,
        error: 'Filename must follow pattern: swLat_swLng_neLat_neLng.extension'
      }
    }
    
    const [, swLat, swLng, neLat, neLng] = match.map(Number)
    
    // Validate coordinate ranges
    const coords = [swLat, neLat, swLng, neLng]
    if (!coords.every((coord, i) => {
      const isLat = i < 2
      return isLat ? (coord >= -90 && coord <= 90) : (coord >= -180 && coord <= 180)
    })) {
      return {
        isValid: false,
        error: 'Coordinates are out of valid range'
      }
    }
    
    // Validate bounds logic
    if (swLat >= neLat || swLng >= neLng) {
      return {
        isValid: false,
        error: 'Southwest coordinates must be less than northeast coordinates'
      }
    }
    
    return {
      isValid: true,
      bounds: L.latLngBounds([swLat, swLng], [neLat, neLng])
    }
  },

  // Validate file size and type
  validateFile: (file: File, options: {
    maxSize?: number
    allowedTypes?: string[]
  } = {}): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    const { maxSize = 50 * 1024 * 1024, allowedTypes } = options // 50MB default
    
    if (file.size > maxSize) {
      errors.push(\`File size (\${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum (\${(maxSize / 1024 / 1024).toFixed(1)}MB)\`)
    }
    
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      errors.push(\`File type \${file.type} is not allowed. Allowed types: \${allowedTypes.join(', ')}\`)
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}`;

  const helperMethodsCode = `// General helper methods
export const helpers = {
  // Debounce function for performance optimization
  debounce: <T extends (...args: any[]) => any>(
    func: T, 
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  },

  // Generate unique layer ID
  generateLayerId: (prefix: string = 'layer'): string => {
    return \`\${prefix}_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`
  },

  // Format distance for display
  formatDistance: (
    distanceInNauticalMiles: number,
    unit: 'nm' | 'km' | 'mi' = 'nm'
  ): string => {
    let distance = distanceInNauticalMiles
    let unitLabel = 'NM'
    
    switch (unit) {
      case 'km':
        distance *= 1.852
        unitLabel = 'km'
        break
      case 'mi':
        distance *= 1.15078
        unitLabel = 'mi'
        break
    }
    
    return \`\${distance.toFixed(distance < 10 ? 2 : 1)} \${unitLabel}\`
  },

  // Format coordinates for display
  formatCoordinate: (
    lat: number, 
    lng: number, 
    format: 'DD' | 'DM' | 'DMS' = 'DD',
    precision: number = 6
  ): string => {
    switch (format) {
      case 'DMS':
        const dms = coordinateConversion.toDMS(lat, lng)
        return \`\${dms.lat}, \${dms.lng}\`
      case 'DM':
        // Degrees and decimal minutes
        const latDir = lat >= 0 ? 'N' : 'S'
        const lngDir = lng >= 0 ? 'E' : 'W'
        const latAbs = Math.abs(lat)
        const lngAbs = Math.abs(lng)
        const latDeg = Math.floor(latAbs)
        const lngDeg = Math.floor(lngAbs)
        const latMin = (latAbs - latDeg) * 60
        const lngMin = (lngAbs - lngDeg) * 60
        return \`\${latDeg}° \${latMin.toFixed(precision)}' \${latDir}, \${lngDeg}° \${lngMin.toFixed(precision)}' \${lngDir}\`
      default: // DD
        return \`\${lat.toFixed(precision)}, \${lng.toFixed(precision)}\`
    }
  },

  // Create download link for data export
  downloadData: (data: any, filename: string, type: 'json' | 'csv' | 'txt' = 'json'): void => {
    let content: string
    let mimeType: string
    
    switch (type) {
      case 'csv':
        if (Array.isArray(data)) {
          const headers = Object.keys(data[0] || {}).join(',')
          const rows = data.map(item => Object.values(item).join(','))
          content = [headers, ...rows].join('\\n')
        } else {
          content = JSON.stringify(data)
        }
        mimeType = 'text/csv'
        break
      case 'txt':
        content = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
        mimeType = 'text/plain'
        break
      default: // json
        content = JSON.stringify(data, null, 2)
        mimeType = 'application/json'
    }
    
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setTimeout(() => URL.revokeObjectURL(url), 100)
  },

  // Deep clone object (for layer data)
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
    if (obj instanceof Array) return obj.map(item => helpers.deepClone(item)) as unknown as T
    if (typeof obj === 'object') {
      const clonedObj = {} as { [key: string]: any }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = helpers.deepClone(obj[key])
        }
      }
      return clonedObj as T
    }
    return obj
  }
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Utilities API Reference' : 'Referência da API de Utilitários'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Helper functions and utilities for common map operations and data transformations in @forgepack/leaflet.'
            : 'Funções auxiliares e utilitários para operações comuns de mapa e transformações de dados no @forgepack/leaflet.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? 'Coordinate Conversion' : 'Conversão de Coordenadas'}</h2>
        <p>
          {language === 'en' 
            ? 'Utilities for converting between different coordinate formats and validating coordinate values.'
            : 'Utilitários para conversão entre diferentes formatos de coordenadas e validação de valores de coordenadas.'
          }
        </p>
        <CodeBlock code={coordinateConversionCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>toDMS</strong> - {language === 'en' ? 'Convert decimal degrees to degrees, minutes, seconds format' : 'Converte graus decimais para formato graus, minutos, segundos'}</li>
          <li><strong>fromDMS</strong> - {language === 'en' ? 'Parse DMS string back to decimal degrees' : 'Analisa string DMS de volta para graus decimais'}</li>
          <li><strong>isValidLatLng</strong> - {language === 'en' ? 'Validate coordinate ranges' : 'Valida intervalos de coordenadas'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Bounds Calculation' : 'Cálculo de Limites'}</h2>
        <p>
          {language === 'en' 
            ? 'Functions for calculating geographic bounds, optimal zoom levels, and bound manipulations.'
            : 'Funções para calcular limites geográficos, níveis de zoom ideais e manipulações de limites.'
          }
        </p>
        <CodeBlock code={boundsCalculationCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>calculateBounds</strong> - {language === 'en' ? 'Calculate bounds from array of coordinate points' : 'Calcula limites a partir de array de pontos de coordenadas'}</li>
          <li><strong>calculateOptimalZoom</strong> - {language === 'en' ? 'Determine best zoom level for given bounds and container size' : 'Determina o melhor nível de zoom para limites e tamanho de contêiner dados'}</li>
          <li><strong>expandBounds</strong> - {language === 'en' ? 'Expand bounds by percentage for padding' : 'Expande limites por porcentagem para padding'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Format Validation' : 'Validação de Formato'}</h2>
        <p>
          {language === 'en' 
            ? 'Validation utilities for coordinate files, image files, and data formats.'
            : 'Utilitários de validação para arquivos de coordenadas, arquivos de imagem e formatos de dados.'
          }
        </p>
        <CodeBlock code={formatValidationCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>validateCoordinateFile</strong> - {language === 'en' ? 'Validate coordinate file content and format' : 'Valida conteúdo e formato de arquivo de coordenadas'}</li>
          <li><strong>validateGeoImageFilename</strong> - {language === 'en' ? 'Validate georeferenced image filename pattern' : 'Valida padrão de nome de arquivo de imagem georreferenciada'}</li>
          <li><strong>validateFile</strong> - {language === 'en' ? 'General file validation for size and type constraints' : 'Validação geral de arquivo para restrições de tamanho e tipo'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Helper Methods' : 'Métodos Auxiliares'}</h2>
        <p>
          {language === 'en' 
            ? 'General purpose utility functions for common operations and data manipulation.'
            : 'Funções utilitárias de propósito geral para operações comuns e manipulação de dados.'
          }
        </p>
        <CodeBlock code={helperMethodsCode} language="tsx" />

        <h3>{language === 'en' ? 'Functions' : 'Funções'}</h3>
        <ul>
          <li><strong>debounce</strong> - {language === 'en' ? 'Performance optimization for frequent function calls' : 'Otimização de performance para chamadas frequentes de função'}</li>
          <li><strong>generateLayerId</strong> - {language === 'en' ? 'Generate unique identifiers for map layers' : 'Gera identificadores únicos para camadas de mapa'}</li>
          <li><strong>formatDistance</strong> - {language === 'en' ? 'Format distance values for display in different units' : 'Formata valores de distância para exibição em diferentes unidades'}</li>
          <li><strong>formatCoordinate</strong> - {language === 'en' ? 'Format coordinates for display in various formats' : 'Formata coordenadas para exibição em vários formatos'}</li>
          <li><strong>downloadData</strong> - {language === 'en' ? 'Export data as downloadable files (JSON, CSV, TXT)' : 'Exporta dados como arquivos para download (JSON, CSV, TXT)'}</li>
          <li><strong>deepClone</strong> - {language === 'en' ? 'Deep copy objects for immutable operations' : 'Copia profunda de objetos para operações imutáveis'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Usage Examples' : 'Exemplos de Uso'}</h2>
        <CodeBlock code={`// Convert coordinates to different formats
const { lat, lng } = marker.getLatLng()
const dmsFormat = coordinateConversion.toDMS(lat, lng)
console.log(dmsFormat) // "22° 48' 20.16" S, 43° 6' 28.80" W"

// Calculate optimal bounds for multiple points
const points = [L.latLng(-22.8, -43), L.latLng(-22.9, -43.1)]
const bounds = boundsUtils.calculateBounds(points)
const expandedBounds = boundsUtils.expandBounds(bounds, 0.2) // 20% padding

// Validate coordinate file
const fileContent = "-22.8 -43\\n-22.9 -43.1"
const validation = validators.validateCoordinateFile(fileContent)
if (validation.isValid) {
  console.log(\`Found \${validation.pointCount} valid points\`)
}

// Format distance for display
const distanceNM = 10.5
console.log(helpers.formatDistance(distanceNM, 'km')) // "19.4 km"
console.log(helpers.formatDistance(distanceNM, 'mi')) // "12.1 mi"

// Export layer data
const layerData = { points: [...], metadata: {...} }
helpers.downloadData(layerData, 'route-data.json', 'json')`} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Performance Considerations' : 'Considerações de Performance'}</h2>
        <ul>
          <li>{language === 'en' ? 'Use debounce for frequently called functions (map events, search inputs)' : 'Use debounce para funções chamadas frequentemente (eventos de mapa, inputs de busca)'}</li>
          <li>{language === 'en' ? 'Coordinate validation is optimized for batch processing' : 'Validação de coordenadas é otimizada para processamento em lote'}</li>
          <li>{language === 'en' ? 'Bounds calculations use efficient algorithms for large point sets' : 'Cálculos de limites usam algoritmos eficientes para grandes conjuntos de pontos'}</li>
          <li>{language === 'en' ? 'File validation includes size checks to prevent memory issues' : 'Validação de arquivo inclui verificações de tamanho para prevenir problemas de memória'}</li>
        </ul>
      </section>

      <DocsNavigation />
    </div>
  );
}