const pool = require("./db");

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tourism (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      description TEXT NOT NULL,
      link TEXT
    );
  `);

  const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM tourism;`);

  if (rows[0].count === 0) {
    await pool.query(`
      INSERT INTO tourism (name, city, description, link)
      VALUES
      ('British Museum', 'London', 'World-famous museum with free entry.', 'https://www.britishmuseum.org/'),
      ('Tower of London', 'London', 'Historic castle and home of the Crown Jewels.', 'https://www.hrp.org.uk/tower-of-london/'),
      ('Edinburgh Castle', 'Edinburgh', 'Iconic hilltop fortress with city views.', 'https://www.edinburghcastle.scot/'),
      ('Roman Baths', 'Bath', 'Ancient Roman bath complex and museum.', 'https://www.romanbaths.co.uk/');
    `);

    console.log("Seeded tourism ✅");
  } else {
    console.log("Tourism already exists ✅");
  }

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
