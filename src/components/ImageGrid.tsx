import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ImageModal from './ImageModal';

type Image = {
  src: string;
  alt: string;
  createdAt: string;
};

const ImageGrid = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/moments');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800/50 rounded-lg transition-opacity hover:opacity-90"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
};

export default ImageGrid; 