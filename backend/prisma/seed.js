const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Accommodations
  await prisma.accommodation.createMany({
    data: [
      {
        name: "SpareRoom",
        city: "London",
        price: 850,
        link: "https://www.spareroom.co.uk/",
      },
      {
        name: "Rightmove Rentals",
        city: "Manchester",
        price: 700,
        link: "https://www.rightmove.co.uk/",
      },
    ],
  });

  console.log("Seeded ✅");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
