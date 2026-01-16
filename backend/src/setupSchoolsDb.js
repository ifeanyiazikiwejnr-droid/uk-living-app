const pool = require("./db");

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      type TEXT NOT NULL,
      link TEXT NOT NULL
    );
  `);

  const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM schools;`);

  if (rows[0].count === 0) {
    await pool.query(`
      INSERT INTO schools (name, city, type, link)
      VALUES
      ('Find and compare schools in England', 'England', 'Official search', 'https://www.gov.uk/school-performance-tables'),
      ('Get information about schools (England)', 'England', 'Official database', 'https://get-information-schools.service.gov.uk/'),
      ('Find a school (Scotland)', 'Scotland', 'Official search', 'https://www.mygov.scot/school-contact-details'),
      ('Find a school (Wales)', 'Wales', 'Official search', 'https://www.gov.wales/find-school'),
      ('Find a school (Northern Ireland)', 'Northern Ireland', 'Official search', 'https://www.education-ni.gov.uk/services/find-school');
    `);

    console.log("Seeded schools ✅");
  } else {
    console.log("Schools already exist ✅");
  }

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
