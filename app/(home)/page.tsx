import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Hero } from '@/components/home/Hero';
import { ModulesGrid } from '@/components/home/ModulesGrid';
import { SiteFooter } from '@/components/home/SiteFooter';
import { Stats } from '@/components/home/Stats';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ModulesGrid />
      <FeaturedProjects />
      <SiteFooter />
    </>
  );
}
