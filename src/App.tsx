import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { MainLayout } from './layouts/MainLayout';
import { DocsPageLayout } from './layouts/DocsPageLayout';
import { Home } from './pages/Home/Home';
import { DocsLayout } from './pages/Docs/DocsLayout';
// Request package pages
import { RequestOverview } from './pages/Docs/RequestOverview';
import { GettingStarted } from './pages/Docs/GettingStarted';
import { QuickStart } from './pages/Docs/QuickStart';
import { Authentication } from './pages/Docs/Authentication';
import { RouteProtection } from './pages/Docs/RouteProtection';
import { Requests } from './pages/Docs/Requests';
import { CrudOperations } from './pages/Docs/CrudOperations';
import { TokenManagement } from './pages/Docs/TokenManagement';
import { ApiHooks } from './pages/Docs/ApiHooks';
import { ApiComponents } from './pages/Docs/ApiComponents';
import { ApiServices } from './pages/Docs/ApiServices';
import { ApiTypes } from './pages/Docs/ApiTypes';
import { ApiUtilities } from './pages/Docs/ApiUtilities';
import { ExampleLoginForm } from './pages/Docs/ExampleLoginForm';
import { ExampleDashboard } from './pages/Docs/ExampleDashboard';
import { ExampleUsersList } from './pages/Docs/ExampleUsersList';
// Leaflet package pages
import { LeafletOverview } from './pages/Docs/LeafletOverview';
import { LeafletGettingStarted } from './pages/Docs/LeafletGettingStarted';
import { LeafletQuickStart } from './pages/Docs/LeafletQuickStart';
import { LeafletBasicMapExample } from './pages/Docs/LeafletBasicMapExample';
import { LeafletApiComponents } from './pages/Docs/LeafletApiComponents';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          <Route element={<DocsPageLayout />}>
            <Route path="/docs/request" element={<DocsLayout />}>
              <Route index element={<RequestOverview />} />
              <Route path="getting-started" element={<GettingStarted />} />
              <Route path="quick-start" element={<QuickStart />} />
              <Route path="authentication" element={<Authentication />} />
              <Route path="route-protection" element={<RouteProtection />} />
              <Route path="requests" element={<Requests />} />
              <Route path="crud-operations" element={<CrudOperations />} />
              <Route path="token-management" element={<TokenManagement />} />
              <Route path="api/hooks" element={<ApiHooks />} />
              <Route path="api/components" element={<ApiComponents />} />
              <Route path="api/services" element={<ApiServices />} />
              <Route path="api/types" element={<ApiTypes />} />
              <Route path="api/utilities" element={<ApiUtilities />} />
              <Route path="examples/login-form" element={<ExampleLoginForm />} />
              <Route path="examples/dashboard" element={<ExampleDashboard />} />
              <Route path="examples/users-list" element={<ExampleUsersList />} />
            </Route>

            <Route path="/docs/leaflet" element={<DocsLayout />}>
              <Route index element={<LeafletOverview />} />
              <Route path="getting-started" element={<LeafletGettingStarted />} />
              <Route path="quick-start" element={<LeafletQuickStart />} />
              <Route path="api/components" element={<LeafletApiComponents />} />
              <Route path="examples/basic-map" element={<LeafletBasicMapExample />} />
              {/* Placeholder routes for other pages */}
              <Route path="map-configuration" element={<LeafletOverview />} />
              <Route path="layer-management" element={<LeafletOverview />} />
              <Route path="interactive-drawing" element={<LeafletOverview />} />
              <Route path="file-processing" element={<LeafletOverview />} />
              <Route path="styling" element={<LeafletOverview />} />
              <Route path="api/hooks" element={<LeafletOverview />} />
              <Route path="api/utilities" element={<LeafletOverview />} />
              <Route path="api/types" element={<LeafletOverview />} />
              <Route path="examples/markers" element={<LeafletOverview />} />
              <Route path="examples/route-planning" element={<LeafletOverview />} />
              <Route path="examples/image-overlays" element={<LeafletOverview />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
