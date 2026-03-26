import { createApp } from './app.js';
import { connectToDatabase } from './config/db.js';
import { env } from './config/env.js';
import { seedIfEmpty } from './seed/index.js';

async function startServer() {
  await connectToDatabase(env.MONGODB_URI);
  await seedIfEmpty();

  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
