const pool = require("./db");

async function main() {
  // Restaurants table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      cuisine TEXT NOT NULL,
      city TEXT NOT NULL,
      link TEXT
    );
  `);

  // Jobs table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      link TEXT NOT NULL
    );
  `);

  // Starter pack table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS starter_pack (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      link TEXT NOT NULL
    );
  `);

  // Seed Restaurants if empty
  const rCount = await pool.query(`SELECT COUNT(*)::int AS count FROM restaurants;`);
  if (rCount.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO restaurants (name, cuisine, city, link)
      VALUES
      ('Dishoom', 'Indian', 'London', 'https://www.dishoom.com/'),
      ('Rudy’s Pizza', 'Italian', 'Manchester', 'https://www.rudyspizza.co.uk/');
    `);
    console.log("Seeded restaurants ✅");
  } else {
    console.log("Restaurants already exist ✅");
  }

  // Seed Jobs if empty
  const jCount = await pool.query(`SELECT COUNT(*)::int AS count FROM jobs;`);
  if (jCount.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO jobs (title, company, link)
      VALUES
      ('Customer Assistant', 'Tesco', 'https://www.tesco-careers.com/'),
      ('Warehouse Operative', 'Amazon', 'https://www.amazon.jobs/');
    `);
    console.log("Seeded jobs ✅");
  } else {
    console.log("Jobs already exist ✅");
  }

  // Seed Starter Pack if empty
  const sCount = await pool.query(`SELECT COUNT(*)::int AS count FROM starter_pack;`);
  if (sCount.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO starter_pack (category, name, link)
      VALUES
      ('Banking', 'Monzo', 'https://monzo.com/'),
      ('Banking', 'Starling', 'https://www.starlingbank.com/'),
      ('Network', 'giffgaff', 'https://www.giffgaff.com/'),
      ('Transport', 'Trainline', 'https://www.thetrainline.com/'),
      ('GP Registration', 'NHS - Register with a GP', 'https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/');
    `);
    console.log("Seeded starter pack ✅");
  } else {
    console.log("Starter pack already exists ✅");
  }

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
