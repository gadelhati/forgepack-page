import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';
import { DocsNavigation } from '@/components/DocsNavigation/DocsNavigation';

export function MarkersExample() {
  const { language } = useLanguage();

  const basicMarkersCode = `import React from 'react'
import { useMap } from '@forgepack/leaflet'

export const BasicMarkers = () => {
  const { map, addMarkers, toggleFromMap } = useMap()

  const addPortMarkers = () => {
    const ports = [
      L.latLng(-22.8956, -43.1844), // Port of Rio
      L.latLng(-23.9608, -46.3081), // Port of Santos  
      L.latLng(-20.3155, -40.2872), // Port of Vitória
    ]
    
    const markerLayer = addMarkers(ports)
    toggleFromMap(markerLayer)
  }

  const addLighthouseMarkers = () => {
    const lighthouses = [
      L.latLng(-22.8156, -43.1078), // Sugarloaf Lighthouse
      L.latLng(-22.9068, -43.1729), // Copacabana Lighthouse
      L.latLng(-22.9519, -43.1614), // Ipanema Lighthouse
    ]
    
    const lighthouseLayer = addMarkers(lighthouses)
    toggleFromMap(lighthouseLayer)
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
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button onClick={addPortMarkers}>
            Add Ports
          </button>
          <button onClick={addLighthouseMarkers}>
            Add Lighthouses
          </button>
        </div>
      )}
    </div>
  )
}`;

  const fileMarkersCode = `import React from 'react'
import { useMap, HandleInputFile } from '@forgepack/leaflet'

export const FileMarkers = () => {
  const { map, addMarkers, toggleFromMap } = useMap()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (map) {
      await HandleInputFile({
        event,
        map,
        toggleFromMap,
        addMarkers
      })
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
          <h3>Upload Coordinates</h3>
          <p>Select a text file with lat/lng coordinates:</p>
          <input
            type="file"
            accept=".txt,.csv"
            onChange={handleFileUpload}
            style={{ marginTop: '10px' }}
          />
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Format: One coordinate per line<br />
            Example: -22.8 -43.0
          </div>
        </div>
      )}
    </div>
  )
}`;

  const interactiveMarkersCode = `import React, { useState, useCallback } from 'react'
import { useMap } from '@forgepack/leaflet'

export const InteractiveMarkers = () => {
  const { map, addMarkers, toggleFromMap } = useMap()
  const [isAddingMarkers, setIsAddingMarkers] = useState(false)
  const [clickedPoints, setClickedPoints] = useState<L.LatLng[]>([])

  const startAddingMarkers = useCallback(() => {
    if (!map) return
    
    setIsAddingMarkers(true)
    map.getContainer().style.cursor = 'crosshair'
    
    const onMapClick = (e: L.LeafletMouseEvent) => {
      setClickedPoints(prev => [...prev, e.latlng])
    }
    
    map.on('click', onMapClick)
    
    // Store the event handler for cleanup
    ;(map as any)._clickHandler = onMapClick
  }, [map])

  const finishAddingMarkers = useCallback(() => {
    if (!map || clickedPoints.length === 0) return
    
    setIsAddingMarkers(false)
    map.getContainer().style.cursor = ''
    
    // Remove click handler
    if ((map as any)._clickHandler) {
      map.off('click', (map as any)._clickHandler)
      delete (map as any)._clickHandler
    }
    
    // Create marker layer from clicked points
    const markerLayer = addMarkers(clickedPoints)
    toggleFromMap(markerLayer)
    
    // Clear clicked points
    setClickedPoints([])
  }, [map, clickedPoints, addMarkers, toggleFromMap])

  const cancelAddingMarkers = useCallback(() => {
    if (!map) return
    
    setIsAddingMarkers(false)
    map.getContainer().style.cursor = ''
    
    // Remove click handler
    if ((map as any)._clickHandler) {
      map.off('click', (map as any)._clickHandler)
      delete (map as any)._clickHandler
    }
    
    setClickedPoints([])
  }, [map])

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
          <h3>Interactive Markers</h3>
          {!isAddingMarkers ? (
            <button onClick={startAddingMarkers}>
              Start Adding Markers
            </button>
          ) : (
            <div>
              <p>Click on the map to add markers</p>
              <p>Points added: {clickedPoints.length}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={finishAddingMarkers}
                  disabled={clickedPoints.length === 0}
                >
                  Finish ({clickedPoints.length})
                </button>
                <button onClick={cancelAddingMarkers}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Marker Management' : 'Gerenciamento de Marcadores'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Learn how to create, manage, and interact with markers on your map.'
            : 'Aprenda como criar, gerenciar e interagir com marcadores em seu mapa.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? 'Basic Markers' : 'Marcadores Básicos'}</h2>
        <p>
          {language === 'en' 
            ? 'Create simple markers from coordinate arrays:'
            : 'Crie marcadores simples a partir de arrays de coordenadas:'
          }
        </p>
        <CodeBlock code={basicMarkersCode} language="tsx" filename="BasicMarkers.tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Markers from File Upload' : 'Marcadores a partir de Upload de Arquivo'}</h2>
        <p>
          {language === 'en' 
            ? 'Create markers by uploading coordinate files:'
            : 'Crie marcadores fazendo upload de arquivos de coordenadas:'
          }
        </p>
        <CodeBlock code={fileMarkersCode} language="tsx" filename="FileMarkersLoader.tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Interactive Marker Creation' : 'Criação Interativa de Marcadores'}</h2>
        <p>
          {language === 'en' 
            ? 'Let users click on the map to create markers:'
            : 'Permita que os usuários cliquem no mapa para criar marcadores:'
          }
        </p>
        <CodeBlock code={interactiveMarkersCode} language="tsx" filename="InteractiveMarkers.tsx" />
      </section>

      <section>
        <h2>{language === 'en' ? 'Key Features' : 'Recursos Principais'}</h2>
        <ul>
          <li>{language === 'en' ? 'Add markers from coordinate arrays' : 'Adicionar marcadores a partir de arrays de coordenadas'}</li>
          <li>{language === 'en' ? 'Upload coordinate files (.txt, .csv)' : 'Upload de arquivos de coordenadas (.txt, .csv)'}</li>
          <li>{language === 'en' ? 'Interactive marker placement by clicking' : 'Posicionamento interativo de marcadores por clique'}</li>
          <li>{language === 'en' ? 'Automatic layer management' : 'Gerenciamento automático de camadas'}</li>
          <li>{language === 'en' ? 'Support for different marker types (ports, lighthouses, etc.)' : 'Suporte para diferentes tipos de marcadores (portos, faróis, etc.)'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'File Format Examples' : 'Exemplos de Formato de Arquivo'}</h2>
        <h3>{language === 'en' ? 'Coordinate File (.txt)' : 'Arquivo de Coordenadas (.txt)'}</h3>
        <CodeBlock code={`-22.8956 -43.1844
-23.9608 -46.3081
-20.3155 -40.2872`} language="text" />
        
        <h3>{language === 'en' ? 'CSV File (.csv)' : 'Arquivo CSV (.csv)'}</h3>
        <CodeBlock code={`lat,lng,name
-22.8956,-43.1844,"Port of Rio"
-23.9608,-46.3081,"Port of Santos"
-20.3155,-40.2872,"Port of Vitória"`} language="csv" />
      </section>

      <DocsNavigation />
    </div>
  );
}