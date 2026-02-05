const router = require("express").Router();
const auth = require("../middleware/auth");
const pool = require("../db");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req) => ({
    folder: "settling-in-buddy",
    resource_type: "image",
    public_id: `buddy_${req.params.userId}_${Date.now()}`,
  }),
});

const upload = multer({ storage });

// POST /api/uploads/buddy/:userId/photo  (admin only)
router.post("/buddy/:userId/photo", auth, upload.single("photo"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ error: "Invalid userId" });

    // Cloudinary returns the uploaded image URL here:
    const imageUrl = req.file?.path; // path = secure_url
    if (!imageUrl) return res.status(400).json({ error: "No image uploaded" });

    // Save to buddy_profiles.profile_image
    await pool.query(
      `UPDATE buddy_profiles SET profile_image=$1 WHERE user_id=$2`,
      [imageUrl, userId]
    );

    res.json({ ok: true, image: imageUrl });
  } catch (e) {
    console.error("UPLOAD ERROR:", e);
    res.status(500).json({ error: "Upload failed" });
  }
});

// POST /api/uploads/me/photo  (buddy only)
router.post("/me/photo", auth, upload.single("photo"), async (req, res) => {
  try {
    if (req.user.role !== "buddy") return res.status(403).json({ error: "Buddy only" });

    const imageUrl = req.file?.path;
    if (!imageUrl) return res.status(400).json({ error: "No image uploaded" });

    await pool.query(
      `INSERT INTO buddy_profiles (user_id) VALUES ($1)
       ON CONFLICT (user_id) DO NOTHING`,
      [req.user.id]
    );

    await pool.query(
      `UPDATE buddy_profiles SET profile_image=$1 WHERE user_id=$2`,
      [imageUrl, req.user.id]
    );

    res.json({ ok: true, image: imageUrl });
  } catch (e) {
    console.error("UPLOAD ME PHOTO ERROR:", e);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
