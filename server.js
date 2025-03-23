import { handler } from './dist/server/entry.mjs';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static('dist/client'));

// Handle all other routes with the Astro handler
app.use(handler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 