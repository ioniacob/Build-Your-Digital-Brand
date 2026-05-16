export async function onRequest(context) {
  const { env } = context;
  const NOTION_API_KEY = env.VITE_NOTION_API_KEY;
  const DATABASE_ID = env.VITE_NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !DATABASE_ID) {
    return new Response(JSON.stringify({ error: "Missing configuration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { searchParams } = new URL(context.request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (type === 'content' && id) {
    try {
      const response = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, {
        headers: {
          "Authorization": `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
  }

  if (type === 'comments' && id) {
    try {
      const response = await fetch(`https://api.notion.com/v1/comments?block_id=${id}`, {
        headers: {
          "Authorization": `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
  }

  // Default: Fetch database items
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [{ property: "Publishing/Release Date", direction: "descending" }],
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
