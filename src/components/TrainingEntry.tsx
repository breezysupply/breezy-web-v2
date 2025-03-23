import React from 'react';

type TrainingEntryProps = {
  content: string;
  tags: string[];
  createdAt: string;
  theme: 'light' | 'dark';
  stats?: {
    label: string;
    value: string;
  }[];
};

const TrainingEntry = ({ content, tags, createdAt, theme, stats }: TrainingEntryProps) => {
  const bgColor = theme === 'light' ? 'bg-gray-100' : 'bg-gray-800/50';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="mb-8">
      <div className={`${bgColor} p-6 rounded-lg backdrop-blur-sm`}>
        <p className="mb-4">{content}</p>
        {stats && (
          <div className={`${bgColor} rounded p-4 mb-4 space-y-2`}>
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between">
                <span>{stat.label}:</span>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-sm opacity-70">#{tag}</span>
          ))}
        </div>
      </div>
      <div className="text-right mt-2 text-sm opacity-50">
        {createdAt ? formatDate(createdAt) : 'No date'}
      </div>
    </div>
  );
};

export default TrainingEntry; 