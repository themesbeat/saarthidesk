const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually load .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remove surrounding quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ 
  adapter,
  log: ['error', 'warn']
});

async function main() {
  try {
    const kbs = await prisma.knowledgeBase.findMany();
    console.log('Total articles:', kbs.length);
    for (const kb of kbs) {
      console.log(`- ID: ${kb.id}`);
      console.log(`  Title: ${kb.title}`);
      console.log(`  Type: ${kb.type}`);
      console.log(`  Content Length: ${kb.content.length}`);
      console.log(`  Sample Content: ${kb.content.substring(0, 700)}...`);
      console.log('----------------------------------------');
    }
  } catch (err) {
    console.error("Database query failed:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
