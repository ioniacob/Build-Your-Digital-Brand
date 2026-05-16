import { Client } from '@notionhq/client';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY });
const databaseId = process.env.VITE_NOTION_DATABASE_ID;

async function migrate() {
  if (!process.env.VITE_NOTION_API_KEY || !databaseId) {
    console.error('Error: VITE_NOTION_API_KEY or VITE_NOTION_DATABASE_ID missing in .env');
    return;
  }

  const htmlPath = path.resolve('big-bang-smm-prompts-hub.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const cards = document.querySelectorAll('.service-card');
  console.log(`Found ${cards.length} cards to migrate...`);

  for (const card of cards) {
    const name = card.querySelector('.card-name')?.textContent?.trim() || 'Untitled';
    const summary = card.querySelector('.card-desc')?.textContent?.trim() || '';
    const type = card.querySelector('.card-type')?.textContent?.trim() || 'Article';
    const link = card.getAttribute('href') || card.querySelector('.card-url')?.textContent?.trim() || '#';
    
    // Some logic to normalize type for Notion Select property
    const validTypes = ['Coding', 'LLM', 'Media', 'Music', 'Resources', 'Article'];
    const normalizedType = validTypes.includes(type) ? type : 'Article';

    try {
      console.log(`Migrating: ${name}...`);
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          'Name': {
            title: [{ text: { content: name } }]
          },
          'Author': {
            multi_select: [{ name: 'Ion Iacob' }]
          },
          'Link': {
            url: link.startsWith('http') ? link : `https://${link}`
          },
          'Publisher': {
            select: { name: 'Indie' }
          },
          'Publishing/Release Date': {
            date: { start: new Date().toISOString().split('T')[0] }
          },
          'Score /5': {
            select: { name: '⭐️⭐️⭐️⭐️⭐️' }
          },
          'Status': {
            select: { name: 'Finished' }
          },
          'Summary': {
            rich_text: [{ text: { content: summary } }]
          },
          'Type': {
            select: { name: normalizedType }
          }
        },
        icon: {
          type: 'emoji',
          emoji: '🚀'
        }
      });
      console.log(`Successfully migrated: ${name}`);
    } catch (error) {
      console.error(`Failed to migrate ${name}:`, error.message);
    }
    
    // Sleep a bit to respect Notion API rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('Migration complete!');
}

migrate();
