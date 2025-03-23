import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import TrainingEntry from './TrainingEntry';

const trainingEntries = [
  {
    content: "5 mile run along the waterfront. Felt strong today, managed to keep a steady pace throughout.",
    tags: ["running", "cardio"],
    daysAgo: 0,
    stats: [
      { label: "Distance", value: "5 miles" },
      { label: "Time", value: "42:30" },
      { label: "Pace", value: "8:30/mile" }
    ]
  },
  {
    content: "Upper body weight training. Focus on shoulders and back today.",
    tags: ["weights", "strength", "upper-body"],
    daysAgo: 3,
    stats: [
      { label: "Exercises", value: "Bench press, Rows, Shoulder press, Pull-ups" },
      { label: "Sets", value: "4" },
      { label: "Reps", value: "8-12" }
    ]
  },
  {
    content: "Recovery day. 30 minutes of stretching and mobility work focusing on hip flexors and hamstrings.",
    tags: ["recovery", "mobility", "stretching"],
    daysAgo: 4
  }
];

const TrainingContainer = ({ entries }: { entries: any[] }) => {
  const { theme } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags from all entries
  const allTags = ['all', ...new Set(entries.flatMap(entry => entry.tags))];

  const filteredEntries = selectedTag && selectedTag !== "all"
    ? entries.filter(entry => entry.tags.includes(selectedTag))
    : entries;

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === 'all' ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm transition-opacity
              ${(tag === 'all' && !selectedTag) || selectedTag === tag 
                ? 'bg-gray-800/50' 
                : 'bg-transparent opacity-50 hover:opacity-100'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredEntries.map((entry, index) => (
        <TrainingEntry key={index} {...entry} theme={theme} />
      ))}
    </div>
  );
};

export default TrainingContainer; 