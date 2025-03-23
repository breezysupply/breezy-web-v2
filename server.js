import { handler } from './dist/server/entry.mjs';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the client directory
app.use(express.static('dist/client'));

// Handle all other routes with the Astro handler
app.use(handler);

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
}); 