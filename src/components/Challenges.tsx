import React, { useState } from 'react';
import { Target, Award, CheckCircle, Calendar, Zap, Users, Leaf, TrendingUp } from 'lucide-react';

interface CarbonData {
  transport: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
}

interface ChallengesProps {
  data: CarbonData;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'food' | 'consumption';
  difficulty: 'facile' | 'moyen' | 'difficile';
  impact: string;
  duration: string;
  points: number;
  icon: string;
  completed: boolean;
}

const Challenges: React.FC<ChallengesProps> = ({ data }) => {
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Génération des défis basée sur les données utilisateur
  const generateChallenges = (): Challenge[] => {
    const challenges: Challenge[] = [];
    
    // Défis Transport
    if (data.transport > 1000) {
      challenges.push({
        id: 'transport-1',
        title: 'Semaine sans voiture',
        description: 'Utilisez uniquement les transports en commun, vélo ou marche pendant 7 jours',
        category: 'transport',
        difficulty: 'moyen',
        impact: '-25 kg CO₂',
        duration: '7 jours',
        points: 150,
        icon: '🚊',
        completed: false
      });
    }
    
    challenges.push({
      id: 'transport-2',
      title: 'Covoiturage quotidien',
      description: 'Organisez ou participez à du covoiturage pour vos trajets réguliers',
      category: 'transport',
      difficulty: 'facile',
      impact: '-15 kg CO₂',
      duration: '2 semaines',
      points: 100,
      icon: '🚗',
      completed: false
    });

    // Défis Énergie
    if (data.energy > 1200) {
      challenges.push({
        id: 'energy-1',
        title: 'Température -1°C',
        description: 'Réduisez la température de votre logement de 1°C pendant un mois',
        category: 'energy',
        difficulty: 'facile',
        impact: '-30 kg CO₂',
        duration: '30 jours',
        points: 120,
        icon: '🌡️',
        completed: false
      });
    }
    
    challenges.push({
      id: 'energy-2',
      title: 'Appareils en veille',
      description: 'Débranchez tous vos appareils en veille pendant 2 semaines',
      category: 'energy',
      difficulty: 'facile',
      impact: '-8 kg CO₂',
      duration: '14 jours',
      points: 80,
      icon: '🔌',
      completed: false
    });

    // Défis Alimentation
    if (data.food > 1500) {
      challenges.push({
        id: 'food-1',
        title: 'Lundi vert',
        description: 'Adoptez un régime végétarien tous les lundis pendant un mois',
        category: 'food',
        difficulty: 'facile',
        impact: '-20 kg CO₂',
        duration: '30 jours',
        points: 100,
        icon: '🥬',
        completed: false
      });
    }
    
    challenges.push({
      id: 'food-2',
      title: 'Local et de saison',
      description: 'Achetez uniquement des produits locaux et de saison pendant 2 semaines',
      category: 'food',
      difficulty: 'moyen',
      impact: '-12 kg CO₂',
      duration: '14 jours',
      points: 90,
      icon: '🛒',
      completed: false
    });

    // Défis Consommation
    challenges.push({
      id: 'consumption-1',
      title: 'Défi zéro achat',
      description: 'Ne faites aucun achat non-essentiel pendant 2 semaines',
      category: 'consumption',
      difficulty: 'difficile',
      impact: '-35 kg CO₂',
      duration: '14 jours',
      points: 200,
      icon: '🛍️',
      completed: false
    });
    
    challenges.push({
      id: 'consumption-2',
      title: 'Réparation avant remplacement',
      description: 'Réparez 3 objets cassés au lieu de les remplacer',
      category: 'consumption',
      difficulty: 'moyen',
      impact: '-18 kg CO₂',
      duration: '30 jours',
      points: 120,
      icon: '🔧',
      completed: false
    });

    return challenges;
  };

  const allChallenges = generateChallenges();
  const filteredChallenges = selectedCategory === 'all' 
    ? allChallenges 
    : allChallenges.filter(c => c.category === selectedCategory);

  const toggleChallenge = (challengeId: string) => {
    const newCompleted = new Set(completedChallenges);
    if (newCompleted.has(challengeId)) {
      newCompleted.delete(challengeId);
    } else {
      newCompleted.add(challengeId);
    }
    setCompletedChallenges(newCompleted);
  };

  const totalPoints = allChallenges
    .filter(c => completedChallenges.has(c.id))
    .reduce((sum, c) => sum + c.points, 0);

  const categories = [
    { id: 'all', name: 'Tous', icon: '🎯', color: 'gray' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: 'blue' },
    { id: 'energy', name: 'Énergie', icon: '🏠', color: 'orange' },
    { id: 'food', name: 'Alimentation', icon: '🍽️', color: 'green' },
    { id: 'consumption', name: 'Consommation', icon: '🛒', color: 'purple' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'green';
      case 'moyen': return 'yellow';
      case 'difficile': return 'red';
      default: return 'gray';
    }
  };

  const getLevel = (points: number) => {
    if (points >= 1000) return { name: 'Éco-Expert', icon: '🏆', color: 'yellow' };
    if (points >= 500) return { name: 'Éco-Warrior', icon: '🥉', color: 'amber' };
    if (points >= 200) return { name: 'Éco-Conscient', icon: '🌱', color: 'green' };
    return { name: 'Débutant', icon: '🌱', color: 'gray' };
  };

  const level = getLevel(totalPoints);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header avec progression */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Défis Écologiques</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
          Relevez des défis personnalisés pour réduire votre empreinte carbone
        </p>
        
        {/* Progression utilisateur */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 max-w-md mx-auto transition-colors duration-300">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="text-3xl">{level.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">{level.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">{totalPoints} points</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <Award className="w-4 h-4" />
            <span>{completedChallenges.size} défis complétés</span>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === category.id
                  ? `bg-${category.color}-100 dark:bg-${category.color}-900/50 text-${category.color}-700 dark:text-${category.color}-300 border-2 border-${category.color}-300 dark:border-${category.color}-600`
                  : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille des défis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredChallenges.map((challenge) => {
          const isCompleted = completedChallenges.has(challenge.id);
          const difficultyColor = getDifficultyColor(challenge.difficulty);
          
          return (
            <div
              key={challenge.id}
              className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 p-6 transition-all hover:shadow-lg cursor-pointer ${
                isCompleted 
                  ? 'border-green-300 dark:border-green-600 bg-green-50/60 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600'
              }`}
              onClick={() => toggleChallenge(challenge.id)}
            >
              {/* Header du défi */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div>
                    <h3 className={`font-bold text-lg transition-colors duration-300 ${isCompleted ? 'text-green-800 dark:text-green-300' : 'text-gray-900 dark:text-white'}`}>
                      {challenge.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${difficultyColor}-100 dark:bg-${difficultyColor}-900/50 text-${difficultyColor}-700 dark:text-${difficultyColor}-300 transition-colors duration-300`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center transition-colors duration-300">
                        <Calendar className="w-3 h-3 mr-1" />
                        {challenge.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full transition-colors duration-300" />
                )}
              </div>

              {/* Description */}
              <p className={`text-sm mb-4 transition-colors duration-300 ${isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-300'}`}>
                {challenge.description}
              </p>

              {/* Impact et points */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm font-medium text-green-600 dark:text-green-400 transition-colors duration-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>{challenge.impact}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-300">
                  <Zap className="w-4 h-4" />
                  <span>{challenge.points} pts</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section conseils IA */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Conseils IA Personnalisés</h2>
        <div className="max-w-4xl mx-auto space-y-4 text-left">
          {data.transport > 1200 && (
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-green-100">
                <strong>Transport:</strong> Votre empreinte transport est élevée ({data.transport} kg CO₂/an). 
                Considérez le télétravail, les transports en commun ou un véhicule électrique pour réduire significativement votre impact.
              </p>
            </div>
          )}
          
          {data.food > 1800 && (
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-green-100">
                <strong>Alimentation:</strong> Réduire la consommation de viande rouge de 50% pourrait diminuer 
                votre empreinte alimentaire de 200-300 kg CO₂/an. Privilégiez les protéines végétales et les produits locaux.
              </p>
            </div>
          )}
          
          {data.energy > 1000 && (
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-green-100">
                <strong>Énergie:</strong> L'isolation de votre logement et le passage aux énergies renouvelables 
                pourraient réduire votre empreinte énergétique de 20-30%. Commencez par les gestes simples comme éteindre les appareils.
              </p>
            </div>
          )}
        </div>
        
        <p className="text-green-100 mt-8">
          Chaque défi complété vous rapproche de l'objectif climatique de 2 tonnes CO₂/an. 
          Ensemble, nous pouvons faire la différence ! 🌱
        </p>
      </div>
    </div>
  );
};

export default Challenges;