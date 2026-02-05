import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { MainLayout } from './layouts/MainLayout';
import { DocsPageLayout } from './layouts/DocsPageLayout';
import { Home } from './pages/Home/Home';
import { DocsLayout } from './pages/Docs/DocsLayout';
import NotFound from './pages/NotFound';

// Request package pages
import { RequestOverview } from './pages/Docs/Request/Overview';
import { GettingStarted as RequestGettingStarted } from './pages/Docs/Request/GettingStarted';
import { QuickStart as RequestQuickStart } from './pages/Docs/Request/QuickStart';
import { Authentication } from './pages/Docs/Request/Authentication';
import { RouteProtection } from './pages/Docs/Request/RouteProtection';
import { Requests } from './pages/Docs/Request/Requests';
import { CrudOperations } from './pages/Docs/Request/CrudOperations';
import { TokenManagement } from './pages/Docs/Request/TokenManagement';
import { ApiComponents as RequestComponentsReference } from './pages/Docs/Request/Reference/ComponentsReference';
import { ApiHooks as RequestHooksReference } from './pages/Docs/Request/Reference/HooksReference';
import { ApiServices as RequestServicesReference } from './pages/Docs/Request/Reference/ServicesReference';
import { ApiTypes as RequestTypesReference } from './pages/Docs/Request/Reference/TypesReference';
import { ApiUtilities as RequestUtilitiesReference } from './pages/Docs/Request/Reference/UtilitiesReference';
import { ExampleLoginForm as LoginForm } from './pages/Docs/Request/Examples/LoginForm';
import { ExampleDashboard as Dashboard } from './pages/Docs/Request/Examples/Dashboard';
import { ExampleUsersList as UsersList } from './pages/Docs/Request/Examples/UsersList';

// Leaflet package pages
import { LeafletOverview } from './pages/Docs/Leaflet/Overview';
import { GettingStarted as LeafletGettingStarted } from './pages/Docs/Leaflet/GettingStarted';
import { BasicMapExample } from './pages/Docs/Leaflet/Examples/BasicMapExample';
import { MarkersExample } from './pages/Docs/Leaflet/Examples/MarkersExample';
import { RoutePlanningExample } from './pages/Docs/Leaflet/Examples/RoutePlanningExample';
import { ImageOverlaysExample } from './pages/Docs/Leaflet/Examples/ImageOverlaysExample';
import { ComponentsReference as LeafletComponentsReference } from './pages/Docs/Leaflet/Reference/ComponentsReference';
import { HooksReference as LeafletHooksReference } from './pages/Docs/Leaflet/Reference/HooksReference';
import { ServicesReference as LeafletServicesReference } from './pages/Docs/Leaflet/Reference/ServicesReference';
import { TypesReference as LeafletTypesReference } from './pages/Docs/Leaflet/Reference/TypesReference';
import { UtilitiesReference as LeafletUtilitiesReference } from './pages/Docs/Leaflet/Reference/UtilitiesReference';
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
              <Route path="getting-started" element={<RequestGettingStarted />} />
              <Route path="quick-start" element={<RequestQuickStart />} />
              <Route path="authentication" element={<Authentication />} />
              <Route path="route-protection" element={<RouteProtection />} />
              <Route path="requests" element={<Requests />} />
              <Route path="crud-operations" element={<CrudOperations />} />
              <Route path="token-management" element={<TokenManagement />} />
              <Route path="reference/components" element={<RequestComponentsReference />} />
              <Route path="reference/hooks" element={<RequestHooksReference />} />
              <Route path="reference/services" element={<RequestServicesReference />} />
              <Route path="reference/types" element={<RequestTypesReference />} />
              <Route path="reference/utilities" element={<RequestUtilitiesReference />} />
              <Route path="examples/login-form" element={<LoginForm />} />
              <Route path="examples/dashboard" element={<Dashboard />} />
              <Route path="examples/users-list" element={<UsersList />} />
            </Route>

            <Route path="/docs/leaflet" element={<DocsLayout />}>
              <Route index element={<LeafletOverview />} />
              <Route path="getting-started" element={<LeafletGettingStarted />} />
              <Route path="examples/basic-map" element={<BasicMapExample />} />
              <Route path="examples/markers" element={<MarkersExample />} />
              <Route path="examples/route-planning" element={<RoutePlanningExample />} />
              <Route path="examples/image-overlays" element={<ImageOverlaysExample />} />
              <Route path="reference/components" element={<LeafletComponentsReference />} />
              <Route path="reference/hooks" element={<LeafletHooksReference />} />
              <Route path="reference/services" element={<LeafletServicesReference />} />
              <Route path="reference/types" element={<LeafletTypesReference />} />
              <Route path="reference/utilities" element={<LeafletUtilitiesReference />} />
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
