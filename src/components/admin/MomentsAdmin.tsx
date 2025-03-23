import React, { useState, useRef } from 'react';

const MomentsAdmin = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/moments', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        alert('Image uploaded successfully!');
        window.location.href = '/moments';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl mb-6">Add New Moment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="w-full p-2 rounded bg-gray-800/30"
            required
          />
        </div>

        {preview && (
          <div className="mt-4">
            <h3 className="mb-2">Preview:</h3>
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-gray-800/50 rounded hover:bg-gray-700/50"
          disabled={!selectedFile}
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default MomentsAdmin; 