import React, { useState } from 'react';
import { Leaf, Calculator, Target, TrendingUp, Award, ChevronRight } from 'lucide-react';
import HomePage from './components/HomePage';
import CarbonCalculator from './components/CarbonCalculator';
import Dashboard from './components/Dashboard';
import Challenges from './components/Challenges';

type Page = 'home' | 'calculator' | 'dashboard' | 'challenges';

interface CarbonData {
  transport: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleCalculatorComplete = (data: CarbonData) => {
    setCarbonData(data);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'home' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => navigateTo('calculator')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                  currentPage === 'calculator' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Calculateur</span>
              </button>
              {carbonData && (
                <>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                      currentPage === 'dashboard' 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Résultats</span>
                  </button>
                  <button
                    onClick={() => navigateTo('challenges')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                      currentPage === 'challenges' 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Target className="w-4 h-4" />
                    <span>Défis</span>
                  </button>
                </>
              )}
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
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-green-100 mt-16">
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
            <p className="text-gray-600 text-sm">
              Chaque action quotidienne compte - transformons nos habitudes pour la planète 🌱
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Créé avec ❤️ pour sensibiliser à l'écologie et encourager le changement positif
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;