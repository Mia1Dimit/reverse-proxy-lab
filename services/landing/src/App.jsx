import { NavBar } from '@portfolio/shared';
import Hero from './components/Hero';
import ServiceTiles from './components/ServiceTiles';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <ServiceTiles />
      </main>
    </>
  );
}
