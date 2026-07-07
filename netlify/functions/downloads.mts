import type { Config } from "@netlify/functions";
import pg from "pg";

const { Pool } = pg;

let pool: InstanceType<typeof Pool> | null = null;

function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export default async (req: Request): Promise<Response> => {
  const db = getPool();

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (req.method === "GET") {
      const result = await db.query<{ count: number }>(
        "SELECT count FROM downloads WHERE id = 1"
      );
      const count = result.rows[0]?.count ?? 0;
      return new Response(JSON.stringify({ count: Number(count) }), {
        status: 200,
        headers,
      });
    }

    if (req.method === "POST") {
      const result = await db.query<{ count: number }>(
        `INSERT INTO downloads (id, count)
         VALUES (1, 1)
         ON CONFLICT (id) DO UPDATE
           SET count = downloads.count + 1
         RETURNING count`
      );
      const count = result.rows[0]?.count ?? 1;
      return new Response(JSON.stringify({ count: Number(count) }), {
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
