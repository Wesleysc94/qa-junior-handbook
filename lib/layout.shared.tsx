import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { NavTitleSlot } from '@/components/layout/NavTitleSlot';
import { HeaderProgress } from '@/components/learning/HeaderProgress';
import { siteConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    slots: {
      navTitle: NavTitleSlot,
    },
    nav: {
      url: '/',
      children: <HeaderProgress />,
    },
    githubUrl: siteConfig.githubRepoUrl,
    links: [
      {
        type: 'main',
        url: '/docs',
        text: 'Documentação',
      },
      {
        type: 'main',
        url: '/docs/revisao',
        text: 'Revisão',
      },
      {
        type: 'main',
        url: '/docs/como-usar',
        text: 'Como usar',
      },
    ],
  };
}
