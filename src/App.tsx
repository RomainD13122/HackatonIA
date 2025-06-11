import React, { useState } from 'react';
import { Leaf, Calculator, Target, TrendingUp, Award, ChevronRight, History, BookOpen, Users, Lightbulb } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './components/HomePage';
import CarbonCalculator from './components/CarbonCalculator';
import Dashboard from './components/Dashboard';
import Challenges from './components/Challenges';
import HistoryTracker from './components/HistoryTracker';
import PersonalGoals from './components/PersonalGoals';
import EducationHub from './components/EducationHub';
import CommunityHub from './components/CommunityHub';
import ThemeToggle from './components/ThemeToggle';
import { CarbonData, Page } from './types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleCalculatorComplete = (data: CarbonData) => {
    setCarbonData(data);
    setCurrentPage('dashboard');
  };

  const navigationItems = [
    { id: 'home', name: 'Accueil', icon: Leaf, alwaysVisible: true },
    { id: 'calculator', name: 'Calculateur', icon: Calculator, alwaysVisible: true },
    { id: 'dashboard', name: 'Résultats', icon: TrendingUp, requiresData: true },
    { id: 'challenges', name: 'Défis', icon: Target, requiresData: true },
    { id: 'history', name: 'Historique', icon: History, alwaysVisible: true },
    { id: 'goals', name: 'Objectifs', icon: Lightbulb, alwaysVisible: true },
    { id: 'education', name: 'Éducation', icon: BookOpen, alwaysVisible: true },
    { id: 'community', name: 'Communauté', icon: Users, alwaysVisible: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 transition-colors duration-300">
      {/* Navigation Header */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-green-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoChallenge
              </h1>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isVisible = item.alwaysVisible || (item.requiresData && carbonData);
                  
                  if (!isVisible) return null;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id as Page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                        currentPage === item.id 
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                          : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Menu mobile */}
              <div className="lg:hidden">
                <select
                  value={currentPage}
                  onChange={(e) => navigateTo(e.target.value as Page)}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm transition-colors duration-300"
                >
                  {navigationItems.map((item) => {
                    const isVisible = item.alwaysVisible || (item.requiresData && carbonData);
                    if (!isVisible) return null;
                    
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'calculator' && <CarbonCalculator onComplete={handleCalculatorComplete} />}
        {currentPage === 'dashboard' && carbonData && <Dashboard data={carbonData} onNavigate={navigateTo} />}
        {currentPage === 'challenges' && carbonData && <Challenges data={carbonData} />}
        {currentPage === 'history' && <HistoryTracker currentData={carbonData} />}
        {currentPage === 'goals' && <PersonalGoals currentData={carbonData} />}
        {currentPage === 'education' && <EducationHub />}
        {currentPage === 'community' && <CommunityHub currentData={carbonData} />}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-green-100 dark:border-gray-700 mt-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoChallenge
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
              Chaque action quotidienne compte - transformons nos habitudes pour la planète 🌱
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 transition-colors duration-300">
              Créé avec ❤️ pour sensibiliser à l'écologie et encourager le changement positif
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;