import { handler } from './server/entry.mjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

// Add startup error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Log environment and paths
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: port,
  HOST: host,
  __dirname,
  cwd: process.cwd()
});

try {
  // Serve static files from the client directory
  app.use(express.static(path.join(__dirname, '../client')));

  // Add request logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Handle all routes with Astro
  app.use(handler);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  });

  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
} 