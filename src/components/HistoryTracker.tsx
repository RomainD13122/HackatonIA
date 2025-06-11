import React, { useState } from 'react';
import { Calendar, TrendingDown, TrendingUp, Plus, BarChart3, LineChart, Save } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HistoricalEntry, CarbonData } from '../types';

interface HistoryTrackerProps {
  currentData?: CarbonData;
}

const HistoryTracker: React.FC<HistoryTrackerProps> = ({ currentData }) => {
  const [history, setHistory] = useLocalStorage<HistoricalEntry[]>('ecochallenge-history', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'3m' | '6m' | '1y' | 'all'>('6m');

  const addCurrentData = () => {
    if (!currentData) return;

    const newEntry: HistoricalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      data: { ...currentData, date: new Date().toISOString().split('T')[0] },
      notes: notes.trim() || undefined
    };

    setHistory(prev => [newEntry, ...prev]);
    setNotes('');
    setShowAddForm(false);
  };

  const getFilteredHistory = () => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (selectedPeriod) {
      case '3m':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return history;
    }

    return history.filter(entry => new Date(entry.date) >= cutoffDate);
  };

  const filteredHistory = getFilteredHistory();

  const calculateTrend = () => {
    if (filteredHistory.length < 2) return null;
    
    const latest = filteredHistory[0].data.total;
    const oldest = filteredHistory[filteredHistory.length - 1].data.total;
    const change = latest - oldest;
    const percentChange = (change / oldest) * 100;
    
    return { change, percentChange, isImprovement: change < 0 };
  };

  const trend = calculateTrend();

  const getAverageByCategory = () => {
    if (filteredHistory.length === 0) return null;
    
    const totals = filteredHistory.reduce(
      (acc, entry) => ({
        transport: acc.transport + entry.data.transport,
        energy: acc.energy + entry.data.energy,
        food: acc.food + entry.data.food,
        consumption: acc.consumption + entry.data.consumption,
        total: acc.total + entry.data.total
      }),
      { transport: 0, energy: 0, food: 0, consumption: 0, total: 0 }
    );

    const count = filteredHistory.length;
    return {
      transport: Math.round(totals.transport / count),
      energy: Math.round(totals.energy / count),
      food: Math.round(totals.food / count),
      consumption: Math.round(totals.consumption / count),
      total: Math.round(totals.total / count)
    };
  };

  const averages = getAverageByCategory();

  const categories = [
    { name: 'Transport', key: 'transport' as const, color: 'blue', icon: '🚗' },
    { name: 'Énergie', key: 'energy' as const, color: 'orange', icon: '🏠' },
    { name: 'Alimentation', key: 'food' as const, color: 'green', icon: '🍽️' },
    { name: 'Consommation', key: 'consumption' as const, color: 'purple', icon: '🛒' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Historique de votre empreinte carbone
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Suivez l'évolution de votre impact environnemental dans le temps
        </p>
      </div>

      {/* Actions et filtres */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Période :
          </span>
          {(['3m', '6m', '1y', 'all'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {period === '3m' ? '3 mois' : period === '6m' ? '6 mois' : period === '1y' ? '1 an' : 'Tout'}
            </button>
          ))}
        </div>

        {currentData && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Sauvegarder calcul actuel</span>
          </button>
        )}
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && currentData && (
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Sauvegarder votre calcul actuel
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Notes (optionnel)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez des notes sur ce calcul (changements récents, objectifs, etc.)"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={addCurrentData}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
            <BarChart3 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Aucun historique disponible
          </h3>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Commencez par calculer votre empreinte carbone et sauvegardez vos résultats pour suivre vos progrès.
          </p>
        </div>
      ) : (
        <>
          {/* Statistiques de tendance */}
          {trend && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    trend.isImprovement 
                      ? 'bg-green-100 dark:bg-green-900/50' 
                      : 'bg-red-100 dark:bg-red-900/50'
                  } transition-colors duration-300`}>
                    {trend.isImprovement ? (
                      <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Évolution
                    </h3>
                    <p className={`text-sm font-medium ${
                      trend.isImprovement 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    } transition-colors duration-300`}>
                      {trend.isImprovement ? '-' : '+'}{Math.abs(Math.round(trend.change))} kg CO₂
                      ({trend.isImprovement ? '' : '+'}{Math.round(trend.percentChange)}%)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center transition-colors duration-300">
                    <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Moyenne
                    </h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-300">
                      {averages?.total} kg CO₂/an
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Mesures
                    </h3>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400 transition-colors duration-300">
                      {filteredHistory.length} calculs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Moyennes par catégorie */}
          {averages && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Moyennes par catégorie
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div key={category.key} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="text-center">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                        {averages[category.key]}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        kg CO₂/an (moyenne)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historique détaillé */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Historique détaillé
            </h2>
            <div className="space-y-4">
              {filteredHistory.map((entry) => (
                <div key={entry.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center transition-colors duration-300">
                        <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                          {new Date(entry.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {entry.data.total}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          kg CO₂/an
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">
                            {entry.data.transport}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Transport</div>
                        </div>
                        <div className="text-center">
                          <div className="text-orange-600 dark:text-orange-400 font-semibold transition-colors duration-300">
                            {entry.data.energy}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Énergie</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-600 dark:text-green-400 font-semibold transition-colors duration-300">
                            {entry.data.food}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Aliment.</div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-600 dark:text-purple-400 font-semibold transition-colors duration-300">
                            {entry.data.consumption}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Consom.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryTracker;