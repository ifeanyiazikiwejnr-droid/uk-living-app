require("dotenv").config();
const pool = require("./db");
const bcrypt = require("bcrypt");

async function main() {
  const email = "admin@settlingbuddy.com";
  const password = "AdminPass123!";
  const full_name = "Admin";

  const hash = await bcrypt.hash(password, 10);

  const res = await pool.query(
    `INSERT INTO users (role, full_name, email, password_hash)
     VALUES ('admin', $1, $2, $3)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, email, role`,
    [full_name, email.toLowerCase(), hash]
  );

  console.log(res.rows[0] || { message: "Admin already exists", email });
  await pool.end();
}

main().catch(console.error);
