import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

console.log('Starting server with environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: port,
  HOST: host,
  __dirname,
  cwd: process.cwd()
});

// Simple request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static(__dirname));

// SPA fallback - send index.html for all routes
app.get('*', (req, res) => {
  // First check if the exact path exists
  const filePath = path.join(__dirname, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  
  // Then check if there's an index.html in the path
  const indexPath = path.join(__dirname, req.path, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  
  // Finally, fall back to the root index.html
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
}); 