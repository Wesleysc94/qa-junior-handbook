import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { ReviewHub } from '@/components/review/ReviewHub';
import { getHandbookPages } from '@/lib/handbook-pages';

export default function ReviewPage() {
  const pages = getHandbookPages();

  return (
    <DocsPage full>
      <DocsTitle>Revisão</DocsTitle>
      <DocsDescription>
        Fila pessoal de revisão com base nos seus quizzes, missões, favoritos e flashcards.
      </DocsDescription>
      <DocsBody>
        <ReviewHub pages={pages} />
      </DocsBody>
    </DocsPage>
  );
}
