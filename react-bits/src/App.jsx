import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Providers from './components/layout/Providers';
import { useEffect } from 'react';
import { ActiveRouteProvider } from './components/context/ActiveRouteContext/ActiveRouteContext';
import { forceChakraDarkTheme } from './utils/utils';

import DisplayHeader from './components/landing/DisplayHeader/DisplayHeader';
import SidebarLayout from './components/layout/SidebarLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ShowcasePage from './pages/ShowcasePage';
import FavoritesPage from './pages/FavoritesPage';

function AppContent() {
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/showcase') return 'showcase';
    return null;
  };

  const sidebarPages = ['/favorites'];
  const isSidebarPage =
    sidebarPages.some(path => location.pathname.includes(path)) || location.pathname.match(/^\/[^/]+\/[^/]+$/);

  return (
    <>
      {!isSidebarPage && <DisplayHeader activeItem={getActiveItem()} />}
      <Providers>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/showcase" element={<ShowcasePage />} />
          <Route
            path="/:category/:subcategory"
            element={
              <SidebarLayout>
                <CategoryPage />
              </SidebarLayout>
            }
          />

          <Route
            path="/favorites"
            element={
              <SidebarLayout>
                <FavoritesPage />
              </SidebarLayout>
            }
          />
        </Routes>
      </Providers>
    </>
  );
}

export default function App() {
  useEffect(() => {
    forceChakraDarkTheme();
  }, []);

  return (
    <Router>
      <ActiveRouteProvider>
        <AppContent />
      </ActiveRouteProvider>
    </Router>
  );
}
