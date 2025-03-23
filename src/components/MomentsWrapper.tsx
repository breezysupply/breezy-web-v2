import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import ImageGrid from './ImageGrid';

const MomentsWrapper = () => {
  return (
    <ThemeProvider>
      <ImageGrid />
    </ThemeProvider>
  );
};

export default MomentsWrapper; 