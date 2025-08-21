import React, { useState } from 'react';
import { Upload, FileText, Image, BookOpen, Zap } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (files: File[]) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setIsProcessing(true);
    setTimeout(() => {
      onFileUpload(files);
      setIsProcessing(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Study Materials</h2>
        <p className="text-gray-600">Drag & drop your PDFs, notes, or images. Our AI will extract and analyze the content!</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.txt"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-blue-600 font-semibold">Processing your files with AI...</p>
          </div>
        ) : (
          <>
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Choose files or drag them here
            </h3>
            <p className="text-gray-500 mb-6">
              Supports PDF, Images (JPG, PNG), and Text files
            </p>
            
            <div className="flex justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <FileText className="w-5 h-5 text-red-500" />
                <span>PDFs</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Image className="w-5 h-5 text-green-500" />
                <span>Images</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>Notes</span>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Select Files</span>
              </div>
            </button>
          </>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <div className="flex items-center space-x-3 text-blue-700">
          <Zap className="w-5 h-5" />
          <span className="font-semibold">AI Features:</span>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-gray-700">✨ OCR Text Extraction</div>
          <div className="text-gray-700">📝 Auto Summary Generation</div>
          <div className="text-gray-700">❓ Quiz & Flashcard Creation</div>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;