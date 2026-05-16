const MOCK_DATA = [
  {
    id: '1',
    name: 'Devin AI: Complete Engineering Mastery',
    author: 'Cognition AI',
    link: 'https://docs.devin.ai',
    publisher: 'Authority',
    date: '2024-05-16',
    score: 5,
    status: 'Ready',
    summary: 'The architect\'s guide to steering the world\'s first AI software engineer with precision prompts.',
    refLink: 'https://bigbangsocial.com',
    type: 'Coding',
    icon: '🤖'
  },
  {
    id: '2',
    name: 'Claude 3.5 Sonnet: Advanced Reasoning',
    author: 'Anthropic',
    link: 'https://docs.anthropic.com',
    refLink: 'https://bigbangsocial.com',
    type: 'LLM',
    icon: '🧠'
  },
  {
    id: '3',
    name: 'V0.dev: Visual UI Architecting',
    author: 'Vercel',
    link: 'https://v0.dev',
    refLink: 'https://bigbangsocial.com',
    type: 'Coding',
    icon: '🎨'
  },
  {
    id: '4',
    name: 'Suno v3.5: AI Music Engineering',
    author: 'Suno AI',
    link: 'https://suno.com',
    refLink: 'https://bigbangsocial.com',
    type: 'Music',
    icon: '🎵'
  }
];

export const fetchNotionDatabase = async () => {
  try {
    const response = await fetch('/api/notion');
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      return MOCK_DATA;
    }

    const data = await response.json();
    return data.results.map(page => {
      const props = page.properties;
      return {
        id: page.id,
        name: props.Name?.title[0]?.plain_text || 'Untitled',
        author: props.Author?.multi_select?.map(s => s.name).join(', ') || 'Unknown',
        link: props.Link?.url || '#',
        refLink: props['ref-link']?.url || props.Link?.url || '#',
        publisher: props.Publisher?.select?.name || 'Self',
        date: props['Publishing/Release Date']?.date?.start || '',
        score: (props['Score /5']?.select?.name?.match(/⭐/g) || []).length || 0,
        status: props.Status?.select?.name || 'Draft',
        summary: props.Summary?.rich_text[0]?.plain_text || '',
        slug: props.slug?.rich_text[0]?.plain_text || '',
        type: props.Type?.select?.name || 'Article',
        icon: page.icon?.emoji || '📄'
      };
    });
  } catch (error) {
    if (!(error instanceof SyntaxError)) console.error('Error fetching Notion database:', error);
    return MOCK_DATA;
  }
};

export const fetchPageContent = async (pageId) => {
  try {
    const response = await fetch(`/api/notion?type=content&id=${pageId}`);
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    return data.results; // Array of blocks
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [{ type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'Content preview is currently unavailable in local dev mode.' }] } }];
  }
};

export const fetchPageComments = async (pageId) => {
  try {
    const response = await fetch(`/api/notion?type=comments&id=${pageId}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    const data = await response.json();
    return data.results; // Array of comments
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
