const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");

/**
 * GET /api/admin/users?role=student|buddy|admin
 * List users (optionally filter by role)
 */
router.get("/users", auth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.query;

    const result = await pool.query(
      `SELECT id, role, full_name, email, home_country, ethnicity, uk_city, university, created_at
       FROM users
       WHERE ($1::text IS NULL OR role = $1)
       ORDER BY created_at DESC`,
      [role || null]
    );

    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
});

/**
 * GET /api/admin/buddies
 * List buddies with profile + verified
 */
router.get("/buddies", auth, requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        u.id, u.full_name, u.email, u.home_country, u.ethnicity, u.uk_city, u.university, u.created_at,
        bp.years_in_uk, bp.languages, bp.bio, bp.availability, bp.support_areas, bp.verified, bp.profile_image
      FROM users u
      LEFT JOIN buddy_profiles bp ON bp.user_id = u.id
      WHERE u.role = 'buddy'
      ORDER BY bp.verified DESC, u.created_at DESC`
    );

    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
});

/**
 * POST /api/admin/buddies
 * Create a buddy user + buddy profile
 */
router.post("/buddies", auth, requireAdmin, async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      home_country,
      ethnicity,
      uk_city,
      university,
      years_in_uk,
      languages,
      bio,
      availability,
      support_areas,
      verified,
      profile_image,
    } = req.body;

    if (!full_name || !email || !password || !ethnicity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hash = await bcrypt.hash(password, 10);

    const userRes = await pool.query(
      `INSERT INTO users (role, full_name, email, password_hash, home_country, ethnicity, uk_city, university)
       VALUES ('buddy', $1, $2, $3, $4, $5, $6, $7)
       RETURNING id, role, full_name, email, ethnicity`,
      [
        full_name,
        email.toLowerCase(),
        hash,
        home_country || null,
        ethnicity,
        uk_city || null,
        university || null,
      ]
    );

    const user = userRes.rows[0];

    const profileRes = await pool.query(
      `INSERT INTO buddy_profiles (user_id, years_in_uk, languages, bio, availability, support_areas, verified, profile_image)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (user_id) DO UPDATE SET
         years_in_uk = EXCLUDED.years_in_uk,
         languages = EXCLUDED.languages,
         bio = EXCLUDED.bio,
         availability = EXCLUDED.availability,
         support_areas = EXCLUDED.support_areas,
         verified = EXCLUDED.verified,
         profile_image = EXCLUDED.profile_image
       RETURNING *`,
      [
        user.id,
        years_in_uk ?? 1,
        languages ?? null,
        bio ?? null,
        availability ?? null,
        support_areas ?? null,
        verified ?? false,
        profile_image ?? null,
      ]
    );

    res.json({ user, profile: profileRes.rows[0] });
  } catch (e) {
    console.error(e);
    // unique email
    if (String(e.message || "").includes("users_email_key")) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Database error" });
  }
});

/**
 * POST /api/admin/buddies/:id/verify
 * Toggle verified status for a buddy
 */
router.post("/buddies/:id/verify", auth, requireAdmin, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { verified } = req.body;

    const result = await pool.query(
      `UPDATE buddy_profiles
       SET verified = $2
       WHERE user_id = $1
       RETURNING *`,
      [userId, !!verified]
    );

    if (!result.rows[0]) return res.status(404).json({ error: "Buddy profile not found" });
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Delete any user (except yourself)
 */
router.delete("/users/:id", auth, requireAdmin, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (userId === req.user.id) {
      return res.status(400).json({ error: "You cannot delete your own admin account" });
    }

    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING id, email, role`,
      [userId]
    );

    if (!result.rows[0]) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, deleted: result.rows[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
