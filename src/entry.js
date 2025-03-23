import { handler } from './server/entry.mjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
  cwd: process.cwd(),
  staticPath: path.join(__dirname, 'client')
});

try {
  // Enhanced request logging
  app.use((req, res, next) => {
    const start = Date.now();
    console.log(`Request started: ${req.method} ${req.url}`);
    next();
  });

  // IMPORTANT: Serve static files from the client directory with correct path
  app.use(express.static(path.join(__dirname, 'client')));
  
  // Add specific routes for each page to debug
  app.get('/work', (req, res, next) => {
    console.log('Work route hit directly');
    next();
  });
  
  app.get('/moments', (req, res, next) => {
    console.log('Moments route hit directly');
    next();
  });
  
  app.get('/notes', (req, res, next) => {
    console.log('Notes route hit directly');
    next();
  });
  
  app.get('/info', (req, res, next) => {
    console.log('Info route hit directly');
    next();
  });
  
  // Handle all routes with Astro handler
  app.use(handler);

  // Log response completion
  app.use((req, res, next) => {
    res.on('finish', () => {
      const duration = Date.now() - req.start;
      console.log(
        `${new Date().toISOString()} - ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`
      );
    });
    next();
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error:', {
      error: err,
      url: req.url,
      method: req.method,
      headers: req.headers
    });
    res.status(500).send('Internal Server Error');
  });

  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
} 