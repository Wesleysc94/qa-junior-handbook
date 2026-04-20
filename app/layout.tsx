import { Analytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { appName, getAbsoluteUrl, siteConfig } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${appName} — estudo de QA em português`,
    template: `%s | ${appName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: appName,
    description: 'Handbook de QA júnior com trilha gamificada, quizzes e projetos reais.',
    url: siteConfig.siteUrl,
    siteName: appName,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: getAbsoluteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: `${appName} — handbook de QA em português brasileiro`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: siteConfig.description,
    images: [getAbsoluteUrl('/og-image.png')],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
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
