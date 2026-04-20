import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { FocusModeRoot } from '@/components/docs/FocusModeRoot';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      <FocusModeRoot>{children}</FocusModeRoot>
    </DocsLayout>
  );
}
