import { Router, type IRouter } from "express";
import { db, downloadsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

// GET /api/downloads — return current count
router.get("/downloads", async (req, res) => {
  try {
    const rows = await db.select().from(downloadsTable).where(eq(downloadsTable.id, 1));
    if (rows.length === 0) {
      await db.insert(downloadsTable).values({ id: 1, count: 0 });
      res.json({ count: 0 });
    } else {
      res.json({ count: rows[0].count });
    }
  } catch (err) {
    req.log.error({ err }, "Failed to get download count");
    res.status(500).json({ error: "Failed to get count" });
  }
});

// POST /api/downloads — increment count by 1
router.post("/downloads", async (req, res) => {
  try {
    await db
      .insert(downloadsTable)
      .values({ id: 1, count: 1 })
      .onConflictDoUpdate({
        target: downloadsTable.id,
        set: { count: sql`${downloadsTable.count} + 1` },
      });

    const rows = await db.select().from(downloadsTable).where(eq(downloadsTable.id, 1));
    res.json({ count: rows[0]?.count ?? 1 });
  } catch (err) {
    req.log.error({ err }, "Failed to increment download count");
    res.status(500).json({ error: "Failed to increment" });
  }
});

export default router;
