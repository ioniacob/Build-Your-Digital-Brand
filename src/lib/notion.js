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
    type: 'Coding',
    icon: '🤖'
  },
  {
    id: '2',
    name: 'Claude 3.5 Sonnet: Advanced Reasoning',
    author: 'Anthropic',
    link: 'https://docs.anthropic.com',
    publisher: 'Anthropic',
    date: '2024-05-15',
    score: 5,
    status: 'Ready',
    summary: 'Leveraging artifacts and system prompts for complex problem solving and creative writing.',
    type: 'LLM',
    icon: '🧠'
  },
  {
    id: '3',
    name: 'V0.dev: Visual UI Architecting',
    author: 'Vercel',
    link: 'https://v0.dev',
    publisher: 'Indie',
    date: '2024-05-14',
    score: 5,
    status: 'Finished',
    summary: 'How to describe interfaces to generate production-ready React components and Tailwind styles.',
    type: 'Coding',
    icon: '🎨'
  },
  {
    id: '4',
    name: 'Suno v3.5: AI Music Engineering',
    author: 'Suno AI',
    link: 'https://suno.com',
    publisher: 'Media',
    date: '2024-05-13',
    score: 4,
    status: 'Ready',
    summary: 'Structural prompt engineering for consistent song styles, transitions, and lyrical depth.',
    type: 'Music',
    icon: '🎵'
  }
];

export const fetchNotionDatabase = async () => {
  try {
    const response = await fetch('/api/notion');
    
    // Check if we got a JSON response
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      console.info('Notion API Proxy not found or returning HTML (expected in local dev). Using premium mock data.');
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
        publisher: props.Publisher?.select?.name || 'Self',
        date: props['Publishing/Release Date']?.date?.start || '',
        score: (props['Score /5']?.select?.name?.match(/⭐/g) || []).length || 0,
        status: props.Status?.select?.name || 'Draft',
        summary: props.Summary?.rich_text[0]?.plain_text || '',
        type: props.Type?.select?.name || 'Article',
        icon: page.icon?.emoji || '📄'
      };
    });
  } catch (error) {
    // Only log if it's not a syntax error from parsing HTML as JSON
    if (!(error instanceof SyntaxError)) {
      console.error('Error fetching Notion database:', error);
    }
    return MOCK_DATA;
  }
};
