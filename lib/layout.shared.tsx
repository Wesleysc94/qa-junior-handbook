import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { NavTitleSlot } from '@/components/layout/NavTitleSlot';
import { HeaderProgress } from '@/components/learning/HeaderProgress';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    slots: {
      navTitle: NavTitleSlot,
    },
    nav: {
      url: '/',
      children: <HeaderProgress />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: 'main',
        url: '/docs',
        text: 'Documentação',
      },
    ],
  };
}
