import React, { useState } from 'react';
import Note from './Note';

type NoteType = {
  content: string;
  tags: string[];
  createdAt: string;
};

interface NotesContainerProps {
  notes?: NoteType[];
  theme: 'light' | 'dark';
}

const NotesContainer = ({ notes = [], theme }: NotesContainerProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get unique tags from all notes
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));
  
  // Filter notes based on selected tag
  const filteredNotes = selectedTag
    ? notes.filter(note => note.tags.includes(selectedTag))
    : notes;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl mb-8">Notes</h1>
      
      {/* Tags filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded transition-colors ${
            !selectedTag 
              ? (theme === 'light' ? 'bg-gray-200' : 'bg-gray-700/50')
              : (theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800/30 hover:bg-gray-700/50')
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded transition-colors ${
              selectedTag === tag
                ? (theme === 'light' ? 'bg-gray-200' : 'bg-gray-700/50')
                : (theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800/30 hover:bg-gray-700/50')
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Notes list */}
      <div className="space-y-8">
        {filteredNotes.map((note, index) => (
          <Note key={index} {...note} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default NotesContainer; 