import React, { useState } from 'react';

type Note = {
  content: string;
  tags: string[];
  daysAgo: number;
};

const NotesAdmin = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNote: Note = {
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      daysAgo: 0
    };

    try {
      console.log('Sending note:', newNote);
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        setContent('');
        setTags('');
        alert('Note added successfully!');
        window.location.replace('/notes');
      } else {
        console.error('Server error:', data);
        alert(`Error adding note: ${data.details || data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Error adding note: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl mb-6">Add New Note</h2>
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
            placeholder="design, interfaces, thoughts"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800/50 rounded hover:bg-gray-700/50"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NotesAdmin;