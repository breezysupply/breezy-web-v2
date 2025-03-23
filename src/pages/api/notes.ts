import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

// Add this line to enable server-side rendering
export const prerender = false;

const NOTES_FILE = path.join(process.cwd(), 'src/data/notes.json');

export const GET: APIRoute = async () => {
  try {
    const fileContent = await fs.readFile(NOTES_FILE, 'utf-8');
    const notes = JSON.parse(fileContent);
    return new Response(JSON.stringify(notes), {
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
    const note = await request.json();
    console.log('Received note:', note);
    
    // Add creation date
    const noteWithDate = {
      ...note,
      createdAt: new Date().toISOString(),
      daysAgo: 0
    };
    
    // Ensure the directory exists
    const dir = path.dirname(NOTES_FILE);
    try {
      await fs.access(dir);
    } catch {
      console.log('Creating directory:', dir);
      await fs.mkdir(dir, { recursive: true });
    }
    
    // Read existing notes
    let existingNotes = [];
    try {
      const fileContent = await fs.readFile(NOTES_FILE, 'utf-8');
      console.log('Existing file content:', fileContent);
      existingNotes = JSON.parse(fileContent);
    } catch (error) {
      console.log('No existing notes file or empty file');
    }
    
    // Add new note
    existingNotes.unshift(noteWithDate);
    console.log('Updated notes array:', existingNotes);
    
    // Update days ago for all notes
    existingNotes.forEach((note: any, index: number) => {
      note.daysAgo = index;
    });
    
    // Write back to file
    await fs.writeFile(NOTES_FILE, JSON.stringify(existingNotes, null, 2));
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error handling note:', error);
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