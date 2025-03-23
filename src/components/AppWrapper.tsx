import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import Navigation from './Navigation';
import Settings from './Settings';

type AppWrapperProps = {
  children?: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <ThemeProvider>
      <div className={`min-h-screen bg-gradient-to-br from-slate-300 via-slate-100 to-white dark:from-[#050824] dark:to-black transition-colors duration-200`}>
        <Navigation />
        <Settings />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default AppWrapper;