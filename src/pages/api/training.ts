import type { APIRoute } from 'astro';
import fs from 'fs/promises';  // Change to promises version
import path from 'path';

// Add this line to enable server-side rendering
export const prerender = false;

const TRAINING_FILE = path.join(process.cwd(), 'src/data/training.json');

export const GET: APIRoute = async () => {
  try {
    const fileContent = await fs.readFile(TRAINING_FILE, 'utf-8');
    const entries = JSON.parse(fileContent);
    return new Response(JSON.stringify(entries), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const entry = await request.json();
    
    // Add creation date
    const entryWithDate = {
      ...entry,
      createdAt: new Date().toISOString(),
      daysAgo: 0
    };
    
    // Ensure the directory exists
    const dir = path.dirname(TRAINING_FILE);
    try {
      await fs.access(dir);
    } catch {
      console.log('Creating directory:', dir);
      await fs.mkdir(dir, { recursive: true });
    }
    
    // Read existing entries
    let existingEntries = [];
    try {
      const fileContent = await fs.readFile(TRAINING_FILE, 'utf-8');
      existingEntries = JSON.parse(fileContent);
    } catch (error) {
      console.log('No existing training file or empty file');
    }
    
    // Add new entry
    existingEntries.unshift(entryWithDate);
    
    // Update days ago for all entries
    existingEntries.forEach((entry: any, index: number) => {
      entry.daysAgo = index;
    });
    
    // Write back to file
    await fs.writeFile(TRAINING_FILE, JSON.stringify(existingEntries, null, 2));
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error handling training entry:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 