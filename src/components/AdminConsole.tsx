import React, { useState } from 'react';
import { useTheme, ThemeProvider } from '../context/ThemeContext';
import NotesAdmin from './admin/NotesAdmin';
import TrainingAdmin from './admin/TrainingAdmin';
import MomentsAdmin from './admin/MomentsAdmin';

type AdminSection = 'notes' | 'training' | 'moments';

const AdminContent = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<AdminSection>('notes');
  const bgColor = theme === 'light' ? 'bg-gray-100' : 'bg-gray-800/50';

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${bgColor} w-64 p-6 space-y-4`}>
        <h2 className="text-xl font-bold mb-6">Admin Console</h2>
        <button 
          onClick={() => setActiveSection('notes')}
          className={`w-full text-left p-2 rounded ${activeSection === 'notes' ? 'bg-gray-700/50' : ''}`}
        >
          Notes
        </button>
        <button 
          onClick={() => setActiveSection('training')}
          className={`w-full text-left p-2 rounded ${activeSection === 'training' ? 'bg-gray-700/50' : ''}`}
        >
          Training
        </button>
        <button 
          onClick={() => setActiveSection('moments')}
          className={`w-full text-left p-2 rounded ${activeSection === 'moments' ? 'bg-gray-700/50' : ''}`}
        >
          Moments
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        {activeSection === 'notes' && <NotesAdmin />}
        {activeSection === 'training' && <TrainingAdmin />}
        {activeSection === 'moments' && <MomentsAdmin />}
      </div>
    </div>
  );
};

const AdminConsole = () => {
  return (
    <ThemeProvider>
      <AdminContent />
    </ThemeProvider>
  );
};

export default AdminConsole; 