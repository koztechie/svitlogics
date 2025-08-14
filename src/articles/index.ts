import content from './welcome-to-svitlogics.md?raw';

export interface Article {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
const match = frontmatterRegex.exec(content);

if (!match) {
  throw new Error('Invalid markdown format: No frontmatter found');
}

const frontmatterText = match[1];
const body = content.slice(match[0].length);

const frontmatter: { [key: string]: string } = {};
frontmatterText.split('\n').forEach(line => {
  const parts = line.split(':');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
    frontmatter[key] = value;
  }
});

const article: Article = {
  slug: 'welcome-to-svitlogics',
  title: frontmatter.title,
  date: frontmatter.date,
  summary: frontmatter.summary,
  content: body.trim(),
};

export const articles: Article[] = [article];
