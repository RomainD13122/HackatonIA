import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Award, ArrowRight } from 'lucide-react';

interface CarbonData {
  transport: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
}

interface DashboardProps {
  data: CarbonData;
  onNavigate: (page: 'challenges') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onNavigate }) => {
  const frenchAverage = 4800; // kg CO2/an
  const worldAverage = 4500; // kg CO2/an
  const targetGoal = 2000; // kg CO2/an pour 1.5°C

  const categories = [
    { name: 'Transport', value: data.transport, color: 'blue', icon: '🚗' },
    { name: 'Énergie', value: data.energy, color: 'orange', icon: '🏠' },
    { name: 'Alimentation', value: data.food, color: 'green', icon: '🍽️' },
    { name: 'Consommation', value: data.consumption, color: 'purple', icon: '🛒' }
  ];

  const getPerformanceLevel = () => {
    if (data.total <= targetGoal) return { level: 'Excellent', color: 'green', message: 'Vous êtes déjà dans l\'objectif climatique !' };
    if (data.total <= frenchAverage * 0.7) return { level: 'Très bien', color: 'emerald', message: 'Votre impact est bien en-dessous de la moyenne' };
    if (data.total <= frenchAverage) return { level: 'Correct', color: 'yellow', message: 'Vous êtes dans la moyenne, des améliorations sont possibles' };
    return { level: 'À améliorer', color: 'red', message: 'Votre impact est élevé, des actions sont nécessaires' };
  };

  const performance = getPerformanceLevel();
  const maxValue = Math.max(data.total, frenchAverage, worldAverage);

  // Calcul des recommandations IA basées sur les données
  const getAIRecommendations = () => {
    const recommendations = [];
    
    if (data.transport > data.total * 0.4) {
      recommendations.push({
        category: 'Transport',
        suggestion: 'Privilégiez les transports en commun, le vélo ou la marche pour vos trajets courts',
        impact: '- 500 kg CO2/an',
        difficulty: 'Facile'
      });
    }
    
    if (data.energy > data.total * 0.35) {
      recommendations.push({
        category: 'Énergie',
        suggestion: 'Baissez la température de 1°C et isolez mieux votre logement',
        impact: '- 300 kg CO2/an',
        difficulty: 'Moyen'
      });
    }
    
    if (data.food > data.total * 0.3) {
      recommendations.push({
        category: 'Alimentation',
        suggestion: 'Réduisez la viande à 2-3 fois par semaine et privilégiez le local',
        impact: '- 400 kg CO2/an',
        difficulty: 'Facile'
      });
    }
    
    if (data.consumption > data.total * 0.2) {
      recommendations.push({
        category: 'Consommation',
        suggestion: 'Achetez moins, réparez plus et choisissez de la seconde main',
        impact: '- 200 kg CO2/an',
        difficulty: 'Facile'
      });
    }

    return recommendations.slice(0, 3); // Top 3 recommandations
  };

  const recommendations = getAIRecommendations();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header avec résultat principal */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Votre Empreinte Carbone</h1>
        <div className="inline-flex items-center justify-center">
          <div className="text-6xl font-bold text-gray-900 dark:text-white mr-2 transition-colors duration-300">{data.total.toLocaleString()}</div>
          <div className="text-2xl text-gray-600 dark:text-gray-300 transition-colors duration-300">kg CO₂/an</div>
        </div>
        <div className={`inline-flex items-center px-4 py-2 rounded-full mt-4 bg-${performance.color}-100 dark:bg-${performance.color}-900/50 text-${performance.color}-700 dark:text-${performance.color}-300 transition-colors duration-300`}>
          <span className="font-semibold">{performance.level}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto transition-colors duration-300">{performance.message}</p>
      </div>

      {/* Comparaisons */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 transition-colors duration-300">Comparaison avec les moyennes</h2>
        <div className="space-y-4">
          {/* Votre impact */}
          <div className="flex items-center space-x-4">
            <div className="w-32 text-right font-semibold text-gray-900 dark:text-white transition-colors duration-300">Votre impact</div>
            <div className="flex-1 relative">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 transition-colors duration-300">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${(data.total / maxValue) * 100}%` }}
                >
                  <span className="text-white font-semibold text-sm">{data.total} kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Moyenne française */}
          <div className="flex items-center space-x-4">
            <div className="w-32 text-right font-semibold text-gray-600 dark:text-gray-300 transition-colors duration-300">Moyenne 🇫🇷</div>
            <div className="flex-1 relative">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 transition-colors duration-300">
                <div 
                  className="bg-orange-400 h-6 rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${(frenchAverage / maxValue) * 100}%` }}
                >
                  <span className="text-white font-semibold text-xs">{frenchAverage} kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Objectif climatique */}
          <div className="flex items-center space-x-4">
            <div className="w-32 text-right font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">Objectif 1.5°C</div>
            <div className="flex-1 relative">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 transition-colors duration-300">
                <div 
                  className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${(targetGoal / maxValue) * 100}%` }}
                >
                  <span className="text-white font-semibold text-xs">{targetGoal} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Répartition par catégorie */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">Répartition de votre empreinte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{category.name}</h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{category.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 transition-colors duration-300">kg CO₂/an</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                  <div 
                    className={`bg-${category.color}-500 h-2 rounded-full`}
                    style={{ width: `${(category.value / data.total) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
                  {Math.round((category.value / data.total) * 100)}% du total
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations IA */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
          Recommandations personnalisées par IA
        </h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{rec.category}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.difficulty === 'Facile' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                      rec.difficulty === 'Moyen' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                    } transition-colors duration-300`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">{rec.suggestion}</p>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-semibold transition-colors duration-300">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    Impact potentiel: {rec.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à passer à l'action ?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Découvrez des défis personnalisés pour réduire votre empreinte carbone 
            et suivez vos progrès au quotidien.
          </p>
          <button
            onClick={() => onNavigate('challenges')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <Award className="w-5 h-5" />
            <span>Relever des défis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;