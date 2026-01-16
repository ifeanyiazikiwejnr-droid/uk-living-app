const pool = require("./db");

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accommodations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      price INT NOT NULL,
      link TEXT NOT NULL
    );
  `);

  // seed if empty
  const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM accommodations;`);
  if (rows[0].count === 0) {
    await pool.query(
      `INSERT INTO accommodations (name, city, price, link)
       VALUES
       ('SpareRoom', 'London', 850, 'https://www.spareroom.co.uk/'),
       ('Rightmove Rentals', 'Manchester', 700, 'https://www.rightmove.co.uk/');`
    );
    console.log("Seeded accommodations ✅");
  } else {
    console.log("Accommodations already exists ✅");
  }

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
