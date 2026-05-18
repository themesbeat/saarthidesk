const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  console.log("Connecting to database...");
  try {
    const user = await prisma.user.findFirst();
    console.log("Database connection successful! First user:", user);
  } catch (err) {
    console.error("Database connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
