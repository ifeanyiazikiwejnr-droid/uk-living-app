const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// GET /api/buddies/my-students  (buddy only)
router.get("/my-students", auth, async (req, res) => {
  try {
    if (req.user.role !== "buddy") {
      return res.status(403).json({ error: "Buddy only" });
    }

    const result = await pool.query(
      `
      SELECT
        m.id AS match_id,
        m.status AS match_status,
        m.created_at AS matched_at,

        s.id AS student_user_id,
        s.full_name,
        s.email,
        s.home_country,
        s.ethnicity,
        s.uk_city,
        s.university

      FROM matches m
      JOIN users s ON s.id = m.student_user_id
      WHERE m.buddy_user_id = $1
        AND m.status = 'active'
      ORDER BY m.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (e) {
    console.error("MY STUDENTS ERROR:", e);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
