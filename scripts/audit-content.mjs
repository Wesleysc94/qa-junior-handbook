import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const docsDir = path.join(root, 'content', 'docs');
const checklistRegistryPath = path.join(root, 'lib', 'checklist-registry.ts');

function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) out.push(fullPath);
  }

  return out;
}

function extractChecklistIds() {
  const source = fs.readFileSync(checklistRegistryPath, 'utf8');
  const matches = [...source.matchAll(/'([^']+)'/g)];
  return new Set(matches.map((match) => match[1]));
}

function toRelative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function stripForWordCount(source) {
  return source
    .replace(/^---[\s\S]*?---/m, ' ')
    .replace(/^import .*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(source) {
  const cleaned = stripForWordCount(source);
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

function auditFile(file, checklistIds) {
  const relative = toRelative(file);
  const source = fs.readFileSync(file, 'utf8');
  const issues = [];
  const isIndex = relative === 'content/docs/index.mdx';
  const isGlossary = relative === 'content/docs/09-glossario/termos-tecnicos.mdx';
  const isMission = path.basename(file).startsWith('missao-');

  if (source.includes('[Conteúdo a desenvolver]')) {
    issues.push('ainda contém placeholder');
  }

  if (!isIndex) {
    const words = countWords(source);
    const minimumWords = isMission ? 900 : 1500;
    if (words < minimumWords) {
      issues.push(`tem ${words} palavras úteis; mínimo esperado é ${minimumWords}`);
    }

    if (!/<KeyTakeaways\b/.test(source)) {
      issues.push('não possui <KeyTakeaways />');
    }

    if (!/<Quiz\b/.test(source)) {
      issues.push('não possui <Quiz />');
    }

    const checklistMatch = source.match(/<ChecklistItem id="([^"]+)"/);
    if (!checklistMatch) {
      issues.push('não possui <ChecklistItem />');
    } else if (!checklistIds.has(checklistMatch[1])) {
      issues.push(`usa ChecklistItem id="${checklistMatch[1]}" que não existe no registry`);
    }

    if (isMission) {
      const steps = [...source.matchAll(/<DecisionStep\b/g)].length;
      if (steps < 3 || steps > 5) {
        issues.push(`tem ${steps} DecisionSteps; esperado entre 3 e 5`);
      }

      if (!/<MissionProgress\b/.test(source)) {
        issues.push('não possui <MissionProgress />');
      }

      if (!/<MissionSummary\b/.test(source)) {
        issues.push('não possui <MissionSummary />');
      }
    }
  }

  if (isGlossary) {
    const flashcards = [...source.matchAll(/<Flashcard\b/g)].length;
    if (flashcards < 50) {
      issues.push(`tem ${flashcards} flashcards; mínimo esperado é 50`);
    }
  }

  return issues.map((issue) => `${relative}: ${issue}`);
}

const checklistIds = extractChecklistIds();
const files = collectFiles(docsDir);
const issues = files.flatMap((file) => auditFile(file, checklistIds));

if (issues.length > 0) {
  console.error('Falhas na auditoria de conteúdo:\n');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Auditoria concluída com sucesso: ${files.length} arquivos MDX verificados.`);
