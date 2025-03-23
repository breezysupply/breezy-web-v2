import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));
  const { theme } = useTheme();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);

    setCurrentPath(window.location.pathname);
    return () => clearInterval(timer);
  }, []);

  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const hoverColor = theme === 'light' ? 'hover:text-gray-600' : 'hover:text-gray-300';
  const activeColor = theme === 'light' ? 'text-black font-medium' : 'text-white font-medium';

  const isCurrentPage = (path: string) => currentPath === path;

  return (
    <nav className="fixed top-0 left-0 p-8 w-64 h-screen flex flex-col">
      <div className="mb-12">
        <a href="/" className={`text-lg font-medium ${textColor} ${hoverColor} transition-colors`}>
          Brett Pierce
        </a>
      </div>
      
      <ul className="space-y-3 mb-auto">
        {[
          { path: '/work', label: 'Work' },
          { path: '/notes', label: 'Notes' },
          { path: '/training', label: 'Training' },
          { path: '/moments', label: 'Moments' }
        ].map(({ path, label }, index) => (
          <li key={path}>
            <a 
              href={path} 
              className={`flex items-center space-x-3 py-1 transition-all ${
                isCurrentPage(path) ? activeColor : `${textColor} opacity-60 hover:opacity-100`
              }`}
            >
              <span className="text-sm opacity-50 font-mono">0{index + 1}</span>
              <span>{label}</span>
              {isCurrentPage(path) && (
                <span className="ml-auto text-sm">→</span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className={`space-y-4 text-sm ${textColor} opacity-60`}>
        <p>
          <span className="text-xs uppercase tracking-wider opacity-50">Location</span><br />
          Brambleton, VA
        </p>
        <p>
          <span className="text-xs uppercase tracking-wider opacity-50">Local Time</span><br />
          {time}
        </p>
        <p>
          <span className="text-xs uppercase tracking-wider opacity-50">Social</span><br />
          <a href="https://instagram.com/bpeez" className={`${hoverColor} opacity-100`}>Instagram</a>
        </p>
        <p>
          <span className="text-xs uppercase tracking-wider opacity-50">Contact</span><br />
          <a href="mailto:bapierce88@gmail.com" className={`${hoverColor} opacity-100`}>Email me</a>
        </p>
      </div>
    </nav>
  );
};

export default Navigation; 