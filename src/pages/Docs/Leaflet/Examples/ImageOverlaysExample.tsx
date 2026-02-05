import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { CodeBlock } from '../../../../components/CodeBlock/CodeBlock';

export function ImageOverlaysExample() {
  const { language } = useLanguage();

  const basicOverlayCode = `import React from 'react';
import { Map } from '@forgepack/leaflet';

export function BasicImageOverlay() {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (mapRef.current) {
      // Define image bounds (southwest and northeast corners)
      const imageBounds = [
        [-22.9, -43.3], // Southwest corner
        [-22.8, -43.1]  // Northeast corner
      ];

      // Add image overlay to map
      L.imageOverlay(
        '/assets/nautical-chart.png',
        imageBounds,
        {
          opacity: 0.8,
          alt: 'Nautical Chart Overlay',
          attribution: 'Chart data © Naval Hydrographic Office'
        }
      ).addTo(mapRef.current);

      // Fit map view to image bounds
      mapRef.current.fitBounds(imageBounds);
    }
  }, []);

  return (
    <Map
      ref={mapRef}
      center={[-22.85, -43.2]}
      zoom={12}
      style={{ height: '400px', width: '100%' }}
    />
  );
}`;

  const georefImageCode = `// Georeferenced image overlay with filename-based bounds
import React from 'react';
import { Map } from '@forgepack/leaflet';

export function GeorefImageOverlay() {
  const mapRef = React.useRef(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageOverlay, setImageOverlay] = React.useState(null);

  // Parse bounds from filename: "swLat_swLng_neLat_neLng.extension"
  const parseImageBounds = (filename: string) => {
    const match = filename.match(/^(-?\\\\d+\\\\.\\\\d+)_(-?\\\\d+\\\\.\\\\d+)_(-?\\\\d+\\\\.\\\\d+)_(-?\\\\d+\\\\.\\\\d+)\\\\./);
    if (!match) return null;
    
    const [, swLat, swLng, neLat, neLng] = match.map(Number);
    return [[swLat, swLng], [neLat, neLng]];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const bounds = parseImageBounds(file.name);
    if (!bounds) {
      alert('Invalid filename format. Use: swLat_swLng_neLat_neLng.extension');
      return;
    }

    // Remove existing overlay
    if (imageOverlay && mapRef.current) {
      mapRef.current.removeLayer(imageOverlay);
    }

    // Create image URL
    const imageUrl = URL.createObjectURL(file);

    // Add new overlay
    if (mapRef.current) {
      const overlay = L.imageOverlay(imageUrl, bounds, {
        opacity: 0.7,
        alt: \`Georeferenced image: \${file.name}\`,
        interactive: true
      }).addTo(mapRef.current);

      setImageOverlay(overlay);
      setSelectedImage(file.name);
      mapRef.current.fitBounds(bounds);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginRight: '1rem' }}
        />
        {selectedImage && (
          <span style={{ color: '#666' }}>
            Loaded: {selectedImage}
          </span>
        )}
      </div>

      <Map
        ref={mapRef}
        center={[-22.85, -43.2]}
        zoom={10}
        style={{ 
          height: '400px', 
          width: '100%',
          border: '1px solid #ddd' 
        }}
      />
    </div>
  );
}`;

  return (
    <div className="docs-content">
      <header>
        <h1>{language === 'en' ? 'Image Overlays Examples' : 'Exemplos de Sobreposições de Imagem'}</h1>
        <p className="lead">
          {language === 'en' 
            ? 'Learn how to add georeferenced images, nautical charts, and other image overlays to your maps.'
            : 'Aprenda como adicionar imagens georreferenciadas, cartas náuticas e outras sobreposições de imagem aos seus mapas.'
          }
        </p>
      </header>

      <section>
        <h2>{language === 'en' ? 'Basic Image Overlay' : 'Sobreposição Básica de Imagem'}</h2>
        <p>
          {language === 'en' 
            ? 'The simplest way to add an image overlay to your map by defining the geographic bounds.'
            : 'A maneira mais simples de adicionar uma sobreposição de imagem ao seu mapa definindo os limites geográficos.'
          }
        </p>
        <CodeBlock code={basicOverlayCode} language="tsx" />
        <p>
          {language === 'en' 
            ? 'This example shows how to add a nautical chart overlay with defined coordinates and opacity settings.'
            : 'Este exemplo mostra como adicionar uma sobreposição de carta náutica com coordenadas definidas e configurações de opacidade.'
          }
        </p>
      </section>

      <section>
        <h2>{language === 'en' ? 'Georeferenced Image Upload' : 'Upload de Imagem Georreferenciada'}</h2>
        <p>
          {language === 'en' 
            ? 'Upload georeferenced images where the filename contains the geographic bounds information.'
            : 'Faça upload de imagens georreferenciadas onde o nome do arquivo contém as informações dos limites geográficos.'
          }
        </p>
        <CodeBlock code={georefImageCode} language="tsx" />
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          background: '#e3f2fd',
          borderRadius: '4px',
          borderLeft: '4px solid #2196f3'
        }}>
          <h4>{language === 'en' ? 'Filename Format' : 'Formato do Nome do Arquivo'}</h4>
          <p>
            {language === 'en' 
              ? 'Images should be named using the pattern: swLat_swLng_neLat_neLng.extension'
              : 'As imagens devem ser nomeadas usando o padrão: latSO_lngSO_latNE_lngNE.extensao'
            }
          </p>
          <p><strong>{language === 'en' ? 'Example' : 'Exemplo'}:</strong> -22.9000_-43.3000_-22.8000_-43.1000.png</p>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? 'Use Cases' : 'Casos de Uso'}</h2>
        <ul>
          <li><strong>{language === 'en' ? 'Nautical Charts' : 'Cartas Náuticas'}</strong> - {language === 'en' ? 'Navigation aids and maritime information' : 'Auxílios à navegação e informações marítimas'}</li>
          <li><strong>{language === 'en' ? 'Weather Data' : 'Dados Meteorológicos'}</strong> - {language === 'en' ? 'Radar images, satellite imagery' : 'Imagens de radar, imagens de satélite'}</li>
          <li><strong>{language === 'en' ? 'Historical Maps' : 'Mapas Históricos'}</strong> - {language === 'en' ? 'Comparing historical and current data' : 'Comparando dados históricos e atuais'}</li>
          <li><strong>{language === 'en' ? 'Survey Data' : 'Dados de Levantamento'}</strong> - {language === 'en' ? 'Engineering drawings, site plans' : 'Desenhos de engenharia, plantas do local'}</li>
          <li><strong>{language === 'en' ? 'Environmental Monitoring' : 'Monitoramento Ambiental'}</strong> - {language === 'en' ? 'Pollution tracking, ecosystem maps' : 'Rastreamento de poluição, mapas de ecossistema'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Best Practices' : 'Melhores Práticas'}</h2>
        <ul>
          <li>{language === 'en' ? 'Use appropriate image formats (PNG for transparency, JPEG for photographs)' : 'Use formatos de imagem apropriados (PNG para transparência, JPEG para fotografias)'}</li>
          <li>{language === 'en' ? 'Optimize image sizes to balance quality and loading performance' : 'Otimize tamanhos de imagem para equilibrar qualidade e performance de carregamento'}</li>
          <li>{language === 'en' ? 'Provide accurate coordinate bounds for proper georeferencing' : 'Forneça limites de coordenadas precisos para georreferenciamento adequado'}</li>
          <li>{language === 'en' ? 'Use opacity settings to blend overlays with base maps' : 'Use configurações de opacidade para misturar sobreposições com mapas base'}</li>
          <li>{language === 'en' ? 'Include attribution and metadata for overlay sources' : 'Inclua atribuição e metadados para fontes de sobreposição'}</li>
          <li>{language === 'en' ? 'Test overlay alignment with known reference points' : 'Teste alinhamento de sobreposição com pontos de referência conhecidos'}</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'en' ? 'Technical Considerations' : 'Considerações Técnicas'}</h2>
        <div style={{ 
          padding: '1rem',
          background: '#fff3cd',
          borderRadius: '4px',
          borderLeft: '4px solid #ffc107'
        }}>
          <h4>{language === 'en' ? 'Performance Tips' : 'Dicas de Performance'}</h4>
          <ul>
            <li>{language === 'en' ? 'Limit concurrent overlays to avoid memory issues' : 'Limite sobreposições simultâneas para evitar problemas de memória'}</li>
            <li>{language === 'en' ? 'Use image pyramids for large, high-resolution overlays' : 'Use pirâmides de imagem para sobreposições grandes e de alta resolução'}</li>
            <li>{language === 'en' ? 'Implement lazy loading for multiple overlay scenarios' : 'Implemente carregamento sob demanda para cenários de múltiplas sobreposições'}</li>
            <li>{language === 'en' ? 'Cache processed overlays to improve repeat performance' : 'Cache sobreposições processadas para melhorar performance repetida'}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>{language === 'en' ? 'Related Documentation' : 'Documentação Relacionada'}</h2>
        <ul>
          <li>
            <Link to="/docs/leaflet/getting-started">
              {language === 'en' ? 'Getting Started Guide' : 'Guia de Início'}
            </Link> - {language === 'en' ? 'Basic setup and configuration' : 'Configuração e setup básicos'}
          </li>
          <li>
            <Link to="/docs/leaflet/examples/basic-map">
              {language === 'en' ? 'Basic Map Examples' : 'Exemplos de Mapa Básico'}
            </Link> - {language === 'en' ? 'Foundation concepts for map creation' : 'Conceitos fundamentais para criação de mapas'}
          </li>
          <li>
            <Link to="/docs/leaflet/reference/types">
              {language === 'en' ? 'Type Definitions' : 'Definições de Tipo'}
            </Link> - {language === 'en' ? 'TypeScript interfaces for overlay types' : 'Interfaces TypeScript para tipos de sobreposição'}
          </li>
        </ul>
      </section>

      <nav className="docs-nav">
        <Link to="/docs/leaflet/examples/route-planning" className="docs-nav-link">
          <span className="docs-nav-label">{language === 'en' ? 'Previous' : 'Anterior'}</span>
          <span className="docs-nav-title">{language === 'en' ? 'Route Planning' : 'Planejamento de Rotas'}</span>
        </Link>
        <Link to="/docs/leaflet/reference/components" className="docs-nav-link next">
          <span className="docs-nav-label">{language === 'en' ? 'Next' : 'Próximo'}</span>
          <span className="docs-nav-title">{language === 'en' ? 'Components API' : 'API dos Componentes'}</span>
        </Link>
      </nav>
    </div>
  );
}