import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, RotateCcw, Star } from 'lucide-react';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  learned: boolean;
}

interface FlashcardSystemProps {
  flashcards: Flashcard[];
  onMarkLearned: (id: number) => void;
}

const FlashcardSystem: React.FC<FlashcardSystemProps> = ({ flashcards, onMarkLearned }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => setShowAnswer(!showAnswer), 150);
  };

  const handleMarkLearned = () => {
    onMarkLearned(flashcards[currentCard].id);
    nextCard();
  };

  if (flashcards.length === 0) return null;

  const card = flashcards[currentCard];
  const learned_count = flashcards.filter(card => card.learned).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flashcard Practice</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{learned_count}</span> of <span className="font-semibold">{flashcards.length}</span> learned
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${(learned_count / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <div 
            className={`relative w-full h-80 cursor-pointer transition-transform duration-300 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className={`w-full h-full rounded-xl shadow-lg border-2 flex flex-col items-center justify-center p-6 text-center ${
                card.difficulty === 'easy' ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100' :
                card.difficulty === 'medium' ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100' :
                'border-red-200 bg-gradient-to-br from-red-50 to-red-100'
              }`}>
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    card.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                    card.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {card.subject}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Question</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{card.question}</p>
                <div className="mt-6 text-sm text-gray-500">
                  Click to reveal answer
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className={`w-full h-full rounded-xl shadow-lg border-2 flex flex-col items-center justify-center p-6 text-center ${
                card.difficulty === 'easy' ? 'border-green-200 bg-gradient-to-br from-green-100 to-green-200' :
                card.difficulty === 'medium' ? 'border-yellow-200 bg-gradient-to-br from-yellow-100 to-yellow-200' :
                'border-red-200 bg-gradient-to-br from-red-100 to-red-200'
              }`}>
                <div className="mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Answer</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{card.answer}</p>
                {card.learned && (
                  <div className="mt-4 flex items-center text-green-600">
                    <Check className="w-4 h-4 mr-1" />
                    <span className="text-sm">Learned</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevCard}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          disabled={currentCard === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {currentCard + 1} of {flashcards.length}
          </span>
          <button
            onClick={() => { setIsFlipped(false); setShowAnswer(false); }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Reset card"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={nextCard}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          disabled={currentCard === flashcards.length - 1}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Action Buttons */}
      {showAnswer && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={nextCard}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Need More Practice</span>
          </button>
          <button
            onClick={handleMarkLearned}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Mark as Learned</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardSystem;