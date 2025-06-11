import React, { useState } from 'react';
import { BookOpen, Clock, User, Filter, Search, ExternalLink } from 'lucide-react';
import { educationalContent } from '../data/educationalContent';
import { EducationalContent } from '../types';

const EducationHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null);

  const categories = [
    { id: 'all', name: 'Tous', icon: '📚', color: 'gray' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: 'blue' },
    { id: 'energy', name: 'Énergie', icon: '🏠', color: 'orange' },
    { id: 'food', name: 'Alimentation', icon: '🍽️', color: 'green' },
    { id: 'consumption', name: 'Consommation', icon: '🛒', color: 'purple' },
    { id: 'general', name: 'Général', icon: '🌍', color: 'teal' }
  ];

  const types = [
    { id: 'all', name: 'Tous les types' },
    { id: 'article', name: 'Articles' },
    { id: 'video', name: 'Vidéos' },
    { id: 'infographic', name: 'Infographies' },
    { id: 'tip', name: 'Conseils' }
  ];

  const difficulties = [
    { id: 'all', name: 'Tous niveaux' },
    { id: 'débutant', name: 'Débutant' },
    { id: 'intermédiaire', name: 'Intermédiaire' },
    { id: 'avancé', name: 'Avancé' }
  ];

  const filteredContent = educationalContent.filter(content => {
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || content.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' || 
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesType && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'débutant': return 'green';
      case 'intermédiaire': return 'yellow';
      case 'avancé': return 'red';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'video': return '🎥';
      case 'infographic': return '📊';
      case 'tip': return '💡';
      default: return '📚';
    }
  };

  if (selectedContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de l'article */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedContent(null)}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium mb-4 transition-colors duration-300"
          >
            ← Retour au hub éducatif
          </button>
          
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-8 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{getTypeIcon(selectedContent.type)}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  {selectedContent.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {selectedContent.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <Clock className="w-4 h-4" />
                <span>{selectedContent.readTime} min de lecture</span>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getDifficultyColor(selectedContent.difficulty)}-100 dark:bg-${getDifficultyColor(selectedContent.difficulty)}-900/50 text-${getDifficultyColor(selectedContent.difficulty)}-700 dark:text-${getDifficultyColor(selectedContent.difficulty)}-300 transition-colors duration-300`}>
                {selectedContent.difficulty}
              </span>

              <div className="flex flex-wrap gap-2">
                {selectedContent.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs transition-colors duration-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {selectedContent.imageUrl && (
              <img 
                src={selectedContent.imageUrl} 
                alt={selectedContent.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            )}
          </div>
        </div>

        {/* Contenu de l'article */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-8 transition-colors duration-300">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert transition-colors duration-300"
            dangerouslySetInnerHTML={{ 
              __html: selectedContent.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h3 class="text-xl font-bold mt-6 mb-4">').replace(/<h3[^>]*>/g, '<h3 class="text-xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">') 
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Hub Éducatif
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Approfondissez vos connaissances sur l'écologie et le développement durable
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un contenu..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-8 space-y-4">
        {/* Catégories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
            Catégories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? `bg-${category.color}-100 dark:bg-${category.color}-900/50 text-${category.color}-700 dark:text-${category.color}-300`
                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Types et Difficultés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
              Type de contenu
            </h3>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
              Niveau de difficulté
            </h3>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {filteredContent.length} contenu{filteredContent.length > 1 ? 's' : ''} trouvé{filteredContent.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille de contenu */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => {
            const category = categories.find(c => c.id === content.category);
            
            return (
              <div
                key={content.id}
                onClick={() => setSelectedContent(content)}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-gray-700 p-6 hover:shadow-lg cursor-pointer transition-all duration-300 hover:border-green-200 dark:hover:border-green-600"
              >
                {content.imageUrl && (
                  <img 
                    src={content.imageUrl} 
                    alt={content.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">{getTypeIcon(content.type)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${category?.color}-100 dark:bg-${category?.color}-900/50 text-${category?.color}-700 dark:text-${category?.color}-300 transition-colors duration-300`}>
                    {category?.name}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getDifficultyColor(content.difficulty)}-100 dark:bg-${getDifficultyColor(content.difficulty)}-900/50 text-${getDifficultyColor(content.difficulty)}-700 dark:text-${getDifficultyColor(content.difficulty)}-300 transition-colors duration-300`}>
                    {content.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {content.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 transition-colors duration-300">
                  {content.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    <Clock className="w-4 h-4" />
                    <span>{content.readTime} min</span>
                  </div>
                  
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium transition-colors duration-300">
                    <span>Lire</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {content.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs transition-colors duration-300">
                      #{tag}
                    </span>
                  ))}
                  {content.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs transition-colors duration-300">
                      +{content.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
            <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Aucun contenu trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationHub;