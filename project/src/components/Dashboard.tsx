import React from 'react';
import { BarChart3, TrendingUp, Award, Target, Clock, BookOpen } from 'lucide-react';

interface Subject {
  name: string;
  progress: number;
  color: string;
  performance: 'strong' | 'moderate' | 'weak';
}

interface DashboardProps {
  subjects: Subject[];
}

const Dashboard: React.FC<DashboardProps> = ({ subjects }) => {
  const overall_progress = Math.round(subjects.reduce((acc, subj) => acc + subj.progress, 0) / subjects.length);
  const strong_subjects = subjects.filter(s => s.performance === 'strong').length;
  const total_study_time = 42; // hours this week
  const quiz_accuracy = 87; // percentage

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Stats Cards */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-800">{overall_progress}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Strong Subjects</p>
              <p className="text-2xl font-bold text-gray-800">{strong_subjects}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Study Hours</p>
              <p className="text-2xl font-bold text-gray-800">{total_study_time}h</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Quiz Accuracy</p>
              <p className="text-2xl font-bold text-gray-800">{quiz_accuracy}%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Heatmap */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Knowledge Heatmap</span>
        </h3>
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{subject.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${subject.color}`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{subject.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Progress Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{subject.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                subject.performance === 'strong' ? 'bg-green-100 text-green-700' :
                subject.performance === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {subject.performance}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{subject.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${subject.color}`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>12 topics</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>8 completed</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;