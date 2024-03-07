import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '@/types';

export function getPosts(): PostData[] {
  const files = fs.readdirSync(path.join('public/posts'));
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('public/posts', fileName),
      'utf-8',
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      tags: frontmatter.tags,
    };
  });

  return posts;
}

export function getPostContent(slug: string) {
  const file = `public/posts/${slug}.md`;
  const content = fs.readFileSync(file, 'utf-8');
  return content;
}
