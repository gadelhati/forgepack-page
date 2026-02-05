import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function RoutePlanningExample() {
  const { language } = useLanguage();

  const interactiveRouteCode = `import React from 'react'
import { useMap, Menu } from '@forgepack/leaflet'

export const RouteDrawing = () => {
  const {
    map,
    layers,
    toggleFromMap,
    addPolyline,
    startDrawingRoute,
    finishDrawingRoute,
    cancelDrawingRoute,
    isDrawingRoute,
    routePoints
  } = useMap()

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
      
      {map && (
        <Menu
          map={map}
          toggleFromMap={toggleFromMap}
          addPolyline={addPolyline}
          startDrawingRoute={startDrawingRoute}
          finishDrawingRoute={finishDrawingRoute}
          cancelDrawingRoute={cancelDrawingRoute}
          isDrawingRoute={isDrawingRoute}
          routePoints={routePoints}
        />
      )}

      {/* Route drawing status */}
      {isDrawingRoute && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: '#3498db',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          zIndex: 1000
        }}>
          <h4>Drawing Route</h4>
          <p>Points: {routePoints.length}</p>
          <p>{routePoints.length >= 2 ? 'Click Route button to finish' : 'Click on map to add points'}</p>
        </div>
      )}
    </div>
  )
}`;

  const programmaticRouteCode = `import React from 'react'
import { useMap } from '@forgepack/leaflet'

export const ProgrammaticRoutes = () => {
  const { map, addPolyline, toggleFromMap } = useMap()

  const createPortRoute = () => {
    const route = [
      L.latLng(-22.8956, -43.1844), // Rio Port
      L.latLng(-23.0132, -43.3264), // Angra dos Reis
      L.latLng(-23.9608, -46.3081), // Santos Port
      L.latLng(-25.4195, -48.3830), // Paranaguá Port
    ]
    
    const routeLayer = addPolyline(route)
    toggleFromMap(routeLayer)
    
    // Fit map to show the entire route
    if (map && routeLayer.getBounds) {
      map.fitBounds(routeLayer.getBounds().pad(0.1))
    }
  }

  const createCoastalRoute = () => {
    const coastalPoints = [
      L.latLng(-22.7, -42.0),   // Starting point
      L.latLng(-22.8, -42.1),
      L.latLng(-22.9, -42.3),
      L.latLng(-23.0, -42.5),
      L.latLng(-23.2, -42.8),
      L.latLng(-23.5, -43.2),   // Ending point
    ]
    
    const coastalLayer = addPolyline(coastalPoints)
    toggleFromMap(coastalLayer)
  }

  const createMultiLegRoute = () => {
    // Create multiple connected route segments
    const leg1 = [
      L.latLng(-22.8, -43.0),
      L.latLng(-22.85, -43.05),
      L.latLng(-22.9, -43.1)
    ]
    
    const leg2 = [
      L.latLng(-22.9, -43.1),
      L.latLng(-22.95, -43.15),
      L.latLng(-23.0, -43.2)
    ]
    
    const leg1Layer = addPolyline(leg1)
    const leg2Layer = addPolyline(leg2)
    
    toggleFromMap(leg1Layer)
    toggleFromMap(leg2Layer)
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
      
      {map && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1000,
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <h3>Route Examples</h3>
          <button onClick={createPortRoute}>
            Port-to-Port Route
          </button>
          <button onClick={createCoastalRoute}>
            Coastal Navigation
          </button>
          <button onClick={createMultiLegRoute}>
            Multi-Leg Journey
          </button>
        </div>
      )}
    </div>
  )
}`;

  const fileRouteCode = `import React from 'react'
import { useMap, HandleInputFile } from '@forgepack/leaflet'

export const FileRoutes = () => {
  const { map, addPolyline, toggleFromMap } = useMap()

  const handleRouteFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (map) {
      const coordinates = await HandleInputFile({
        event,
        map,
        toggleFromMap,
        addPolyline
      })
      
      console.log(\`Route created with \${coordinates.length} waypoints\`)
    }
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
      
      {map && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1000,
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Upload Route</h3>
          <p>Select a file with waypoint coordinates:</p>
          <input
            type="file"
            accept=".txt,.csv,.gpx"
            onChange={handleRouteFile}
            style={{ marginTop: '10px' }}
          />
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            <strong>File format:</strong><br />
            One coordinate per line: lat lng<br />
            Example:<br />
            -22.8 -43.0<br />
            -22.85 -43.05<br />
            -22.9 -43.1
          </div>
        </div>
      )}
    </div>
  )
}`;

  const styledRouteCode = `import React from 'react'
import { useMap } from '@forgepack/leaflet'
import * as L from 'leaflet'

export const StyledRoutes = () => {
  const { map, createLayer, toggleFromMap } = useMap()

  const createStyledRoute = () => {
    const routePoints = [
      L.latLng(-22.8, -43.0),
      L.latLng(-22.85, -43.05),
      L.latLng(-22.9, -43.1)
    ]
    
    // Create custom styled polyline
    const styledRoute = L.polyline(
      routePoints.map(p => [p.lat, p.lng]),
      {
        color: '#e74c3c',
        weight: 6,
        opacity: 0.8,
        dashArray: '10, 5',
        lineCap: 'round',
        lineJoin: 'round'
      }
    )
    
    // Add start and end markers
    const startMarker = L.marker(routePoints[0], {
      icon: L.divIcon({
        className: 'start-marker',
        html: '🚢',
        iconSize: [30, 30]
      })
    })
    
    const endMarker = L.marker(routePoints[routePoints.length - 1], {
      icon: L.divIcon({
        className: 'end-marker',
        html: '🏁',
        iconSize: [30, 30]
      })
    })
    
    const styledLayer = createLayer([styledRoute, startMarker, endMarker])
    toggleFromMap(styledLayer)
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
      
      {map && (
        <button
          onClick={createStyledRoute}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1000,
            padding: '10px 20px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Styled Route
        </button>
      )}
    </div>
  )
}`;

  const detailedRouteCode = `import React from 'react'
import { useMap } from '@forgepack/leaflet'
import * as L from 'leaflet'

export const InformativeRoute = () => {
  const { map, createLayer, toggleFromMap } = useMap()

  const createDetailedRoute = () => {
    const waypoints = [
      { coords: L.latLng(-22.8956, -43.1844), name: "Rio Port", type: "port" },
      { coords: L.latLng(-22.9200, -43.2075), name: "Copacabana", type: "landmark" },
      { coords: L.latLng(-23.0132, -43.3264), name: "Angra dos Reis", type: "port" },
      { coords: L.latLng(-23.9608, -46.3081), name: "Santos Port", type: "port" }
    ]
    
    // Create the route line
    const routeLine = L.polyline(
      waypoints.map(wp => [wp.coords.lat, wp.coords.lng]),
      { color: '#3498db', weight: 4 }
    )
    
    // Create markers with popups
    const markers = waypoints.map(waypoint => {
      const icon = waypoint.type === 'port' ? '⚓' : '📍'
      
      return L.marker(waypoint.coords, {
        icon: L.divIcon({
          className: \`waypoint-\${waypoint.type}\`,
          html: icon,
          iconSize: [25, 25]
        })
      }).bindPopup(\`
        <div>
          <h4>\${waypoint.name}</h4>
          <p>Type: \${waypoint.type}</p>
          <p>Lat: \${waypoint.coords.lat.toFixed(4)}</p>
          <p>Lng: \${waypoint.coords.lng.toFixed(4)}</p>
        </div>
      \`)
    })
    
    // Add distance labels between waypoints
    const distanceLabels = []
    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = waypoints[i].coords
      const p2 = waypoints[i + 1].coords
      const distance = (p1.distanceTo(p2) / 1852).toFixed(1) // nautical miles
      const midpoint = L.latLng(
        (p1.lat + p2.lat) / 2,
        (p1.lng + p2.lng) / 2
      )
      
      const label = L.marker(midpoint, {
        icon: L.divIcon({
          className: 'distance-label',
          html: \`\${distance} NM\`,
          iconSize: [50, 20]
        })
      })
      
      distanceLabels.push(label)
    }
    
    const routeLayer = createLayer([routeLine, ...markers, ...distanceLabels])
    toggleFromMap(routeLayer)
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
      
      {map && (
        <button
          onClick={createDetailedRoute}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1000,
            padding: '10px 20px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Detailed Route
        </button>
      )}
    </div>
  )
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Route Planning' : 'Planejamento de Rotas'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Learn how to create interactive routes and navigation paths with distance calculations.'
            : 'Aprenda como criar rotas interativas e caminhos de navegação com cálculos de distância.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? 'Interactive Route Drawing' : 'Desenho Interativo de Rotas'}</h2>
        <p>
          {language === 'en' 
            ? 'Use the built-in route drawing functionality:'
            : 'Use a funcionalidade integrada de desenho de rotas:'
          }
        </p>
        <CodeBlock code={interactiveRouteCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Programmatic Route Creation' : 'Criação Programática de Rotas'}</h2>
        <p>
          {language === 'en' 
            ? 'Create routes from coordinate arrays with distance calculations:'
            : 'Crie rotas a partir de arrays de coordenadas com cálculos de distância:'
          }
        </p>
        <CodeBlock code={programmaticRouteCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Route from File Upload' : 'Rota a partir de Upload de Arquivo'}</h2>
        <p>
          {language === 'en' 
            ? 'Create routes from uploaded coordinate files:'
            : 'Crie rotas a partir de arquivos de coordenadas enviados:'
          }
        </p>
        <CodeBlock code={fileRouteCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Advanced Route Features' : 'Recursos Avançados de Rotas'}</h2>
        
        <h3>{language === 'en' ? 'Route with Custom Styling' : 'Rota com Estilo Personalizado'}</h3>
        <CodeBlock code={styledRouteCode} language="tsx" />

        <h3>{language === 'en' ? 'Route with Waypoint Information' : 'Rota com Informações de Pontos de Referência'}</h3>
        <CodeBlock code={detailedRouteCode} language="tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Distance Calculations' : 'Cálculos de Distância'}</h2>
        <p>
          {language === 'en' 
            ? 'The package automatically calculates and displays distances in nautical miles:'
            : 'O pacote calcula e exibe automaticamente distâncias em milhas náuticas:'
          }
        </p>
        <ul>
          <li><strong>{language === 'en' ? 'Segment Distances' : 'Distâncias dos Segmentos'}:</strong> {language === 'en' ? 'Shows distance between each pair of consecutive waypoints' : 'Mostra a distância entre cada par de pontos de referência consecutivos'}</li>
          <li><strong>{language === 'en' ? 'Total Distance' : 'Distância Total'}:</strong> {language === 'en' ? 'Calculate total route distance by summing segments' : 'Calcula a distância total da rota somando os segmentos'}</li>
          <li><strong>{language === 'en' ? 'Bearing Information' : 'Informações de Rumo'}:</strong> {language === 'en' ? 'Can be extended to show bearing between waypoints' : 'Pode ser estendido para mostrar o rumo entre pontos de referência'}</li>
          <li><strong>{language === 'en' ? 'ETA Calculations' : 'Cálculos de ETA'}:</strong> {language === 'en' ? 'Can be combined with speed data for arrival estimates' : 'Pode ser combinado com dados de velocidade para estimativas de chegada'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Key Features' : 'Recursos Principais'}</h2>
        <ul>
          <li>{language === 'en' ? 'Interactive route drawing with mouse clicks' : 'Desenho interativo de rotas com cliques do mouse'}</li>
          <li>{language === 'en' ? 'Programmatic route creation from coordinates' : 'Criação programática de rotas a partir de coordenadas'}</li>
          <li>{language === 'en' ? 'File upload support for GPX, TXT, and CSV formats' : 'Suporte para upload de arquivos nos formatos GPX, TXT e CSV'}</li>
          <li>{language === 'en' ? 'Automatic distance calculation in nautical miles' : 'Cálculo automático de distância em milhas náuticas'}</li>
          <li>{language === 'en' ? 'Custom styling options for routes' : 'Opções de estilo personalizado para rotas'}</li>
          <li>{language === 'en' ? 'Waypoint markers with popup information' : 'Marcadores de pontos de referência com informações em popup'}</li>
          <li>{language === 'en' ? 'Multi-leg route support' : 'Suporte para rotas de múltiplas etapas'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Next Steps' : 'Próximos Passos'}</h2>
        <ul>
          <li>
            <Link to="/docs/leaflet/examples/image-overlays">
              {language === 'en' ? 'Image Overlays' : 'Sobreposições de Imagem'}
            </Link> - {language === 'en' ? 'Add charts and nautical overlays' : 'Adicione cartas e sobreposições náuticas'}
          </li>
          <li>
            <Link to="/docs/leaflet/reference/components">
              {language === 'en' ? 'Components API' : 'API dos Componentes'}
            </Link> - {language === 'en' ? 'Detailed component and hook documentation' : 'Documentação detalhada dos componentes e hooks'}
          </li>
          <li>
            <Link to="/docs/leaflet/reference/hooks">
              {language === 'en' ? 'Hooks API' : 'API dos Hooks'}
            </Link> - {language === 'en' ? 'Learn about useMap hook functionality' : 'Aprenda sobre a funcionalidade do hook useMap'}
          </li>
        </ul>
      </section>

      <nav className="docs-nav">
        <Link to="/docs/leaflet/examples/markers" className="docs-nav-link">
          <span className="docs-nav-label">{language === 'en' ? 'Previous' : 'Anterior'}</span>
          <span className="docs-nav-title">{language === 'en' ? 'Markers Examples' : 'Exemplos de Marcadores'}</span>
        </Link>
        <Link to="/docs/leaflet/examples/image-overlays" className="docs-nav-link next">
          <span className="docs-nav-label">{language === 'en' ? 'Next' : 'Próximo'}</span>
          <span className="docs-nav-title">{language === 'en' ? 'Image Overlays' : 'Sobreposições de Imagem'}</span>
        </Link>
      </nav>
    </div>
  );
}