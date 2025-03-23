import React from 'react';

type NoteProps = {
  content: string;
  tags: string[];
  createdAt: string;
  theme?: 'light' | 'dark';
};

const Note = ({ content, tags, createdAt, theme }: NoteProps) => {
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
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-sm opacity-70">#{tag}</span>
          ))}
        </div>
      </div>
      <div className="text-right mt-2 text-sm opacity-50">
        {formatDate(createdAt)}
      </div>
    </div>
  );
};

export default Note; 