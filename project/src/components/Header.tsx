import React from 'react';
import { Brain, Settings, User, Globe, Trophy, Flame } from 'lucide-react';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  streak: number;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange, streak }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyGenie
              </h1>
              <p className="text-sm text-gray-500">Personalized Study Guide Generator</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Streak Counter */}
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-orange-600 font-semibold">{streak} day streak!</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;