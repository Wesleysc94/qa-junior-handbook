import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const docsDir = path.join(root, 'content', 'docs');
const outDir = path.join(root, '.source');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toPosix(filePath) {
  return filePath.replaceAll('\\', '/');
}

function collectFiles(dir, predicate) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, predicate));
      continue;
    }

    if (entry.isFile() && predicate(entry.name)) {
      files.push(fullPath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function formatImportPath(fromDir, toFile, query) {
  const relative = toPosix(path.relative(fromDir, toFile));
  const importPath = relative.startsWith('.') ? relative : `./${relative}`;
  return `${importPath}?${query}`;
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function generateServerFile(mdxFiles, metaFiles) {
  const lines = [
    '// @ts-nocheck',
    "import { server } from 'fumadocs-mdx/runtime/server';",
    "import type * as Config from '../source.config';",
    '',
    "const create = server<typeof Config, import('fumadocs-mdx/runtime/types').InternalTypeConfig>({});",
    '',
  ];

  metaFiles.forEach((file, index) => {
    lines.push(
      `import { default as __fd_meta_${index} } from ${JSON.stringify(formatImportPath(outDir, file, 'collection=docs'))};`,
    );
  });

  mdxFiles.forEach((file, index) => {
    lines.push(`import * as __fd_doc_${index} from ${JSON.stringify(formatImportPath(outDir, file, 'collection=docs'))};`);
  });

  lines.push('', 'export const docs = await create.docs("docs", "content/docs", {');

  metaFiles.forEach((file, index) => {
    const relative = toPosix(path.relative(docsDir, file));
    lines.push(`  ${JSON.stringify(relative)}: __fd_meta_${index},`);
  });

  lines.push('}, {');

  mdxFiles.forEach((file, index) => {
    const relative = toPosix(path.relative(docsDir, file));
    lines.push(`  ${JSON.stringify(relative)}: __fd_doc_${index},`);
  });

  lines.push('});', '');

  return `${lines.join('\n')}`;
}

function generateBrowserFile(mdxFiles) {
  const lines = [
    '// @ts-nocheck',
    "import { browser } from 'fumadocs-mdx/runtime/browser';",
    "import type * as Config from '../source.config';",
    '',
    "const create = browser<typeof Config, import('fumadocs-mdx/runtime/types').InternalTypeConfig>();",
    '',
    'export const docs = create.doc("docs", {',
  ];

  mdxFiles.forEach((file) => {
    const relative = toPosix(path.relative(docsDir, file));
    lines.push(
      `  ${JSON.stringify(relative)}: () => import(${JSON.stringify(formatImportPath(outDir, file, 'collection=docs'))}),`,
    );
  });

  lines.push('});', '', 'const browserCollections = {', '  docs,', '};', '', 'export default browserCollections;', '');

  return lines.join('\n');
}

function generateDynamicFile() {
  return `// @ts-nocheck
export * from './server';
`;
}

const mdxFiles = collectFiles(docsDir, (name) => name.endsWith('.mdx'));
const metaFiles = collectFiles(docsDir, (name) => name === 'meta.json');

writeFile(path.join(outDir, 'server.ts'), generateServerFile(mdxFiles, metaFiles));
writeFile(path.join(outDir, 'browser.ts'), generateBrowserFile(mdxFiles));
writeFile(path.join(outDir, 'dynamic.ts'), generateDynamicFile());

console.log(
  `[source] generated ${mdxFiles.length} MDX imports and ${metaFiles.length} meta files in ${toPosix(path.relative(root, outDir))}`,
);
