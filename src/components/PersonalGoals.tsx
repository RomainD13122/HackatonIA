import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Calendar, TrendingDown, Edit, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PersonalGoal, CarbonData } from '../types';

interface PersonalGoalsProps {
  currentData?: CarbonData;
}

const PersonalGoals: React.FC<PersonalGoalsProps> = ({ currentData }) => {
  const [goals, setGoals] = useLocalStorage<PersonalGoal[]>('ecochallenge-goals', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<PersonalGoal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'total' as PersonalGoal['category'],
    targetReduction: 0,
    targetDate: ''
  });

  const categories = [
    { id: 'total', name: 'Total', icon: '🎯', color: 'gray' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: 'blue' },
    { id: 'energy', name: 'Énergie', icon: '🏠', color: 'orange' },
    { id: 'food', name: 'Alimentation', icon: '🍽️', color: 'green' },
    { id: 'consumption', name: 'Consommation', icon: '🛒', color: 'purple' }
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'total',
      targetReduction: 0,
      targetDate: ''
    });
    setEditingGoal(null);
    setShowAddForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGoal) {
      // Modifier un objectif existant
      setGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData }
          : goal
      ));
    } else {
      // Créer un nouvel objectif
      const newGoal: PersonalGoal = {
        id: Date.now().toString(),
        ...formData,
        currentProgress: 0,
        createdAt: new Date().toISOString(),
        completed: false
      };
      setGoals(prev => [newGoal, ...prev]);
    }
    
    resetForm();
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed }
        : goal
    ));
  };

  const startEditing = (goal: PersonalGoal) => {
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetReduction: goal.targetReduction,
      targetDate: goal.targetDate
    });
    setEditingGoal(goal);
    setShowAddForm(true);
  };

  const calculateProgress = (goal: PersonalGoal) => {
    if (!currentData) return 0;
    
    const currentValue = goal.category === 'total' 
      ? currentData.total 
      : currentData[goal.category];
    
    // Simuler un progrès basé sur la réduction cible
    // Dans une vraie app, cela serait basé sur l'historique
    const progress = Math.min((goal.targetReduction / currentValue) * 100, 100);
    return Math.max(0, progress);
  };

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGoalsByStatus = () => {
    const active = goals.filter(goal => !goal.completed);
    const completed = goals.filter(goal => goal.completed);
    return { active, completed };
  };

  const { active, completed } = getGoalsByStatus();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Mes Objectifs Personnels
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Définissez et suivez vos objectifs de réduction d'empreinte carbone
        </p>
      </div>

      {/* Bouton d'ajout */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvel objectif</span>
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showAddForm && (
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            {editingGoal ? 'Modifier l\'objectif' : 'Nouvel objectif'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Titre de l'objectif
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Réduire mes trajets en voiture"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PersonalGoal['category'] })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez votre objectif et comment vous comptez l'atteindre"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Réduction cible (kg CO₂)
                </label>
                <input
                  type="number"
                  value={formData.targetReduction}
                  onChange={(e) => setFormData({ ...formData, targetReduction: parseInt(e.target.value) })}
                  placeholder="500"
                  min="1"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Date cible
                </label>
                <input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {editingGoal ? 'Modifier' : 'Créer l\'objectif'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Objectifs actifs */}
      {active.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Objectifs en cours ({active.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {active.map((goal) => {
              const category = categories.find(c => c.id === goal.category);
              const progress = calculateProgress(goal);
              const daysRemaining = getDaysRemaining(goal.targetDate);
              
              return (
                <div key={goal.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${category?.color}-100 dark:bg-${category?.color}-900/50 rounded-full flex items-center justify-center transition-colors duration-300`}>
                        <span className="text-lg">{category?.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          {category?.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditing(goal)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                    {goal.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Objectif</span>
                      <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">
                        -{goal.targetReduction} kg CO₂
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Échéance</span>
                      <span className={`font-semibold ${
                        daysRemaining < 30 
                          ? 'text-red-600 dark:text-red-400' 
                          : daysRemaining < 90 
                          ? 'text-yellow-600 dark:text-yellow-400' 
                          : 'text-gray-600 dark:text-gray-300'
                      } transition-colors duration-300`}>
                        {daysRemaining > 0 ? `${daysRemaining} jours` : 'Échéance dépassée'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Progrès</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => toggleGoalCompletion(goal.id)}
                      className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Marquer comme terminé</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Objectifs complétés */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Objectifs complétés ({completed.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completed.map((goal) => {
              const category = categories.find(c => c.id === goal.category);
              
              return (
                <div key={goal.id} className="bg-green-50/60 dark:bg-green-900/20 backdrop-blur-sm rounded-2xl border border-green-200 dark:border-green-700 p-6 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center transition-colors duration-300">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400 transition-colors duration-300">
                          Objectif atteint ! 🎉
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                    {goal.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Réduction cible</span>
                    <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">
                      -{goal.targetReduction} kg CO₂
                    </span>
                  </div>

                  <button
                    onClick={() => toggleGoalCompletion(goal.id)}
                    className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Marquer comme non terminé
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* État vide */}
      {goals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
            <Target className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Aucun objectif défini
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Créez votre premier objectif de réduction d'empreinte carbone pour commencer à suivre vos progrès.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
          >
            Créer mon premier objectif
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalGoals;