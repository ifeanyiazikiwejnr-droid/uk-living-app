const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// POST /api/matching/select-buddy
router.post("/select-buddy", auth, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Student only" });
  }

  const { buddy_user_id, home_country, preferred_city, support_areas } = req.body;
  if (!buddy_user_id) return res.status(400).json({ error: "buddy_user_id required" });

  // Create request (optional recordkeeping)
  const reqRes = await pool.query(
    `INSERT INTO match_requests (student_user_id, home_country, preferred_city, support_areas, status)
     VALUES ($1,$2,$3,$4,'matched')
     RETURNING *`,
    [req.user.id, home_country || "unknown", preferred_city || null, support_areas || null]
  );

  // Create match
  const matchRes = await pool.query(
    `INSERT INTO matches (student_user_id, buddy_user_id, match_request_id)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [req.user.id, buddy_user_id, reqRes.rows[0].id]
  );

  res.json({ match: matchRes.rows[0] });
});

// POST /api/matching/unmatch (student)
router.post("/unmatch", auth, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Student only" });
  }

  // delete active match
  const result = await pool.query(
    `DELETE FROM matches
     WHERE student_user_id = $1
     RETURNING *`,
    [req.user.id]
  );

  if (result.rowCount === 0) {
    return res.status(400).json({ error: "No active match to remove" });
  }

  res.json({ success: true });
});

module.exports = router;