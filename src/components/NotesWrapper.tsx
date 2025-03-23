import React, { useState } from 'react';
import { useTheme, ThemeProvider } from '../context/ThemeContext';
import Note from './Note';

type Note = {
  content: string;
  tags: string[];
  daysAgo: number;
};

type NotesWrapperProps = {
  notes: Note[];
};

const NotesContent = ({ notes }: NotesWrapperProps) => {
  const { theme } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get unique tags from all notes
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));
  
  // Filter notes based on selected tag
  const filteredNotes = selectedTag
    ? notes.filter(note => note.tags.includes(selectedTag))
    : notes;

  return (
    <div>
      {/* Tags filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded ${
            !selectedTag ? 'bg-gray-700/50' : 'bg-gray-800/30 hover:bg-gray-700/50'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded ${
              selectedTag === tag ? 'bg-gray-700/50' : 'bg-gray-800/30 hover:bg-gray-700/50'
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

const NotesWrapper = ({ notes }: NotesWrapperProps) => {
  return (
    <ThemeProvider>
      <NotesContent notes={notes} />
    </ThemeProvider>
  );
};

export default NotesWrapper; 