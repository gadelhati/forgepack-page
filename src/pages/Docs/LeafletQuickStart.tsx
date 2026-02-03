import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function LeafletQuickStart() {
  const { language } = useLanguage();

  const basicMapCode = `import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from '@forgepack/leaflet';
import 'leaflet/dist/leaflet.css';

export function MyFirstMap() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[-14.2350, -51.9253]} // Centro do Brasil
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Marcador em Brasília */}
        <Marker position={[-15.7801, -47.9292]}>
          <Popup>
            <div>
              <h3>Brasília</h3>
              <p>Capital do Brasil 🇧🇷</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Marcador no Rio de Janeiro */}
        <Marker position={[-22.9068, -43.1729]}>
          <Popup>
            <div>
              <h3>Rio de Janeiro</h3>
              <p>Cidade Maravilhosa 🏖️</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}`;

  const layerManagementCode = `import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  LayerGroup,
  LayerControl,
  Circle,
  Marker,
  Popup
} from '@forgepack/leaflet';

export function LayeredMap() {
  const [selectedLayers, setSelectedLayers] = useState({
    ports: true,
    routes: false,
    weather: false
  });

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer
        center={[-23.5505, -46.6333]} // São Paulo
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        <LayerControl position="topright">
          <LayerControl.Overlay checked name="Portos Marítimos">
            <LayerGroup>
              <Marker position={[-23.9618, -46.3322]}>
                <Popup>Porto de Santos</Popup>
              </Marker>
              <Circle
                center={[-23.9618, -46.3322]}
                radius={5000}
                pathOptions={{ color: 'blue', fillColor: 'lightblue' }}
              />
            </LayerGroup>
          </LayerControl.Overlay>
          
          <LayerControl.Overlay name="Rotas de Navegação">
            <LayerGroup>
              {/* Adicionar linhas de rota aqui */}
            </LayerGroup>
          </LayerControl.Overlay>
        </LayerControl>
      </MapContainer>
    </div>
  );
}`;

  const drawingMapCode = `import React from 'react';
import { 
  MapContainer, 
  TileLayer,
  useMapEvents,
  Polyline,
  Marker
} from '@forgepack/leaflet';
import { useDrawing } from '@forgepack/leaflet/hooks';

export function InteractiveDrawingMap() {
  const { 
    isDrawing, 
    currentRoute, 
    markers, 
    startDrawing, 
    stopDrawing, 
    addPoint,
    clearRoute,
    getTotalDistance
  } = useDrawing();

  // Componente para capturar cliques no mapa
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (isDrawing) {
          addPoint([e.latlng.lat, e.latlng.lng]);
        }
      }
    });
    return null;
  }

  return (
    <div>
      {/* Controles de desenho */}
      <div style={{ padding: '10px', background: '#f5f5f5' }}>
        <button 
          onClick={startDrawing}
          disabled={isDrawing}
          style={{ marginRight: '10px' }}
        >
          {isDrawing ? 'Desenhando...' : 'Iniciar Rota'}
        </button>
        <button 
          onClick={stopDrawing}
          disabled={!isDrawing}
          style={{ marginRight: '10px' }}
        >
          Finalizar Rota
        </button>
        <button onClick={clearRoute}>
          Limpar
        </button>
        {currentRoute.length > 1 && (
          <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>
            Distância: {getTotalDistance().toFixed(2)} milhas náuticas
          </span>
        )}
      </div>

      {/* Mapa */}
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={[-23.5505, -46.6333]}
          zoom={8}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          <MapClickHandler />
          
          {/* Renderizar marcadores */}
          {markers.map((position, index) => (
            <Marker key={index} position={position}>
              <Popup>Ponto {index + 1}</Popup>
            </Marker>
          ))}
          
          {/* Renderizar rota */}
          {currentRoute.length > 1 && (
            <Polyline 
              positions={currentRoute}
              pathOptions={{ 
                color: 'red', 
                weight: 3,
                opacity: 0.8 
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}`;

  const fileProcessingCode = `import React from 'react';
import { useFileProcessor } from '@forgepack/leaflet/hooks';
import { MapContainer, TileLayer } from '@forgepack/leaflet';

export function FileProcessorMap() {
  const {
    layers,
    isProcessing,
    processCoordinateFile,
    processImageOverlay,
    error
  } = useFileProcessor();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
        await processCoordinateFile(file);
      } else if (file.type.startsWith('image/')) {
        // Para imagens, você precisaria fornecer coordenadas de georreferenciamento
        const bounds = [
          [-23.6, -46.7], // sudoeste
          [-23.4, -46.5]  // nordeste
        ];
        await processImageOverlay(file, bounds);
      }
    } catch (err) {
      console.error('Erro ao processar arquivo:', err);
    }
  };

  return (
    <div>
      <div style={{ padding: '10px', background: '#f5f5f5' }}>
        <input
          type="file"
          accept=".txt,.csv,image/*"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />
        {isProcessing && <span>Processando arquivo...</span>}
        {error && <div style={{ color: 'red' }}>Erro: {error}</div>}
        <div>
          Camadas carregadas: {layers.length}
        </div>
      </div>

      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={[-23.5505, -46.6333]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          {/* Renderizar camadas processadas */}
          {layers.map((layer, index) => (
            layer.component
          ))}
        </MapContainer>
      </div>
    </div>
  );
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Quick Start Guide' : 'Guia de Início Rápido'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Learn the essential concepts and create your first interactive map in minutes.'
            : 'Aprenda os conceitos essenciais e crie seu primeiro mapa interativo em minutos.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? '🗺️ Your First Interactive Map' : '🗺️ Seu Primeiro Mapa Interativo'}</h2>
        <p>
          {language === 'en' 
            ? 'Let\'s start with a simple map showing some Brazilian cities:'
            : 'Vamos começar com um mapa simples mostrando algumas cidades brasileiras:'
          }
        </p>
        <CodeBlock language="tsx" code={basicMapCode} />
        
        <div className="callout callout-tip">
          <h4>💡 {language === 'en' ? 'Key Concepts' : 'Conceitos Principais'}</h4>
          <ul>
            <li><strong>MapContainer:</strong> {language === 'en' ? 'The main map component' : 'O componente principal do mapa'}</li>
            <li><strong>TileLayer:</strong> {language === 'en' ? 'Provides the map tiles (satellite, street, etc.)' : 'Fornece os tiles do mapa (satélite, ruas, etc.)'}</li>
            <li><strong>Marker:</strong> {language === 'en' ? 'Places interactive markers on the map' : 'Coloca marcadores interativos no mapa'}</li>
            <li><strong>Popup:</strong> {language === 'en' ? 'Shows information when clicking on markers' : 'Mostra informações ao clicar nos marcadores'}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '📍 Layer Management' : '📍 Gerenciamento de Camadas'}</h2>
        <p>
          {language === 'en' 
            ? 'One of the most powerful features is the ability to manage different map layers:'
            : 'Uma das funcionalidades mais poderosas é a capacidade de gerenciar diferentes camadas do mapa:'
          }
        </p>
        <CodeBlock language="tsx" code={layerManagementCode} />
        
        <div className="callout callout-info">
          <h4>🎯 {language === 'en' ? 'Maritime Focus' : 'Foco Marítimo'}</h4>
          <p>
            {language === 'en' 
              ? 'This package is specifically designed for maritime applications. You can easily add ports, shipping routes, weather data, and nautical charts.'
              : 'Este pacote é especificamente projetado para aplicações marítimas. Você pode facilmente adicionar portos, rotas de navegação, dados meteorológicos e cartas náuticas.'
            }
          </p>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🎨 Interactive Route Drawing' : '🎨 Desenho Interativo de Rotas'}</h2>
        <p>
          {language === 'en' 
            ? 'Create routes by clicking on the map and get automatic distance calculations:'
            : 'Crie rotas clicando no mapa e obtenha cálculos automáticos de distância:'
          }
        </p>
        <CodeBlock language="tsx" code={drawingMapCode} />
        
        <div className="callout callout-success">
          <h4>📏 {language === 'en' ? 'Automatic Distance Calculation' : 'Cálculo Automático de Distância'}</h4>
          <p>
            {language === 'en' 
              ? 'The package automatically calculates distances in nautical miles, perfect for maritime navigation planning.'
              : 'O pacote calcula automaticamente distâncias em milhas náuticas, perfeito para planejamento de navegação marítima.'
            }
          </p>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '📁 File Processing' : '📁 Processamento de Arquivos'}</h2>
        <p>
          {language === 'en' 
            ? 'Load coordinate files and georeferenced images directly into your map:'
            : 'Carregue arquivos de coordenadas e imagens georreferenciadas diretamente no seu mapa:'
          }
        </p>
        <CodeBlock language="tsx" code={fileProcessingCode} />
        
        <div className="callout callout-warning">
          <h4>📋 {language === 'en' ? 'Supported File Formats' : 'Formatos de Arquivo Suportados'}</h4>
          <ul>
            <li><strong>.txt/.csv:</strong> {language === 'en' ? 'Coordinate files with lat,lng pairs' : 'Arquivos de coordenadas com pares lat,lng'}</li>
            <li><strong>.jpg/.png:</strong> {language === 'en' ? 'Georeferenced images for overlays' : 'Imagens georreferenciadas para sobreposições'}</li>
            <li><strong>.gpx:</strong> {language === 'en' ? 'GPS track files (coming soon)' : 'Arquivos de trilha GPS (em breve)'}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🚀 Common Use Cases' : '🚀 Casos de Uso Comuns'}</h2>
        
        <div className="grid">
          <div className="card">
            <h3>🚢 {language === 'en' ? 'Maritime Navigation' : 'Navegação Marítima'}</h3>
            <p>
              {language === 'en' 
                ? 'Plan routes, track vessels, and display nautical charts for maritime operations.'
                : 'Planeje rotas, rastreie embarcações e exiba cartas náuticas para operações marítimas.'
              }
            </p>
          </div>
          
          <div className="card">
            <h3>📊 {language === 'en' ? 'Hydrographic Data' : 'Dados Hidrográficos'}</h3>
            <p>
              {language === 'en' 
                ? 'Visualize oceanographic data, tide stations, and maritime monitoring systems.'
                : 'Visualize dados oceanográficos, estações de maré e sistemas de monitoramento marítimo.'
              }
            </p>
          </div>
          
          <div className="card">
            <h3>🧭 {language === 'en' ? 'Route Planning' : 'Planejamento de Rotas'}</h3>
            <p>
              {language === 'en' 
                ? 'Calculate optimal routes with distance measurements and ETA calculations.'
                : 'Calcule rotas otimizadas com medições de distância e cálculos de ETA.'
              }
            </p>
          </div>
          
          <div className="card">
            <h3>🗺️ {language === 'en' ? 'Chart Management' : 'Gerenciamento de Cartas'}</h3>
            <p>
              {language === 'en' 
                ? 'Overlay and manage nautical charts, satellite imagery, and custom maps.'
                : 'Sobreponha e gerencie cartas náuticas, imagens de satélite e mapas personalizados.'
              }
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? '🎯 Next Steps' : '🎯 Próximos Passos'}</h2>
        <p>
          {language === 'en' 
            ? 'Now that you have the basics, explore these advanced topics:'
            : 'Agora que você tem o básico, explore estes tópicos avançados:'
          }
        </p>
        
        <ul>
          <li>
            <a href="/docs/leaflet/map-configuration">
              {language === 'en' ? 'Map Configuration' : 'Configuração de Mapas'}
            </a> - 
            {language === 'en' 
              ? ' Customize map appearance and behavior'
              : ' Personalize a aparência e comportamento do mapa'
            }
          </li>
          <li>
            <a href="/docs/leaflet/layer-management">
              {language === 'en' ? 'Layer Management' : 'Gerenciamento de Camadas'}
            </a> - 
            {language === 'en' 
              ? ' Advanced layer control and organization'
              : ' Controle e organização avançada de camadas'
            }
          </li>
          <li>
            <a href="/docs/leaflet/interactive-drawing">
              {language === 'en' ? 'Interactive Drawing' : 'Desenho Interativo'}
            </a> - 
            {language === 'en' 
              ? ' Deep dive into drawing tools and route planning'
              : ' Mergulhe fundo nas ferramentas de desenho e planejamento de rotas'
            }
          </li>
          <li>
            <a href="/docs/leaflet/examples/basic-map">
              {language === 'en' ? 'Complete Examples' : 'Exemplos Completos'}
            </a> - 
            {language === 'en' 
              ? ' See real-world implementations'
              : ' Veja implementações do mundo real'
            }
          </li>
        </ul>
      </section>
    </div>
  );
}