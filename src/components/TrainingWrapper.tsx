import React, { useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';
import TrainingEntry from './TrainingEntry';
import type { TrainingEntry as TrainingEntryType } from '../types/training';

type TrainingWrapperProps = {
  entries: TrainingEntryType[];
};

const TrainingContent = ({ entries }: TrainingWrapperProps) => {
  const { theme } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get unique tags from all entries
  const allTags = Array.from(new Set(entries.flatMap(entry => entry.tags)));
  
  // Filter entries based on selected tag
  const filteredEntries = selectedTag
    ? entries.filter(entry => entry.tags.includes(selectedTag))
    : entries;

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

      {/* Training entries list */}
      <div className="space-y-8">
        {filteredEntries.map((entry, index) => (
          <TrainingEntry key={index} {...entry} theme={theme} />
        ))}
      </div>
    </div>
  );
};

const TrainingWrapper = ({ entries }: TrainingWrapperProps) => {
  return (
    <ThemeProvider>
      <TrainingContent entries={entries} />
    </ThemeProvider>
  );
};

export default TrainingWrapper; 