// src/server.ts
import app from './app';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';

dotenv.config();

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    console.log('🧠 Connecting to database...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // stop app if DB not connected
  }
}

startServer();
