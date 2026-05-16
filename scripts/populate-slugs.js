import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY });
const databaseId = process.env.VITE_NOTION_DATABASE_ID;

function simpleSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}

async function addSlugs() {
  console.log('Fetching pages from Notion...');
  const response = await notion.databases.query({ database_id: databaseId });
  const pages = response.results;
  console.log(`Found ${pages.length} pages.`);

  for (const page of pages) {
    const name = page.properties.Name?.title[0]?.plain_text || 'untitled';
    const slug = simpleSlug(name);

    console.log(`Updating ${name} with slug: ${slug}...`);
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          'slug': {
            rich_text: [{ text: { content: slug } }]
          }
        }
      });
    } catch (e) {
      console.error(`Failed to update ${name}:`, e.message);
    }
  }
  console.log('Done!');
}

addSlugs();
