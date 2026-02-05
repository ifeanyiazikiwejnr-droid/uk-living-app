const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// GET /api/buddy/me  (buddy only)
router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.role !== "buddy") return res.status(403).json({ error: "Buddy only" });

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.ethnicity,
        u.uk_city,
        bp.years_in_uk,
        bp.languages,
        bp.bio,
        bp.availability,
        bp.support_areas,
        bp.verified,
        bp.profile_image
      FROM users u
      LEFT JOIN buddy_profiles bp ON bp.user_id = u.id
      WHERE u.id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows[0] || null);
  } catch (e) {
    console.error("BUDDY ME GET ERROR:", e);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT /api/buddy/me  (buddy only) update profile
router.put("/me", auth, async (req, res) => {
  try {
    if (req.user.role !== "buddy") return res.status(403).json({ error: "Buddy only" });

    const {
      uk_city,
      years_in_uk,
      languages,
      bio,
      availability,
      support_areas,
    } = req.body || {};

    // update users.uk_city
    await pool.query(`UPDATE users SET uk_city=$1 WHERE id=$2`, [uk_city ?? null, req.user.id]);

    // ensure buddy_profiles row exists
    await pool.query(
      `INSERT INTO buddy_profiles (user_id) VALUES ($1)
       ON CONFLICT (user_id) DO NOTHING`,
      [req.user.id]
    );

    // update buddy_profiles
    const result = await pool.query(
      `
      UPDATE buddy_profiles
      SET years_in_uk=$1, languages=$2, bio=$3, availability=$4, support_areas=$5
      WHERE user_id=$6
      RETURNING years_in_uk, languages, bio, availability, support_areas, verified, profile_image
      `,
      [
        years_in_uk ?? null,
        languages ?? null,
        bio ?? null,
        availability ?? null,
        support_areas ?? null,
        req.user.id,
      ]
    );

    res.json({ ok: true, profile: result.rows[0] });
  } catch (e) {
    console.error("BUDDY ME PUT ERROR:", e);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT /api/buddy/me/password  (buddy only)
router.put("/me/password", auth, async (req, res) => {
  try {
    if (req.user.role !== "buddy") return res.status(403).json({ error: "Buddy only" });

    const { current_password, new_password } = req.body || {};
    if (!current_password || !new_password) {
      return res.status(400).json({ error: "current_password and new_password required" });
    }

    const u = await pool.query(`SELECT password_hash FROM users WHERE id=$1`, [req.user.id]);
    const hash = u.rows[0]?.password_hash;
    if (!hash) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(current_password, hash);
    if (!ok) return res.status(401).json({ error: "Current password is incorrect" });

    const newHash = await bcrypt.hash(new_password, 10);
    await pool.query(`UPDATE users SET password_hash=$1 WHERE id=$2`, [newHash, req.user.id]);

    res.json({ ok: true });
  } catch (e) {
    console.error("BUDDY PASSWORD ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
