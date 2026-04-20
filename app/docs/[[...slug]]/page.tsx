import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { ChapterActions } from '@/components/docs/ChapterActions';
import { getAbsoluteUrl, getGitHubFileUrl } from '@/lib/shared';
import { ChapterMetaProvider } from '@/components/docs/ChapterMetaContext';
import { ChapterFocusToggle } from '@/components/docs/ChapterFocusToggle';
import { ChapterStateSync } from '@/components/docs/ChapterStateSync';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const chapterUrl = getAbsoluteUrl(page.url);
  const chapterFilePath = `content/docs/${page.path}`;
  const chapterPath = page.url;

  return (
    <ChapterMetaProvider
      value={{
        chapterPath,
        chapterTitle: page.data.title,
        chapterUrl,
        filePath: chapterFilePath,
      }}
    >
      <ChapterStateSync chapterPath={chapterPath} />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <div className="flex flex-col gap-3 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2" data-handbook-focus="hide">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover
              markdownUrl={markdownUrl}
              githubUrl={getGitHubFileUrl(chapterFilePath)}
            />
          </div>
          <ChapterFocusToggle />
        </div>
        <div data-handbook-focus="content">
          <DocsBody>
            <MDX
              components={getMDXComponents({
                a: createRelativeLink(source, page),
              })}
            />
          </DocsBody>
        </div>
        <ChapterActions chapterPath={chapterPath} filePath={chapterFilePath} />
      </DocsPage>
    </ChapterMetaProvider>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: getAbsoluteUrl(page.url),
    },
    openGraph: {
      url: getAbsoluteUrl(page.url),
      images: [getAbsoluteUrl(getPageImage(page).url)],
    },
  };
}
