import { NextResponse } from 'next/server';
import { categories } from '@/constants';

export async function GET() {
  const baseUrl = 'https://aitoolscover.com';

//   const tools = ['figma', 'vscode', 'notion'];

  const categoryUrls = categories.map(
    slug => `<url><loc>${baseUrl}/category/${slug}</loc></url>`
  ).join('');

//   const toolsUrls = tools.map(
//     slug => `<url><loc>${baseUrl}/tools/${slug}</loc></url>`
//   ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categoryUrls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
