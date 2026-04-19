import { Analytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://qa-junior-handbook.vercel.app'),
  title: {
    default: `${appName} — estudo de QA em português`,
    template: `%s | ${appName}`,
  },
  description:
    'Livro digital interativo para QA júnior: fundamentos, manual, API, E2E, CI/CD, soft skills e entrevistas — em português brasileiro.',
  openGraph: {
    title: appName,
    description: 'Handbook de QA júnior com trilha gamificada, quizzes e projetos reais.',
    url: 'https://qa-junior-handbook.vercel.app',
    siteName: appName,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
  },
  alternates: {
    canonical: 'https://qa-junior-handbook.vercel.app',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            enableSystem: true,
          }}
          search={{
            enabled: true,
          }}
        >
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
