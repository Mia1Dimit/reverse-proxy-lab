import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from '@portfolio/shared';
import PortfolioPage from './components/PortfolioPage';
import ProjectDetailPage from './components/ProjectDetailPage';

export default function App() {
  return (
    // basename must match the Traefik route prefix and Vite base
    <BrowserRouter basename="/portfolio">
      <NavBar />
      <Routes>
        <Route path="/"      element={<PortfolioPage />} />
        <Route path="/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
