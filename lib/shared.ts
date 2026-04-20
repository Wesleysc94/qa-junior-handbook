export const appName = 'QA Junior Handbook';

export const siteDescription =
  'Livro digital interativo para QA júnior com trilha gamificada, quizzes, flashcards e projetos reais em português brasileiro.';

export const siteUrl = 'https://qa-junior-handbook.vercel.app';

export const docsRoute = '/docs';

export const docsImageRoute = '/og/docs';

export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'Wesleysc94',
  repo: 'qa-junior-handbook',
  branch: 'main',
} as const;

export const socialLinks = {
  linkedIn: 'https://www.linkedin.com/in/wesley-carvalho94',
  website: 'https://www.wxdigitalstudio.com.br',
} as const;

export const featuredProjects = [
  {
    name: 'toolshop-quality-portfolio',
    desc: 'Portfólio central com estratégia de QA em camadas para o Practice Software Testing.',
    href: 'https://github.com/Wesleysc94/toolshop-quality-portfolio',
  },
  {
    name: 'swaglab-quality-suite',
    desc: 'Suite full-stack de QA com Playwright, API e CI/CD aplicada ao ecossistema Swag Lab.',
    href: 'https://github.com/Wesleysc94/swaglab-quality-suite',
  },
  {
    name: 'qa-junior-handbook',
    desc: 'O próprio handbook em Next.js + Fumadocs que organiza o estudo e os projetos públicos.',
    href: 'https://github.com/Wesleysc94/qa-junior-handbook',
  },
] as const;

export const siteConfig = {
  name: appName,
  description: siteDescription,
  siteUrl,
  docsRoute,
  docsImageRoute,
  docsContentRoute,
  author: 'Wesley Carvalho',
  gitConfig,
  socialLinks,
  featuredProjects,
  githubRepoUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
} as const;

export function getAbsoluteUrl(pathname = ''): string {
  return new URL(pathname, siteUrl).toString();
}

export function getGitHubFileUrl(filePath: string): string {
  return `${siteConfig.githubRepoUrl}/blob/${gitConfig.branch}/${filePath}`;
}

export function getLinkedInShareUrl(targetUrl: string): string {
  const share = new URL('https://www.linkedin.com/sharing/share-offsite/');
  share.searchParams.set('url', targetUrl);
  return share.toString();
}
