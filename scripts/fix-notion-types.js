import { Client } from '@notionhq/client';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY });
const databaseId = process.env.VITE_NOTION_DATABASE_ID;

async function fixTypes() {
  if (!process.env.VITE_NOTION_API_KEY || !databaseId) {
    console.error('Error: VITE_NOTION_API_KEY or VITE_NOTION_DATABASE_ID missing in .env');
    return;
  }

  // 1. Get all pages from Notion
  console.log('Fetching pages from Notion...');
  const response = await notion.databases.query({ database_id: databaseId });
  const notionPages = response.results;
  console.log(`Found ${notionPages.length} pages in Notion.`);

  // 2. Read local HTML to get correct categories
  const htmlPath = path.resolve('big-bang-smm-prompts-hub.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const cards = document.querySelectorAll('.service-card');
  
  const correctMappings = {};
  const sections = document.querySelectorAll('.category-section');
  
  sections.forEach(section => {
    const categoryId = section.getAttribute('data-category');
    // Map internal id to display name
    const categoryMap = {
      'coding': 'Coding',
      'llms': 'LLM',
      'media': 'Media',
      'music': 'Music',
      'resources': 'Resources'
    };
    const categoryName = categoryMap[categoryId] || 'Resources';
    
    const cards = section.querySelectorAll('.service-card');
    cards.forEach(card => {
      const name = card.querySelector('.card-name')?.textContent?.trim();
      if (name) {
        correctMappings[name] = categoryName;
      }
    });
  });

  // 3. Update Notion pages
  for (const page of notionPages) {
    const name = page.properties.Name?.title[0]?.plain_text;
    const correctType = correctMappings[name];

    if (correctType && correctType !== 'Article') {
      console.log(`Updating ${name} to type: ${correctType}...`);
      await notion.pages.update({
        page_id: page.id,
        properties: {
          'Type': {
            select: { name: correctType }
          }
        }
      });
    }
  }

  console.log('Fix complete!');
}

fixTypes();
