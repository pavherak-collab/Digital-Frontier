import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    const store = getStore("downloads");

    if (req.method === "GET") {
      const raw = await store.get("count");
      const count = raw ? Number(raw) : 0;
      return new Response(JSON.stringify({ count }), { status: 200, headers });
    }

    if (req.method === "POST") {
      const raw = await store.get("count");
      const next = (raw ? Number(raw) : 0) + 1;
      await store.set("count", String(next));
      return new Response(JSON.stringify({ count: next }), {
        status: 200,
        headers,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (err) {
    console.error("downloads function error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};

export const config: Config = {
  path: "/api/downloads",
};
