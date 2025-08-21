import React from 'react';
import { BookOpen, Brain, Target, Download, Share, Star } from 'lucide-react';

interface ContentItem {
  id: number;
  type: 'summary' | 'quiz' | 'flashcard';
  title: string;
  content: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  generated: Date;
}

interface GeneratedContentProps {
  content: ContentItem[];
  language: string;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, language }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary': return <BookOpen className="w-5 h-5" />;
      case 'quiz': return <Target className="w-5 h-5" />;
      case 'flashcard': return <Brain className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'summary': return 'bg-blue-500';
      case 'quiz': return 'bg-green-500'; 
      case 'flashcard': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800', 
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getLanguageText = (key: string) => {
    const translations = {
      en: {
        title: 'Generated Study Content',
        subtitle: 'AI-powered summaries, quizzes, and flashcards from your materials',
        summary: 'Summary',
        quiz: 'Quiz',
        flashcard: 'Flashcards',
        download: 'Download',
        share: 'Share',
        generatedOn: 'Generated on'
      },
      hi: {
        title: 'उत्पन्न अध्ययन सामग्री',
        subtitle: 'आपकी सामग्री से AI-संचालित सारांश, प्रश्नोत्तरी और फ्लैशकार्ड',
        summary: 'सारांश',
        quiz: 'प्रश्नोत्तरी', 
        flashcard: 'फ्लैशकार्ड',
        download: 'डाउनलोड',
        share: 'साझा करें',
        generatedOn: 'उत्पन्न किया गया'
      }
    };
    return translations[language as keyof typeof translations]?.[key] || translations.en[key];
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{getLanguageText('title')}</h2>
        <p className="text-gray-600">{getLanguageText('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className={`${getTypeColor(item.type)} p-2 rounded-lg text-white`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.title}</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.subject}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBadge(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.content}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{getLanguageText('generatedOn')} {item.generated.toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transform group-hover:scale-105 transition-all duration-200 font-medium">
                {item.type === 'summary' && 'Read Summary'}
                {item.type === 'quiz' && 'Start Quiz'}
                {item.type === 'flashcard' && 'Practice Cards'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedContent;