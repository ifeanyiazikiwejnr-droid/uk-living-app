const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// POST /api/buddies/profile (buddy creates/updates profile)
router.post("/profile", auth, async (req, res) => {
  if (req.user.role !== "buddy") return res.status(403).json({ error: "Buddy only" });

  const { years_in_uk, languages, bio, availability, support_areas, profile_image } = req.body;

  const result = await pool.query(
    `INSERT INTO buddy_profiles (user_id, years_in_uk, languages, bio, availability, support_areas)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (user_id) DO UPDATE SET
       years_in_uk = EXCLUDED.years_in_uk,
       languages = EXCLUDED.languages,
       bio = EXCLUDED.bio,
       availability = EXCLUDED.availability,
       support_areas = EXCLUDED.support_areas,
       profile_image = EXCLUDED.profile_image
     RETURNING *`,
    [req.user.id, years_in_uk ?? 1, languages ?? null, bio ?? null, availability ?? null, support_areas ?? null, profile_image || null]
  );

  res.json(result.rows[0]);
});

// GET /api/buddies (list buddies for matching, simple)
router.get("/", auth, async (_req, res) => {
  const result = await pool.query(
    `SELECT u.id, u.full_name, u.home_country, u.uk_city, u.university,
            bp.years_in_uk, bp.languages, bp.bio, bp.availability, bp.support_areas, bp.verified
     FROM users u
     JOIN buddy_profiles bp ON bp.user_id = u.id
     WHERE u.role = 'buddy'
     ORDER BY bp.verified DESC, bp.years_in_uk DESC`
  );
  res.json(result.rows);
});

module.exports = router;