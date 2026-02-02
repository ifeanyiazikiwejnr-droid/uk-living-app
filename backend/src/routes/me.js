const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// GET /api/me/buddy
router.get("/buddy", auth, async (req, res) => {
  if (req.user.role !== "student") return res.status(403).json({ error: "Student only" });

  const matchRes = await pool.query(
    `SELECT m.*, u.full_name, u.home_country, u.uk_city, u.university,
            bp.years_in_uk, bp.languages, bp.bio, bp.availability, bp.support_areas, bp.profile_image, bp.verified
     FROM matches m
     JOIN users u ON u.id = m.buddy_user_id
     LEFT JOIN buddy_profiles bp ON bp.user_id = u.id
     WHERE m.student_user_id = $1 AND m.status='active'
     LIMIT 1`,
    [req.user.id]
  );

  res.json(matchRes.rows[0] || null);
});

// GET /api/me/tasks
router.get("/tasks", auth, async (req, res) => {
  if (req.user.role !== "student") return res.status(403).json({ error: "Student only" });

  const result = await pool.query(
    `SELECT t.id, t.category, t.title, t.description, t.week_number,
            COALESCE(p.completed, false) AS completed
     FROM support_tasks t
     LEFT JOIN student_task_progress p
       ON p.task_id = t.id AND p.student_user_id = $1
     ORDER BY t.week_number ASC, t.id ASC`,
    [req.user.id]
  );
  res.json(result.rows);
});

// POST /api/me/tasks/:id/toggle
router.post("/tasks/:id/toggle", auth, async (req, res) => {
  if (req.user.role !== "student") return res.status(403).json({ error: "Student only" });

  const taskId = Number(req.params.id);
  const existing = await pool.query(
    `SELECT * FROM student_task_progress WHERE student_user_id=$1 AND task_id=$2`,
    [req.user.id, taskId]
  );

  if (!existing.rows[0]) {
    const created = await pool.query(
      `INSERT INTO student_task_progress (student_user_id, task_id, completed, completed_at)
       VALUES ($1,$2,true,NOW())
       RETURNING *`,
      [req.user.id, taskId]
    );
    return res.json(created.rows[0]);
  }

  const updated = await pool.query(
    `UPDATE student_task_progress
     SET completed = NOT completed,
         completed_at = CASE WHEN completed = false THEN NOW() ELSE NULL END
     WHERE student_user_id=$1 AND task_id=$2
     RETURNING *`,
    [req.user.id, taskId]
  );
  res.json(updated.rows[0]);
});

module.exports = router;
