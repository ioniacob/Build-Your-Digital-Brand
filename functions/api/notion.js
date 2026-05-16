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

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [
          {
            property: "Publishing/Release Date",
            direction: "descending",
          },
        ],
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
