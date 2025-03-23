import React from 'react';

type ImageModalProps = {
  image: {
    src: string;
    alt: string;
  };
  onClose: () => void;
};

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div className="max-w-[90vw] max-h-[90vh]">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal; 