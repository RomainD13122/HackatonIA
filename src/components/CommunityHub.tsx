import React, { useState } from 'react';
import { Users, Trophy, Target, Calendar, Crown, Medal, Award, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CommunityUser, GroupChallenge, CarbonData } from '../types';

interface CommunityHubProps {
  currentData?: CarbonData;
}

const CommunityHub: React.FC<CommunityHubProps> = ({ currentData }) => {
  const [userProfile, setUserProfile] = useLocalStorage<CommunityUser | null>('ecochallenge-profile', null);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'challenges' | 'profile'>('leaderboard');

  // Données simulées pour la démo
  const mockLeaderboard: CommunityUser[] = [
    { id: '1', username: 'EcoWarrior2024', level: 'Éco-Expert', totalPoints: 2450, carbonReduction: 1200, joinedAt: '2024-01-15', isAnonymous: false },
    { id: '2', username: 'GreenMaster', level: 'Éco-Expert', totalPoints: 2380, carbonReduction: 1150, joinedAt: '2024-02-01', isAnonymous: false },
    { id: '3', username: 'ClimatHero', level: 'Éco-Warrior', totalPoints: 1950, carbonReduction: 980, joinedAt: '2024-01-20', isAnonymous: false },
    { id: '4', username: 'Utilisateur Anonyme', level: 'Éco-Warrior', totalPoints: 1820, carbonReduction: 890, joinedAt: '2024-02-10', isAnonymous: true },
    { id: '5', username: 'PlanetSaver', level: 'Éco-Conscient', totalPoints: 1650, carbonReduction: 750, joinedAt: '2024-02-15', isAnonymous: false },
    { id: '6', username: 'Vous', level: 'Éco-Conscient', totalPoints: 1420, carbonReduction: 650, joinedAt: '2024-03-01', isAnonymous: false }
  ];

  const mockGroupChallenges: GroupChallenge[] = [
    {
      id: '1',
      title: 'Défi Transport Collectif',
      description: 'Réduisons ensemble nos émissions de transport de 10 tonnes de CO₂ ce mois-ci',
      category: 'transport',
      targetParticipants: 50,
      currentParticipants: 32,
      targetReduction: 10000,
      currentReduction: 6800,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      participants: mockLeaderboard.slice(0, 5),
      completed: false
    },
    {
      id: '2',
      title: 'Semaine Végétarienne',
      description: 'Adoptons un régime végétarien pendant une semaine complète',
      category: 'food',
      targetParticipants: 30,
      currentParticipants: 28,
      targetReduction: 2100,
      currentReduction: 1950,
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      participants: mockLeaderboard.slice(0, 4),
      completed: false
    },
    {
      id: '3',
      title: 'Économie d\'Énergie',
      description: 'Réduisons notre consommation énergétique de 20% pendant un mois',
      category: 'energy',
      targetParticipants: 40,
      currentParticipants: 35,
      targetReduction: 8000,
      currentReduction: 7200,
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      participants: mockLeaderboard.slice(0, 6),
      completed: true
    }
  ];

  const createProfile = (username: string, isAnonymous: boolean) => {
    const newProfile: CommunityUser = {
      id: Date.now().toString(),
      username: isAnonymous ? 'Utilisateur Anonyme' : username,
      level: 'Débutant',
      totalPoints: 0,
      carbonReduction: 0,
      joinedAt: new Date().toISOString(),
      isAnonymous
    };
    setUserProfile(newProfile);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Éco-Expert': return 'yellow';
      case 'Éco-Warrior': return 'green';
      case 'Éco-Conscient': return 'blue';
      default: return 'gray';
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Users className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Rejoignez la Communauté EcoChallenge
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-300">
            Connectez-vous avec d'autres éco-citoyens, participez à des défis collectifs et suivez vos progrès sur le classement communautaire.
          </p>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-8 max-w-md mx-auto transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Créer votre profil
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => createProfile('', false)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                Rejoindre avec un pseudo
              </button>
              
              <button
                onClick={() => createProfile('', true)}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Rejoindre anonymement
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
              Vos données restent privées. Seuls vos progrès écologiques sont partagés.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Communauté EcoChallenge
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Ensemble, nous pouvons faire la différence pour la planète
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 border border-green-100 dark:border-gray-700 transition-colors duration-300">
          {[
            { id: 'leaderboard', name: 'Classement', icon: Trophy },
            { id: 'challenges', name: 'Défis Collectifs', icon: Target },
            { id: 'profile', name: 'Mon Profil', icon: Users }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'leaderboard' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
            Classement Communautaire
          </h2>
          
          <div className="space-y-4">
            {mockLeaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border p-6 transition-all duration-300 ${
                  user.username === 'Vous' 
                    ? 'border-green-300 dark:border-green-600 bg-green-50/60 dark:bg-green-900/20' 
                    : 'border-green-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                        {user.username}
                        {user.username === 'Vous' && ' 🎯'}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getLevelColor(user.level)}-100 dark:bg-${getLevelColor(user.level)}-900/50 text-${getLevelColor(user.level)}-700 dark:text-${getLevelColor(user.level)}-300 transition-colors duration-300`}>
                          {user.level}
                        </span>
                        {user.isAnonymous && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs transition-colors duration-300">
                            Anonyme
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      {user.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">points</div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
                      -{user.carbonReduction} kg CO₂
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
            Défis Collectifs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockGroupChallenges.map((challenge) => {
              const daysRemaining = getDaysRemaining(challenge.endDate);
              const participationProgress = (challenge.currentParticipants / challenge.targetParticipants) * 100;
              const reductionProgress = (challenge.currentReduction / challenge.targetReduction) * 100;
              
              return (
                <div
                  key={challenge.id}
                  className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border p-6 transition-colors duration-300 ${
                    challenge.completed 
                      ? 'border-green-300 dark:border-green-600 bg-green-50/60 dark:bg-green-900/20' 
                      : 'border-green-100 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                        {challenge.title}
                        {challenge.completed && ' ✅'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                        {challenge.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      {challenge.completed ? (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium transition-colors duration-300">
                          Terminé
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium transition-colors duration-300">
                          {daysRemaining} jours restants
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Progression des participants */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Participants</span>
                        <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                          {challenge.currentParticipants}/{challenge.targetParticipants}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(participationProgress, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Progression de la réduction */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Réduction CO₂</span>
                        <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-300">
                          {challenge.currentReduction}/{challenge.targetReduction} kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(reductionProgress, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Participants */}
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
                        Top participants :
                      </div>
                      <div className="flex -space-x-2">
                        {challenge.participants.slice(0, 5).map((participant, index) => (
                          <div
                            key={participant.id}
                            className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800 transition-colors duration-300"
                            title={participant.username}
                          >
                            {participant.username.charAt(0).toUpperCase()}
                          </div>
                        ))}
                        {challenge.participants.length > 5 && (
                          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs font-bold border-2 border-white dark:border-gray-800 transition-colors duration-300">
                            +{challenge.participants.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    {!challenge.completed && (
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Rejoindre le défi
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
            Mon Profil Communautaire
          </h2>
          
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-8 transition-colors duration-300">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {userProfile.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {userProfile.username}
              </h3>
              
              <span className={`px-4 py-2 rounded-full text-sm font-medium bg-${getLevelColor(userProfile.level)}-100 dark:bg-${getLevelColor(userProfile.level)}-900/50 text-${getLevelColor(userProfile.level)}-700 dark:text-${getLevelColor(userProfile.level)}-300 transition-colors duration-300`}>
                {userProfile.level}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  {userProfile.totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Points totaux</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1 transition-colors duration-300">
                  {userProfile.carbonReduction}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">kg CO₂ évités</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 transition-colors duration-300">
                  6
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Classement</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Membre depuis</span>
                <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  {new Date(userProfile.joinedAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Défis complétés</span>
                <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">12</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Profil</span>
                <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  {userProfile.isAnonymous ? 'Anonyme' : 'Public'}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Prochains objectifs
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Atteindre Éco-Warrior</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">
                    {Math.max(0, 1500 - userProfile.totalPoints)} points restants
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userProfile.totalPoints / 1500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;