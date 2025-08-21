import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import Dashboard from './components/Dashboard';
import FlashcardSystem from './components/FlashcardSystem';
import AITutorChat from './components/AITutorChat';
import GeneratedContent from './components/GeneratedContent';
import ExampleFlow from './components/ExampleFlow';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [streak, setStreak] = useState(7);

  // Sample data
  const subjects = [
    { name: 'Physics', progress: 85, color: 'bg-blue-500', performance: 'strong' as const },
    { name: 'Mathematics', progress: 72, color: 'bg-green-500', performance: 'strong' as const },
    { name: 'Chemistry', progress: 58, color: 'bg-yellow-500', performance: 'moderate' as const },
    { name: 'Biology', progress: 45, color: 'bg-red-500', performance: 'weak' as const },
    { name: 'History', progress: 78, color: 'bg-purple-500', performance: 'strong' as const },
    { name: 'Literature', progress: 65, color: 'bg-pink-500', performance: 'moderate' as const }
  ];

  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      question: "What is the first law of thermodynamics?",
      answer: "Energy cannot be created or destroyed, only converted from one form to another. The change in internal energy equals heat added minus work done by the system.",
      subject: "Physics",
      difficulty: 'medium' as const,
      learned: false
    },
    {
      id: 2,
      question: "Define entropy in thermodynamics",
      answer: "Entropy is a measure of disorder or randomness in a system. It tends to increase over time in isolated systems according to the second law of thermodynamics.",
      subject: "Physics", 
      difficulty: 'hard' as const,
      learned: true
    },
    {
      id: 3,
      question: "What is heat capacity?",
      answer: "Heat capacity is the amount of heat energy required to raise the temperature of a substance by one degree Celsius or Kelvin.",
      subject: "Physics",
      difficulty: 'easy' as const,
      learned: false
    }
  ]);

  const generatedContent = [
    {
      id: 1,
      type: 'summary' as const,
      title: 'Thermodynamics Chapter Summary',
      content: 'A comprehensive overview of thermodynamic principles including the laws of thermodynamics, heat transfer mechanisms, and energy conservation...',
      subject: 'Physics',
      difficulty: 'medium' as const,
      generated: new Date('2024-01-15')
    },
    {
      id: 2, 
      type: 'quiz' as const,
      title: 'Heat Transfer Practice Quiz',
      content: '10 multiple choice questions covering conduction, convection, and radiation with detailed explanations for each answer...',
      subject: 'Physics',
      difficulty: 'hard' as const,
      generated: new Date('2024-01-15')
    },
    {
      id: 3,
      type: 'flashcard' as const,
      title: 'Thermodynamic Equations Flashcards',
      content: '15 interactive flashcards covering key equations and their applications in thermodynamic problems...',
      subject: 'Physics',
      difficulty: 'medium' as const,
      generated: new Date('2024-01-15')
    }
  ];

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Here you would typically process the files and generate new content
  };

  const handleMarkLearned = (flashcardId: number) => {
    setFlashcards(prev => 
      prev.map(card => 
        card.id === flashcardId ? { ...card, learned: true } : card
      )
    );
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        streak={streak}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Section */}
        <UploadSection onFileUpload={handleFileUpload} />
        
        {/* Dashboard Analytics */}
        <Dashboard subjects={subjects} />
        
        {/* Generated Content Cards */}
        <GeneratedContent content={generatedContent} language={currentLanguage} />
        
        {/* Flashcard System */}
        <FlashcardSystem flashcards={flashcards} onMarkLearned={handleMarkLearned} />
        
        {/* AI Tutor Chat */}
        <AITutorChat />
        
        {/* Example Flow */}
        <ExampleFlow />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Powered by AI • Built with React, Node.js, OpenAI API, LangChain & Pinecone</p>
            <p className="text-sm">© 2024 StudyGenie - Personalized Learning for Everyone</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;