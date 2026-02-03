import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function LeafletBasicMapExample() {
  const { language } = useLanguage();

  const basicMapCode = `import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from '@forgepack/leaflet';
import 'leaflet/dist/leaflet.css';

export function BasicMapExample() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[-14.2350, -51.9253]} // Centro do Brasil
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Camada de tiles do OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcadores das principais cidades */}
        <Marker position={[-23.5505, -46.6333]}>
          <Popup>
            <div>
              <h3>São Paulo</h3>
              <p>A maior cidade do Brasil 🏙️</p>
              <p>População: ~12 milhões</p>
            </div>
          </Popup>
        </Marker>
        
        <Marker position={[-22.9068, -43.1729]}>
          <Popup>
            <div>
              <h3>Rio de Janeiro</h3>
              <p>Cidade Maravilhosa 🏖️</p>
              <p>População: ~6.7 milhões</p>
            </div>
          </Popup>
        </Marker>
        
        <Marker position={[-15.7801, -47.9292]}>
          <Popup>
            <div>
              <h3>Brasília</h3>
              <p>Capital do Brasil 🏛️</p>
              <p>População: ~3.1 milhões</p>
            </div>
          </Popup>
        </Marker>
        
        <Marker position={[-12.9714, -38.5014]}>
          <Popup>
            <div>
              <h3>Salvador</h3>
              <p>Capital da Bahia 🥥</p>
              <p>População: ~2.9 milhões</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}`;

  const customIconCode = `import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from '@forgepack/leaflet';
import L from 'leaflet';

// Criar ícones customizados
const createCustomIcon = (iconUrl: string, size: [number, number] = [32, 32]) => {
  return new L.Icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });
};

const cityIcon = createCustomIcon('/icons/city.png', [24, 24]);
const portIcon = createCustomIcon('/icons/port.png', [28, 28]);
const airportIcon = createCustomIcon('/icons/airport.png', [26, 26]);

export function CustomIconsMap() {
  return (
    <MapContainer center={[-14.2350, -51.9253]} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      {/* Cidades com ícone de cidade */}
      <Marker position={[-23.5505, -46.6333]} icon={cityIcon}>
        <Popup>São Paulo - Maior cidade</Popup>
      </Marker>
      
      {/* Portos com ícone de porto */}
      <Marker position={[-23.9618, -46.3322]} icon={portIcon}>
        <Popup>Porto de Santos - Maior porto da América Latina</Popup>
      </Marker>
      
      {/* Aeroportos com ícone de aeroporto */}
      <Marker position={[-23.4356, -46.4731]} icon={airportIcon}>
        <Popup>Aeroporto de Guarulhos</Popup>
      </Marker>
    </MapContainer>
  );
}`;

  const responsiveMapCode = `import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from '@forgepack/leaflet';

// Hook para tornar o mapa responsivo
function useResponsiveMap() {
  const [mapSize, setMapSize] = useState({ width: '100%', height: '400px' });
  
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setMapSize({ width: '100%', height: '300px' });
      } else if (width < 1024) {
        setMapSize({ width: '100%', height: '400px' });
      } else {
        setMapSize({ width: '100%', height: '500px' });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return mapSize;
}

// Componente para invalidar o tamanho do mapa quando o container muda
function MapResizeHandler() {
  const map = useMap();
  
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return null;
}

export function ResponsiveMap() {
  const mapSize = useResponsiveMap();
  
  return (
    <div style={mapSize}>
      <MapContainer
        center={[-14.2350, -51.9253]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        <MapResizeHandler />
        
        <Marker position={[-23.5505, -46.6333]}>
          <Popup>São Paulo</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}`;

  const multipleBaseMapsCode = `import React, { useState } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from '@forgepack/leaflet';

export function MultipleBaseMapsExample() {
  const [currentBaseMap, setCurrentBaseMap] = useState('openstreetmap');

  const baseMaps = {
    openstreetmap: {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    },
    satellite: {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
    },
    terrain: {
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenTopoMap contributors'
    },
    maritime: {
      name: 'Maritime',
      url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
      attribution: '&copy; OpenSeaMap contributors'
    }
  };

  return (
    <div>
      {/* Seletor de camada base */}
      <div style={{ padding: '10px', background: '#f5f5f5', marginBottom: '10px' }}>
        <label>Camada Base: </label>
        <select 
          value={currentBaseMap} 
          onChange={(e) => setCurrentBaseMap(e.target.value)}
        >
          {Object.entries(baseMaps).map(([key, map]) => (
            <option key={key} value={key}>{map.name}</option>
          ))}
        </select>
      </div>

      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={[-23.9618, -46.3322]} // Porto de Santos
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <LayersControl position="topright">
            {Object.entries(baseMaps).map(([key, map]) => (
              <LayersControl.BaseLayer 
                key={key} 
                checked={key === currentBaseMap} 
                name={map.name}
              >
                <TileLayer
                  url={map.url}
                  attribution={map.attribution}
                />
              </LayersControl.BaseLayer>
            ))}
          </LayersControl>
          
          {/* Marcadores para portos brasileiros */}
          <Marker position={[-23.9618, -46.3322]}>
            <Popup>
              <div>
                <h3>Porto de Santos</h3>
                <p>Maior porto da América Latina 🚢</p>
              </div>
            </Popup>
          </Marker>
          
          <Marker position={[-22.8747, -42.0287]}>
            <Popup>
              <div>
                <h3>Porto do Rio de Janeiro</h3>
                <p>Importante porto do Sudeste 🚢</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Basic Map Setup' : 'Configuração Básica de Mapa'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Complete examples showing how to create and customize basic interactive maps.'
            : 'Exemplos completos mostrando como criar e personalizar mapas interativos básicos.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? '🗺️ Simple Map with Markers' : '🗺️ Mapa Simples com Marcadores'}</h2>
        <p>
          {language === 'en' 
            ? 'This example shows a basic map of Brazil with markers for major cities:'
            : 'Este exemplo mostra um mapa básico do Brasil com marcadores para as principais cidades:'
          }
        </p>
        <CodeBlock language="tsx" code={basicMapCode} />
        
        <div className="callout callout-tip">
          <h4>💡 {language === 'en' ? 'Key Features' : 'Recursos Principais'}</h4>
          <ul>
            <li><strong>{language === 'en' ? 'Center and Zoom' : 'Centro e Zoom'}:</strong> {language === 'en' ? 'Set initial map position' : 'Define a posição inicial do mapa'}</li>
            <li><strong>{language === 'en' ? 'TileLayer' : 'Camada de Tiles'}:</strong> {language === 'en' ? 'Choose map style (street, satellite, etc.)' : 'Escolha o estilo do mapa (ruas, satélite, etc.)'}</li>
            <li><strong>{language === 'en' ? 'Interactive Popups' : 'Popups Interativos'}:</strong> {language === 'en' ? 'Rich content in marker popups' : 'Conteúdo rico nos popups dos marcadores'}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🎨 Custom Icons' : '🎨 Ícones Personalizados'}</h2>
        <p>
          {language === 'en' 
            ? 'Enhance your maps with custom icons for different types of locations:'
            : 'Melhore seus mapas com ícones personalizados para diferentes tipos de locais:'
          }
        </p>
        <CodeBlock language="tsx" code={customIconCode} />
        
        <div className="callout callout-info">
          <h4>📝 {language === 'en' ? 'Icon Guidelines' : 'Diretrizes de Ícones'}</h4>
          <ul>
            <li>{language === 'en' ? 'Use PNG format with transparency' : 'Use formato PNG com transparência'}</li>
            <li>{language === 'en' ? 'Recommended size: 24x24 to 32x32 pixels' : 'Tamanho recomendado: 24x24 a 32x32 pixels'}</li>
            <li>{language === 'en' ? 'Set proper anchor points for accurate positioning' : 'Configure pontos de ancoragem adequados para posicionamento preciso'}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '📱 Responsive Map' : '📱 Mapa Responsivo'}</h2>
        <p>
          {language === 'en' 
            ? 'Create maps that adapt to different screen sizes:'
            : 'Crie mapas que se adaptam a diferentes tamanhos de tela:'
          }
        </p>
        <CodeBlock language="tsx" code={responsiveMapCode} />
        
        <div className="callout callout-success">
          <h4>📐 {language === 'en' ? 'Responsive Best Practices' : 'Melhores Práticas Responsivas'}</h4>
          <ul>
            <li>{language === 'en' ? 'Always call invalidateSize() after container resize' : 'Sempre chame invalidateSize() após redimensionar o container'}</li>
            <li>{language === 'en' ? 'Use percentage-based widths when possible' : 'Use larguras baseadas em porcentagem quando possível'}</li>
            <li>{language === 'en' ? 'Adjust map height based on screen size' : 'Ajuste a altura do mapa baseada no tamanho da tela'}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🌍 Multiple Base Maps' : '🌍 Múltiplas Camadas Base'}</h2>
        <p>
          {language === 'en' 
            ? 'Allow users to switch between different map styles:'
            : 'Permita que usuários alternem entre diferentes estilos de mapa:'
          }
        </p>
        <CodeBlock language="tsx" code={multipleBaseMapsCode} />
        
        <div className="callout callout-warning">
          <h4>⚠️ {language === 'en' ? 'Attribution Requirements' : 'Requisitos de Atribuição'}</h4>
          <p>
            {language === 'en' 
              ? 'Always include proper attribution for tile providers. Different providers have different license requirements.'
              : 'Sempre inclua atribuição adequada para provedores de tiles. Diferentes provedores têm diferentes requisitos de licença.'
            }
          </p>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🛠️ Common Configuration Options' : '🛠️ Opções de Configuração Comuns'}</h2>
        
        <h3>{language === 'en' ? 'MapContainer Props' : 'Props do MapContainer'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Property' : 'Propriedade'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>center</code></td>
                <td><code>[lat, lng]</code></td>
                <td>{language === 'en' ? 'Initial map center coordinates' : 'Coordenadas do centro inicial do mapa'}</td>
              </tr>
              <tr>
                <td><code>zoom</code></td>
                <td><code>number</code></td>
                <td>{language === 'en' ? 'Initial zoom level (0-18)' : 'Nível de zoom inicial (0-18)'}</td>
              </tr>
              <tr>
                <td><code>minZoom</code></td>
                <td><code>number</code></td>
                <td>{language === 'en' ? 'Minimum allowed zoom level' : 'Nível mínimo de zoom permitido'}</td>
              </tr>
              <tr>
                <td><code>maxZoom</code></td>
                <td><code>number</code></td>
                <td>{language === 'en' ? 'Maximum allowed zoom level' : 'Nível máximo de zoom permitido'}</td>
              </tr>
              <tr>
                <td><code>scrollWheelZoom</code></td>
                <td><code>boolean</code></td>
                <td>{language === 'en' ? 'Enable zoom with mouse wheel' : 'Habilitar zoom com roda do mouse'}</td>
              </tr>
              <tr>
                <td><code>dragging</code></td>
                <td><code>boolean</code></td>
                <td>{language === 'en' ? 'Enable map dragging' : 'Habilitar arrastar o mapa'}</td>
              </tr>
              <tr>
                <td><code>zoomControl</code></td>
                <td><code>boolean</code></td>
                <td>{language === 'en' ? 'Show zoom control buttons' : 'Mostrar botões de controle de zoom'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>{language === 'en' ? 'Example Configuration' : 'Exemplo de Configuração'}</h3>
        <CodeBlock 
          language="tsx" 
          code={`<MapContainer
  center={[-23.5505, -46.6333]}
  zoom={10}
  minZoom={3}
  maxZoom={18}
  scrollWheelZoom={true}
  dragging={true}
  zoomControl={true}
  style={{ height: '500px', width: '100%' }}
>
  {/* Map content */}
</MapContainer>`} 
        />
      </section>

      <section>
        <h2>{language === 'en' ? '🚀 Next Steps' : '🚀 Próximos Passos'}</h2>
        <ul>
          <li>
            <a href="/docs/leaflet/examples/markers">
              {language === 'en' ? 'Marker Management' : 'Gerenciamento de Marcadores'}
            </a> - 
            {language === 'en' 
              ? ' Advanced marker features and clustering'
              : ' Recursos avançados de marcadores e agrupamento'
            }
          </li>
          <li>
            <a href="/docs/leaflet/layer-management">
              {language === 'en' ? 'Layer Management' : 'Gerenciamento de Camadas'}
            </a> - 
            {language === 'en' 
              ? ' Organize and control map layers'
              : ' Organize e controle camadas do mapa'
            }
          </li>
          <li>
            <a href="/docs/leaflet/styling">
              {language === 'en' ? 'Styling & Theming' : 'Estilo e Temas'}
            </a> - 
            {language === 'en' 
              ? ' Customize map appearance'
              : ' Personalize a aparência do mapa'
            }
          </li>
        </ul>
      </section>
    </div>
  );
}