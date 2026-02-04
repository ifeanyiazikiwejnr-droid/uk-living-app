require("dotenv").config();
const pool = require("./db");
const bcrypt = require("bcrypt");

const buddies = [
  // Nigerian (3)
  {
    full_name: "Ada Okoye",
    email: "ada.nigerian1@settlingbuddy.com",
    password: "Password123!",
    home_country: "Nigeria",
    ethnicity: "Nigerian",
    uk_city: "London",
    university: "University of Westminster",
    profile: {
      years_in_uk: 4,
      languages: "English, Igbo",
      bio: "I help with banking setup, GP registration, and navigating London transport.",
      availability: "Weekends and evenings",
      support_areas: "banking,transport,health,housing",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
  },
  {
    full_name: "Tunde Adebayo",
    email: "tunde.nigerian2@settlingbuddy.com",
    password: "Password123!",
    home_country: "Nigeria",
    ethnicity: "Nigerian",
    uk_city: "Manchester",
    university: "University of Manchester",
    profile: {
      years_in_uk: 3,
      languages: "English, Yoruba",
      bio: "I can guide you through student life in Manchester, transport, and part-time work basics.",
      availability: "Evenings",
      support_areas: "academics,transport,work,social",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },
  },
  {
    full_name: "Chiamaka Nwosu",
    email: "chiamaka.nigerian3@settlingbuddy.com",
    password: "Password123!",
    home_country: "Nigeria",
    ethnicity: "Nigerian",
    uk_city: "Birmingham",
    university: "University of Birmingham",
    profile: {
      years_in_uk: 5,
      languages: "English, Igbo",
      bio: "I support housing, budgeting, and settling in confidently.",
      availability: "Flexible",
      support_areas: "housing,banking,social",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    },
  },

  // Ghanaian (3)
  {
    full_name: "Kwame Mensah",
    email: "kwame.ghanaian1@settlingbuddy.com",
    password: "Password123!",
    home_country: "Ghana",
    ethnicity: "Ghanaian",
    uk_city: "London",
    university: "King's College London",
    profile: {
      years_in_uk: 4,
      languages: "English, Twi",
      bio: "Happy to help with TfL, banking, and adjusting to UK culture.",
      availability: "Weekends",
      support_areas: "transport,banking,social",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  },
  {
    full_name: "Ama Boateng",
    email: "ama.ghanaian2@settlingbuddy.com",
    password: "Password123!",
    home_country: "Ghana",
    ethnicity: "Ghanaian",
    uk_city: "Leeds",
    university: "University of Leeds",
    profile: {
      years_in_uk: 2,
      languages: "English, Twi",
      bio: "I can guide you through GP registration, student discounts, and city navigation.",
      availability: "Evenings",
      support_areas: "health,transport,academics",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    },
  },
  {
    full_name: "Kofi Owusu",
    email: "kofi.ghanaian3@settlingbuddy.com",
    password: "Password123!",
    home_country: "Ghana",
    ethnicity: "Ghanaian",
    uk_city: "Bristol",
    university: "University of Bristol",
    profile: {
      years_in_uk: 3,
      languages: "English, Twi",
      bio: "I help with finding accommodation and understanding UK renting rules.",
      availability: "Weekends and evenings",
      support_areas: "housing,banking",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  },

  // Indian (3)
  {
    full_name: "Arjun Patel",
    email: "arjun.indian1@settlingbuddy.com",
    password: "Password123!",
    home_country: "India",
    ethnicity: "Indian",
    uk_city: "London",
    university: "UCL",
    profile: {
      years_in_uk: 4,
      languages: "English, Hindi",
      bio: "Support with academics, transport apps, and finding student communities.",
      availability: "Evenings",
      support_areas: "academics,transport,social",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1528892952291-009c663ce843",
    },
  },
  {
    full_name: "Priya Sharma",
    email: "priya.indian2@settlingbuddy.com",
    password: "Password123!",
    home_country: "India",
    ethnicity: "Indian",
    uk_city: "Manchester",
    university: "Manchester Metropolitan University",
    profile: {
      years_in_uk: 2,
      languages: "English, Hindi",
      bio: "I can help you get set up with banking, SIM plans, and settling into Manchester.",
      availability: "Weekends",
      support_areas: "banking,network,transport",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5",
    },
  },
  {
    full_name: "Rohit Singh",
    email: "rohit.indian3@settlingbuddy.com",
    password: "Password123!",
    home_country: "India",
    ethnicity: "Indian",
    uk_city: "Birmingham",
    university: "Aston University",
    profile: {
      years_in_uk: 5,
      languages: "English, Punjabi",
      bio: "Help with part-time work basics, NI number guidance, and budgeting.",
      availability: "Flexible",
      support_areas: "work,banking,social",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },
  },

  // Pakistani (3)
  {
    full_name: "Ahmed Khan",
    email: "ahmed.pakistani1@settlingbuddy.com",
    password: "Password123!",
    home_country: "Pakistan",
    ethnicity: "Pakistani",
    uk_city: "London",
    university: "Queen Mary University of London",
    profile: {
      years_in_uk: 3,
      languages: "English, Urdu",
      bio: "I’ll help you navigate transport, GP registration, and settling in.",
      availability: "Evenings",
      support_areas: "transport,health,academics",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  },
  {
    full_name: "Ayesha Malik",
    email: "ayesha.pakistani2@settlingbuddy.com",
    password: "Password123!",
    home_country: "Pakistan",
    ethnicity: "Pakistani",
    uk_city: "Leicester",
    university: "University of Leicester",
    profile: {
      years_in_uk: 2,
      languages: "English, Urdu",
      bio: "Happy to support housing search and student life tips.",
      availability: "Weekends",
      support_areas: "housing,social,banking",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    },
  },
  {
    full_name: "Bilal Hussain",
    email: "bilal.pakistani3@settlingbuddy.com",
    password: "Password123!",
    home_country: "Pakistan",
    ethnicity: "Pakistani",
    uk_city: "Glasgow",
    university: "University of Glasgow",
    profile: {
      years_in_uk: 4,
      languages: "English, Urdu",
      bio: "Support with trains/buses, budgeting, and settling into Scotland.",
      availability: "Flexible",
      support_areas: "transport,banking,social",
      verified: true,
      profile_image: "https://images.unsplash.com/photo-1528892952291-009c663ce843",
    },
  },
];

async function upsertBuddy(b) {
  const email = b.email.toLowerCase();

  // If user already exists, skip (safe re-run)
  const existing = await pool.query(`SELECT id FROM users WHERE email=$1`, [email]);
  if (existing.rows[0]) {
    console.log(`Skipping (exists): ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(b.password, 10);

  const userRes = await pool.query(
    `INSERT INTO users (role, full_name, email, password_hash, home_country, ethnicity, uk_city, university)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING id`,
    [
      "buddy",
      b.full_name,
      email,
      passwordHash,
      b.home_country,
      b.ethnicity,
      b.uk_city,
      b.university,
    ]
  );

  const userId = userRes.rows[0].id;

  await pool.query(
    `INSERT INTO buddy_profiles (user_id, years_in_uk, languages, bio, availability, support_areas, verified, profile_image)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      userId,
      b.profile.years_in_uk,
      b.profile.languages,
      b.profile.bio,
      b.profile.availability,
      b.profile.support_areas,
      b.profile.verified,
      b.profile.profile_image,
    ]
  );

  console.log(`Created buddy: ${b.ethnicity} — ${b.full_name}`);
}

async function main() {
  try {
    for (const b of buddies) {
      await upsertBuddy(b);
    }
    console.log("✅ Buddy seeding complete.");
  } catch (e) {
    console.error("❌ Seeding failed:", e);
  } finally {
    await pool.end();
  }
}

main();
