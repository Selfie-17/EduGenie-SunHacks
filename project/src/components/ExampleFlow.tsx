import React, { useState } from 'react';
import { ChevronRight, Upload, Zap, BookOpen, Target, TrendingUp, CheckCircle } from 'lucide-react';

const ExampleFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Upload Physics Chapter",
      description: "Student uploads 'Thermodynamics Chapter 12' PDF",
      icon: <Upload className="w-6 h-6" />,
      color: "bg-blue-500",
      details: "AI processes the PDF using OCR and extracts key concepts, formulas, and definitions"
    },
    {
      title: "AI Content Generation", 
      description: "System generates personalized study materials",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-500",
      details: "Created: 15 flashcards, 10 MCQs, 1 comprehensive summary, and practice problems"
    },
    {
      title: "Study with Flashcards",
      description: "Interactive practice with generated flashcards",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-500", 
      details: "Student practices key concepts like heat transfer, entropy, and thermodynamic cycles"
    },
    {
      title: "Take Practice Quiz",
      description: "Attempt the AI-generated quiz questions",
      icon: <Target className="w-6 h-6" />,
      color: "bg-purple-500",
      details: "10 multiple choice questions covering all major topics from the chapter"
    },
    {
      title: "Review Results",
      description: "Get detailed feedback and explanations",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-red-500",
      details: "Score: 8/10 (80%) with detailed explanations for incorrect answers and study recommendations"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">See StudyGenie in Action</h2>
        <p className="text-gray-600">Follow along with this example study session to understand how our AI works</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
        <div 
          className="absolute left-8 top-16 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transition-all duration-1000"
          style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start space-x-6 mb-8">
            {/* Step Icon */}
            <div className={`relative z-10 w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white shadow-lg ${
              index <= currentStep ? 'scale-110' : 'scale-100'
            } transition-all duration-300`}>
              {index <= currentStep ? <CheckCircle className="w-6 h-6" /> : step.icon}
            </div>

            {/* Step Content */}
            <div className={`flex-1 bg-gray-50 rounded-lg p-6 ${
              index === currentStep ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            } transition-all duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                <span className="text-sm text-gray-500">Step {index + 1}</span>
              </div>
              <p className="text-gray-600 mb-3">{step.description}</p>
              <p className="text-sm text-gray-500">{step.details}</p>
              
              {index === currentStep && (
                <div className="mt-4 flex space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">Processing...</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>Next Step</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">15</div>
          <div className="text-sm text-blue-700">Flashcards Generated</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">10</div>
          <div className="text-sm text-green-700">Quiz Questions</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">80%</div>
          <div className="text-sm text-purple-700">Quiz Score</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">2m</div>
          <div className="text-sm text-orange-700">Processing Time</div>
        </div>
      </div>
    </div>
  );
};

export default ExampleFlow;