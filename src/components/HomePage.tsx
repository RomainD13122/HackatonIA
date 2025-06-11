import React from 'react';
import { Calculator, Target, TrendingUp, Award, Leaf, ArrowRight, Users, Globe, Zap } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'calculator' | 'dashboard' | 'challenges') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-8 shadow-lg">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Chaque action quotidienne{' '}
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            compte
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Découvrez votre impact carbone personnel, obtenez des conseils personnalisés par IA, 
          et transformez vos habitudes pour un avenir plus durable.
        </p>
        
        <button
          onClick={() => onNavigate('calculator')}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
        >
          <Calculator className="w-5 h-5" />
          <span>Calculer mon impact</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Statistics Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8 tonnes</h3>
            <p className="text-gray-600">Empreinte carbone moyenne française par an</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">2 tonnes</h3>
            <p className="text-gray-600">Objectif pour limiter le réchauffement à 1.5°C</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">30%</h3>
            <p className="text-gray-600">Réduction possible avec des gestes simples</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi utiliser EcoChallenge ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all hover:border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Calcul Précis</h3>
            <p className="text-gray-600">
              Évaluez votre empreinte carbone avec notre calculateur intelligent qui prend en compte 
              transport, énergie, alimentation et consommation.
            </p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all hover:border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Visualisation Impact</h3>
            <p className="text-gray-600">
              Comprenez votre impact avec des graphiques clairs et des comparaisons 
              avec les moyennes nationales et mondiales.
            </p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all hover:border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Défis Personnalisés</h3>
            <p className="text-gray-600">
              Recevez des défis écologiques adaptés à votre profil et à vos habitudes 
              pour un changement progressif et durable.
            </p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all hover:border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Gamification</h3>
            <p className="text-gray-600">
              Suivez vos progrès, débloquez des achievements et restez motivé 
              dans votre démarche écologique quotidienne.
            </p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all hover:border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-xl mb-4">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Conseils IA</h3>
            <p className="text-gray-600">
              Obtenez des recommandations personnalisées basées sur l'intelligence artificielle 
              pour optimiser votre impact environnemental.
            </p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all hover:border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
              <Leaf className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sans Inscription</h3>
            <p className="text-gray-600">
              Aucun compte requis, interface responsive, accessible à tous. 
              Commencez votre démarche écologique en quelques clics.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à découvrir votre impact ?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de personnes qui transforment déjà leurs habitudes 
            pour un avenir plus durable. Chaque geste compte, commencez dès maintenant !
          </p>
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <Calculator className="w-5 h-5" />
            <span>Commencer maintenant</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;