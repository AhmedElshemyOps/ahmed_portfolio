import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read blog articles
const article1 = fs.readFileSync(path.join(__dirname, 'blog-articles/article-1-sustainability-trends.md'), 'utf-8');
const article2 = fs.readFileSync(path.join(__dirname, 'blog-articles/article-2-digital-transformation.md'), 'utf-8');

// Parse markdown to extract metadata and content
function parseMarkdown(content) {
  const lines = content.split('\n');
  const metadata = {};
  let contentStart = 0;

  // Extract metadata from the beginning
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('**')) {
      const [key, value] = line.replace(/\*\*/g, '').split(':').map(s => s.trim());
      metadata[key] = value;
    } else if (line.startsWith('# ')) {
      contentStart = i;
      break;
    }
  }

  return {
    title: lines[0].replace('# ', '').trim(),
    excerpt: metadata['Category'] ? `Exploring ${metadata['Category'].toLowerCase()}` : '',
    content: lines.slice(contentStart).join('\n'),
    category: metadata['Category'] || 'Operations',
    tags: metadata['Tags'] || '',
    readingTime: parseInt(metadata['Reading Time']) || 8,
  };
}

const articles = [
  {
    ...parseMarkdown(article1),
    slug: 'sustainability-green-operations-future-hospitality',
    author: 'Ahmed Mahmoud',
  },
  {
    ...parseMarkdown(article2),
    slug: 'digital-transformation-hospitality-legacy-systems-smart-operations',
    author: 'Ahmed Mahmoud',
  },
];

async function seedBlogPosts() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    console.log('🌱 Seeding blog posts...');

    for (const article of articles) {
      const query = `
        INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, author, readingTime, isPublished, publishedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, NOW())
        ON DUPLICATE KEY UPDATE
        content = VALUES(content),
        excerpt = VALUES(excerpt),
        category = VALUES(category),
        tags = VALUES(tags),
        readingTime = VALUES(readingTime)
      `;

      await connection.execute(query, [
        article.title,
        article.slug,
        article.excerpt,
        article.content,
        article.category,
        article.tags,
        article.author,
        article.readingTime,
      ]);

      console.log(`✅ Seeded: ${article.title}`);
    }

    await connection.end();
    console.log('✨ Blog posts seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error);
    process.exit(1);
  }
}

seedBlogPosts();
