const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, home_country, ethnicity, uk_city, university } = req.body;
    const role = req.body?.role || "student";
    if (!["student", "buddy", "admin"].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

    if (!full_name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
        INSERT INTO users (
          role,
          full_name,
          email,
          password_hash,
          home_country,
          ethnicity,
          uk_city,
          university
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING id, role, full_name, email
        `,
        [
          role,
          full_name,
          email,
          passwordHash,
          home_country || null,
          ethnicity || null,
          uk_city || null,
          university || null,
        ]
      );


    const user = result.rows[0];
    const token = signToken(user);
    res.json({ user, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      user: { id: user.id, role: user.role, full_name: user.full_name, email: user.email },
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
