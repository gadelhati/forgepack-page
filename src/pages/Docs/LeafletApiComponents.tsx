import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function LeafletApiComponents() {
  const { language } = useLanguage();

  const mapContainerCode = `import { MapContainer } from '@forgepack/leaflet';

<MapContainer
  center={[lat, lng]}
  zoom={13}
  style={{ height: '500px', width: '100%' }}
  minZoom={3}
  maxZoom={18}
  scrollWheelZoom={true}
  dragging={true}
  zoomControl={true}
>
  {/* Child components */}
</MapContainer>`;

  const tileLayerCode = `import { TileLayer } from '@forgepack/leaflet';

{/* OpenStreetMap */}
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; OpenStreetMap contributors'
  maxZoom={19}
/>

{/* Satellite imagery */}
<TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution='&copy; Esri'
  maxZoom={18}
/>

{/* Maritime charts */}
<TileLayer
  url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
  attribution='&copy; OpenSeaMap contributors'
  opacity={0.8}
/>`;

  const markerCode = `import { Marker, Popup } from '@forgepack/leaflet';
import L from 'leaflet';

// Custom icon
const customIcon = new L.Icon({
  iconUrl: '/icons/ship.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

<Marker 
  position={[lat, lng]}
  icon={customIcon}
  draggable={true}
  opacity={0.8}
  eventHandlers={{
    click: (e) => console.log('Marker clicked'),
    dragend: (e) => console.log('Marker moved to', e.target.getLatLng()),
  }}
>
  <Popup>
    <div>
      <h3>Ship Location</h3>
      <p>Current position: {lat}, {lng}</p>
    </div>
  </Popup>
</Marker>`;

  const layerGroupCode = `import { LayerGroup, LayersControl, Circle, Polyline } from '@forgepack/leaflet';

<LayersControl position="topright">
  <LayersControl.Overlay checked name="Shipping Routes">
    <LayerGroup>
      <Polyline
        positions={routeCoordinates}
        pathOptions={{ color: 'blue', weight: 4 }}
      />
      <Circle
        center={[port.lat, port.lng]}
        radius={5000}
        pathOptions={{ color: 'red', fillColor: 'pink' }}
      />
    </LayerGroup>
  </LayersControl.Overlay>
  
  <LayersControl.Overlay name="Weather Data">
    <LayerGroup>
      {/* Weather markers and overlays */}
    </LayerGroup>
  </LayersControl.Overlay>
</LayersControl>`;

  const drawingControlsCode = `import { DrawingControl } from '@forgepack/leaflet';

<DrawingControl
  position="topleft"
  enabledTools={['polyline', 'polygon', 'marker', 'circle']}
  onCreated={(e) => {
    console.log('Shape created:', e.layer);
  }}
  onEdited={(e) => {
    console.log('Shapes edited:', e.layers);
  }}
  onDeleted={(e) => {
    console.log('Shapes deleted:', e.layers);
  }}
  drawOptions={{
    polyline: {
      shapeOptions: { color: 'red', weight: 3 }
    },
    polygon: {
      shapeOptions: { color: 'blue', fillOpacity: 0.3 }
    },
    circle: {
      shapeOptions: { color: 'green' }
    }
  }}
/>`;

  const fileProcessorCode = `import { FileProcessor } from '@forgepack/leaflet';

<FileProcessor
  acceptedFileTypes={['.txt', '.csv', '.gpx', '.kml']}
  onFileProcessed={(layers) => {
    console.log('Processed layers:', layers);
  }}
  onError={(error) => {
    console.error('File processing error:', error);
  }}
  processingOptions={{
    coordinateFormat: 'decimal', // or 'dms'
    separator: ',',
    hasHeader: true
  }}
/>`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Components API Reference' : 'Referência da API de Componentes'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Complete reference for all @forgepack/leaflet React components and their props.'
            : 'Referência completa para todos os componentes React do @forgepack/leaflet e suas propriedades.'
          }
        </p>
      </header>

      <section>
        <h2>MapContainer</h2>
        <p>
          {language === 'en' 
            ? 'The main map component that creates and manages the Leaflet map instance.'
            : 'O componente principal do mapa que cria e gerencia a instância do mapa Leaflet.'
          }
        </p>
        
        <CodeBlock language="tsx" code={mapContainerCode} />

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Prop' : 'Prop'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>center</code></td>
                <td><code>[number, number]</code></td>
                <td><code>[0, 0]</code></td>
                <td>{language === 'en' ? 'Initial map center [latitude, longitude]' : 'Centro inicial do mapa [latitude, longitude]'}</td>
              </tr>
              <tr>
                <td><code>zoom</code></td>
                <td><code>number</code></td>
                <td><code>13</code></td>
                <td>{language === 'en' ? 'Initial zoom level (0-18)' : 'Nível de zoom inicial (0-18)'}</td>
              </tr>
              <tr>
                <td><code>style</code></td>
                <td><code>CSSProperties</code></td>
                <td><code>{}</code></td>
                <td>{language === 'en' ? 'CSS styles for the map container' : 'Estilos CSS para o container do mapa'}</td>
              </tr>
              <tr>
                <td><code>minZoom</code></td>
                <td><code>number</code></td>
                <td><code>0</code></td>
                <td>{language === 'en' ? 'Minimum zoom level' : 'Nível mínimo de zoom'}</td>
              </tr>
              <tr>
                <td><code>maxZoom</code></td>
                <td><code>number</code></td>
                <td><code>18</code></td>
                <td>{language === 'en' ? 'Maximum zoom level' : 'Nível máximo de zoom'}</td>
              </tr>
              <tr>
                <td><code>scrollWheelZoom</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>{language === 'en' ? 'Enable/disable zoom with mouse wheel' : 'Habilitar/desabilitar zoom com roda do mouse'}</td>
              </tr>
              <tr>
                <td><code>dragging</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>{language === 'en' ? 'Enable/disable map dragging' : 'Habilitar/desabilitar arrastar o mapa'}</td>
              </tr>
              <tr>
                <td><code>zoomControl</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>{language === 'en' ? 'Show/hide zoom control buttons' : 'Mostrar/ocultar botões de controle de zoom'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>TileLayer</h2>
        <p>
          {language === 'en' 
            ? 'Provides map tiles from various sources (OpenStreetMap, satellite imagery, etc.).'
            : 'Fornece tiles de mapa de várias fontes (OpenStreetMap, imagens de satélite, etc.).'
          }
        </p>
        
        <CodeBlock language="tsx" code={tileLayerCode} />

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Prop' : 'Prop'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>url</code> *</td>
                <td><code>string</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Tile server URL template' : 'Template da URL do servidor de tiles'}</td>
              </tr>
              <tr>
                <td><code>attribution</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>{language === 'en' ? 'Attribution text for the tile provider' : 'Texto de atribuição para o provedor de tiles'}</td>
              </tr>
              <tr>
                <td><code>opacity</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>{language === 'en' ? 'Layer opacity (0-1)' : 'Opacidade da camada (0-1)'}</td>
              </tr>
              <tr>
                <td><code>maxZoom</code></td>
                <td><code>number</code></td>
                <td><code>18</code></td>
                <td>{language === 'en' ? 'Maximum zoom level for this layer' : 'Nível máximo de zoom para esta camada'}</td>
              </tr>
              <tr>
                <td><code>zIndex</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>{language === 'en' ? 'Layer stacking order' : 'Ordem de empilhamento da camada'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <h4>🌍 {language === 'en' ? 'Popular Tile Providers' : 'Provedores de Tiles Populares'}</h4>
          <ul>
            <li><strong>OpenStreetMap:</strong> https://{'{s}'}.tile.openstreetmap.org/{'{z}'}/{'{x}'}/{'{y}'}.png</li>
            <li><strong>Satellite (Esri):</strong> https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{'{z}'}/{'{y}'}/{'{x}'}</li>
            <li><strong>OpenSeaMap:</strong> https://tiles.openseamap.org/seamark/{'{z}'}/{'{x}'}/{'{y}'}.png</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Marker</h2>
        <p>
          {language === 'en' 
            ? 'Places interactive markers on the map with optional popups and custom icons.'
            : 'Coloca marcadores interativos no mapa com popups opcionais e ícones personalizados.'
          }
        </p>
        
        <CodeBlock language="tsx" code={markerCode} />

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Prop' : 'Prop'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>position</code> *</td>
                <td><code>[number, number]</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Marker position [latitude, longitude]' : 'Posição do marcador [latitude, longitude]'}</td>
              </tr>
              <tr>
                <td><code>icon</code></td>
                <td><code>L.Icon</code></td>
                <td>default</td>
                <td>{language === 'en' ? 'Custom icon for the marker' : 'Ícone personalizado para o marcador'}</td>
              </tr>
              <tr>
                <td><code>draggable</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{language === 'en' ? 'Enable marker dragging' : 'Habilitar arrastar o marcador'}</td>
              </tr>
              <tr>
                <td><code>opacity</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>{language === 'en' ? 'Marker opacity (0-1)' : 'Opacidade do marcador (0-1)'}</td>
              </tr>
              <tr>
                <td><code>eventHandlers</code></td>
                <td><code>object</code></td>
                <td><code>{}</code></td>
                <td>{language === 'en' ? 'Event handlers (click, dragend, etc.)' : 'Manipuladores de eventos (click, dragend, etc.)'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>LayerGroup & LayersControl</h2>
        <p>
          {language === 'en' 
            ? 'Organize and control multiple map layers with toggleable visibility.'
            : 'Organize e controle múltiplas camadas de mapa com visibilidade alternável.'
          }
        </p>
        
        <CodeBlock language="tsx" code={layerGroupCode} />

        <h3>LayersControl {language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Prop' : 'Prop'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>position</code></td>
                <td><code>ControlPosition</code></td>
                <td><code>'topright'</code></td>
                <td>{language === 'en' ? 'Control panel position' : 'Posição do painel de controle'}</td>
              </tr>
              <tr>
                <td><code>collapsed</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>{language === 'en' ? 'Start collapsed on desktop' : 'Iniciar recolhido no desktop'}</td>
              </tr>
              <tr>
                <td><code>autoZIndex</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>{language === 'en' ? 'Auto-manage layer z-index' : 'Gerenciar automaticamente z-index da camada'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>DrawingControl</h2>
        <p>
          {language === 'en' 
            ? 'Advanced drawing tools for creating routes, areas, and annotations.'
            : 'Ferramentas avançadas de desenho para criar rotas, áreas e anotações.'
          }
        </p>
        
        <CodeBlock language="tsx" code={drawingControlsCode} />

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Prop' : 'Prop'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>position</code></td>
                <td><code>ControlPosition</code></td>
                <td><code>'topleft'</code></td>
                <td>{language === 'en' ? 'Drawing control position' : 'Posição do controle de desenho'}</td>
              </tr>
              <tr>
                <td><code>enabledTools</code></td>
                <td><code>string[]</code></td>
                <td><code>['polyline']</code></td>
                <td>{language === 'en' ? 'Available drawing tools' : 'Ferramentas de desenho disponíveis'}</td>
              </tr>
              <tr>
                <td><code>onCreated</code></td>
                <td><code>function</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Callback when shape is created' : 'Callback quando forma é criada'}</td>
              </tr>
              <tr>
                <td><code>onEdited</code></td>
                <td><code>function</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Callback when shapes are edited' : 'Callback quando formas são editadas'}</td>
              </tr>
              <tr>
                <td><code>onDeleted</code></td>
                <td><code>function</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Callback when shapes are deleted' : 'Callback quando formas são deletadas'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>FileProcessor</h2>
        <p>
          {language === 'en' 
            ? 'Process and display coordinate files and georeferenced images on the map.'
            : 'Processe e exiba arquivos de coordenadas e imagens georreferenciadas no mapa.'
          }
        </p>
        
        <CodeBlock language="tsx" code={fileProcessorCode} />

        <h3>{language === 'en' ? 'Props' : 'Propriedades'}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'Prop' : 'Prop'}</th>
                <th>{language === 'en' ? 'Type' : 'Tipo'}</th>
                <th>{language === 'en' ? 'Default' : 'Padrão'}</th>
                <th>{language === 'en' ? 'Description' : 'Descrição'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>acceptedFileTypes</code></td>
                <td><code>string[]</code></td>
                <td><code>['.txt', '.csv']</code></td>
                <td>{language === 'en' ? 'Accepted file extensions' : 'Extensões de arquivo aceitas'}</td>
              </tr>
              <tr>
                <td><code>onFileProcessed</code></td>
                <td><code>function</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Callback with processed layers' : 'Callback com camadas processadas'}</td>
              </tr>
              <tr>
                <td><code>onError</code></td>
                <td><code>function</code></td>
                <td>-</td>
                <td>{language === 'en' ? 'Error handling callback' : 'Callback para tratamento de erros'}</td>
              </tr>
              <tr>
                <td><code>processingOptions</code></td>
                <td><code>object</code></td>
                <td><code>{}</code></td>
                <td>{language === 'en' ? 'File processing configuration' : 'Configuração de processamento de arquivo'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🔗 Related Documentation' : '🔗 Documentação Relacionada'}</h2>
        <ul>
          <li>
            <a href="/docs/leaflet/api/hooks">
              {language === 'en' ? 'Hooks API Reference' : 'Referência da API de Hooks'}
            </a> - 
            {language === 'en' 
              ? ' React hooks for map interactions'
              : ' Hooks React para interações com mapas'
            }
          </li>
          <li>
            <a href="/docs/leaflet/api/utilities">
              {language === 'en' ? 'Utilities API Reference' : 'Referência da API de Utilitários'}
            </a> - 
            {language === 'en' 
              ? ' Helper functions and utilities'
              : ' Funções auxiliares e utilitários'
            }
          </li>
          <li>
            <a href="/docs/leaflet/api/types">
              {language === 'en' ? 'TypeScript Types' : 'Tipos TypeScript'}
            </a> - 
            {language === 'en' 
              ? ' Complete type definitions'
              : ' Definições de tipos completas'
            }
          </li>
        </ul>
      </section>
    </div>
  );
}