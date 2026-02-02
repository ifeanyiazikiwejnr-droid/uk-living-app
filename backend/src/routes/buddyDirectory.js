const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// GET /api/buddy-directory/ethnicities
router.get("/ethnicities", auth, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ethnicity
       FROM users
       WHERE role='buddy' AND ethnicity IS NOT NULL
       ORDER BY ethnicity ASC`
    );
    res.json(result.rows.map(r => r.ethnicity));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
});

// GET /api/buddy-directory/buddies?ethnicity=Nigerian
router.get("/buddies", auth, async (req, res) => {
  try {
    const { ethnicity } = req.query;
    if (!ethnicity) return res.status(400).json({ error: "ethnicity required" });

    const result = await pool.query(
      `SELECT
         u.id,
         u.full_name,
         u.ethnicity,
         u.uk_city,
         u.university,
         bp.years_in_uk,
         bp.languages,
         bp.bio,
         bp.availability,
         bp.support_areas,
         bp.profile_image,
         bp.verified
       FROM users u
       JOIN buddy_profiles bp ON bp.user_id = u.id
       WHERE u.role='buddy'
         AND u.ethnicity ILIKE $1
       ORDER BY bp.verified DESC, bp.years_in_uk DESC`,
      [ethnicity]
    );

    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
