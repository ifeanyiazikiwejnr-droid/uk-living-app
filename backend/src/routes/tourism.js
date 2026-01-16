const router = require("express").Router();
const pool = require("../db");

// GET /api/tourism
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tourism ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
