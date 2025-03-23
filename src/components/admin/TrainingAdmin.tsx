import React, { useState } from 'react';

type TrainingEntry = {
  content: string;
  tags: string[];
  daysAgo: number;
  stats?: {
    label: string;
    value: string;
  }[];
};

const TrainingAdmin = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [stats, setStats] = useState<{ label: string; value: string; }[]>([
    { label: '', value: '' }
  ]);

  const handleAddStat = () => {
    setStats([...stats, { label: '', value: '' }]);
  };

  const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: TrainingEntry = {
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      daysAgo: 0,
      stats: stats.filter(stat => stat.label && stat.value)
    };

    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        setContent('');
        setTags('');
        setStats([{ label: '', value: '' }]);
        alert('Training entry added successfully!');
        window.location.href = '/training';
      }
    } catch (error) {
      console.error('Error adding training entry:', error);
      alert('Error adding training entry');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl mb-6">Add Training Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-2 rounded bg-gray-800/30"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 rounded bg-gray-800/30"
            placeholder="running, cardio, strength"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Stats</label>
          {stats.map((stat, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800/30"
                placeholder="Label (e.g., Distance)"
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800/30"
                placeholder="Value (e.g., 5 miles)"
              />
              <button
                type="button"
                onClick={() => handleRemoveStat(index)}
                className="px-3 py-1 bg-red-500/30 rounded hover:bg-red-500/50"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStat}
            className="mt-2 px-3 py-1 bg-gray-800/30 rounded hover:bg-gray-700/50"
          >
            + Add Stat
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-gray-800/50 rounded hover:bg-gray-700/50"
        >
          Add Training Entry
        </button>
      </form>
    </div>
  );
};

export default TrainingAdmin; 