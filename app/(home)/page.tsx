import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Hero } from '@/components/home/Hero';
import { ModulesGrid } from '@/components/home/ModulesGrid';
import { SiteFooter } from '@/components/home/SiteFooter';
import { Stats } from '@/components/home/Stats';
import { StudyDashboard } from '@/components/home/StudyDashboard';
import { getHandbookPages } from '@/lib/handbook-pages';

export default function HomePage() {
  const pages = getHandbookPages();

  return (
    <>
      <Hero />
      <Stats />
      <StudyDashboard pages={pages} />
      <ModulesGrid />
      <FeaturedProjects />
      <SiteFooter />
    </>
  );
}
