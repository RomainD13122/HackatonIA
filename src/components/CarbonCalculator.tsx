import React, { useState } from 'react';
import { Car, Home, Utensils, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface CarbonData {
  transport: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
}

interface CarbonCalculatorProps {
  onComplete: (data: CarbonData) => void;
}

const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    // Transport
    carKm: 0,
    carType: 'essence',
    publicTransport: 0,
    flights: 0,
    
    // Énergie
    homeSize: 100,
    heating: 'gaz',
    electricity: 100,
    
    // Alimentation  
    meatFreq: 3,
    localFood: 50,
    foodWaste: 20,
    
    // Consommation
    clothing: 500,
    electronics: 200,
    recycling: 70
  });

  const steps = [
    {
      title: 'Transport',
      icon: Car,
      color: 'blue',
      questions: [
        {
          key: 'carKm',
          label: 'Kilomètres en voiture par semaine',
          type: 'range',
          min: 0,
          max: 1000,
          step: 10,
          unit: 'km'
        },
        {
          key: 'carType',
          label: 'Type de véhicule',
          type: 'select',
          options: [
            { value: 'essence', label: 'Essence' },
            { value: 'diesel', label: 'Diesel' },
            { value: 'hybrid', label: 'Hybride' },
            { value: 'electric', label: 'Électrique' }
          ]
        },
        {
          key: 'publicTransport',
          label: 'Heures de transport en commun par semaine',
          type: 'range',
          min: 0,
          max: 40,
          step: 1,
          unit: 'h'
        },
        {
          key: 'flights',
          label: 'Vols en avion par an',
          type: 'range',
          min: 0,
          max: 20,
          step: 1,
          unit: 'vols'
        }
      ]
    },
    {
      title: 'Énergie domestique',
      icon: Home,
      color: 'orange',
      questions: [
        {
          key: 'homeSize',
          label: 'Surface de logement',
          type: 'range',
          min: 20,
          max: 300,
          step: 10,
          unit: 'm²'
        },
        {
          key: 'heating',
          label: 'Type de chauffage',
          type: 'select',
          options: [
            { value: 'gaz', label: 'Gaz naturel' },
            { value: 'electricite', label: 'Électricité' },
            { value: 'fioul', label: 'Fioul' },
            { value: 'bois', label: 'Bois' },
            { value: 'pompe', label: 'Pompe à chaleur' }
          ]
        },
        {
          key: 'electricity',
          label: 'Consommation électrique mensuelle',
          type: 'range',
          min: 50,
          max: 500,
          step: 10,
          unit: 'kWh'
        }
      ]
    },
    {
      title: 'Alimentation',
      icon: Utensils,
      color: 'green',
      questions: [
        {
          key: 'meatFreq',
          label: 'Repas avec viande par semaine',
          type: 'range',
          min: 0,
          max: 14,
          step: 1,
          unit: 'repas'
        },
        {
          key: 'localFood',
          label: 'Pourcentage de produits locaux/bio',
          type: 'range',
          min: 0,
          max: 100,
          step: 5,
          unit: '%'
        },
        {
          key: 'foodWaste',
          label: 'Gaspillage alimentaire estimé',
          type: 'range',
          min: 0,
          max: 50,
          step: 5,
          unit: '%'
        }
      ]
    },
    {
      title: 'Consommation',
      icon: ShoppingBag,
      color: 'purple',
      questions: [
        {
          key: 'clothing',
          label: 'Budget vêtements par an',
          type: 'range',
          min: 0,
          max: 2000,
          step: 50,
          unit: '€'
        },
        {
          key: 'electronics',
          label: 'Budget électronique par an',
          type: 'range',
          min: 0,
          max: 1000,
          step: 25,
          unit: '€'
        },
        {
          key: 'recycling',
          label: 'Taux de recyclage estimé',
          type: 'range',
          min: 0,
          max: 100,
          step: 10,
          unit: '%'
        }
      ]
    }
  ];

  const calculateCarbon = () => {
    // Facteurs d'émission simplifiés (kg CO2/unité)
    const carEmissions = {
      essence: 0.21, // kg CO2/km
      diesel: 0.19,
      hybrid: 0.12,
      electric: 0.05
    };

    const heatingEmissions = {
      gaz: 0.234, // kg CO2/kWh
      electricite: 0.057,
      fioul: 0.324,
      bois: 0.013,
      pompe: 0.057
    };

    // Transport (kg CO2/an)
    const transport = 
      (answers.carKm * 52 * carEmissions[answers.carType as keyof typeof carEmissions]) +
      (answers.publicTransport * 52 * 0.1) + // transport en commun
      (answers.flights * 500); // vol moyen 500kg CO2

    // Énergie (kg CO2/an)
    const energyHeating = answers.homeSize * 100 * heatingEmissions[answers.heating as keyof typeof heatingEmissions] / 1000;
    const energyElec = answers.electricity * 12 * 0.057;
    const energy = energyHeating + energyElec;

    // Alimentation (kg CO2/an)
    const meatImpact = answers.meatFreq * 52 * 3.3; // 3.3 kg CO2 par repas avec viande
    const localReduction = (answers.localFood / 100) * 200; // réduction locale
    const wasteIncrease = (answers.foodWaste / 100) * 300; // augmentation gaspillage
    const food = Math.max(0, 1500 + meatImpact - localReduction + wasteIncrease);

    // Consommation (kg CO2/an)
    const clothingImpact = answers.clothing * 0.02; // 0.02 kg CO2/€
    const electronicsImpact = answers.electronics * 0.05; // 0.05 kg CO2/€
    const recyclingReduction = (answers.recycling / 100) * 100; // réduction recyclage
    const consumption = Math.max(0, clothingImpact + electronicsImpact - recyclingReduction);

    const total = transport + energy + food + consumption;

    return {
      transport: Math.round(transport),
      energy: Math.round(energy),
      food: Math.round(food),
      consumption: Math.round(consumption),
      total: Math.round(total)
    };
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const carbonData = calculateCarbon();
      onComplete(carbonData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Étape {currentStep + 1} sur {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-green-100 dark:border-gray-700 shadow-lg p-8 transition-colors duration-300">
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-${currentStepData.color}-100 dark:bg-${currentStepData.color}-900/50 rounded-full mb-4 transition-colors duration-300`}>
            <IconComponent className={`w-8 h-8 text-${currentStepData.color}-600 dark:text-${currentStepData.color}-400`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{currentStepData.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Répondez aux questions suivantes pour évaluer votre impact dans cette catégorie
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {currentStepData.questions.map((question, index) => (
            <div key={question.key} className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                {question.label}
              </label>
              
              {question.type === 'range' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min={question.min}
                      max={question.max}
                      step={question.step}
                      value={answers[question.key as keyof typeof answers]}
                      onChange={(e) => handleInputChange(question.key, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider transition-colors duration-300"
                    />
                    <div className={`px-4 py-2 bg-${currentStepData.color}-100 dark:bg-${currentStepData.color}-900/50 text-${currentStepData.color}-700 dark:text-${currentStepData.color}-300 rounded-lg font-semibold min-w-[80px] text-center transition-colors duration-300`}>
                      {answers[question.key as keyof typeof answers]} {question.unit}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    <span>{question.min} {question.unit}</span>
                    <span>{question.max} {question.unit}</span>
                  </div>
                </div>
              )}
              
              {question.type === 'select' && (
                <select
                  value={answers[question.key as keyof typeof answers]}
                  onChange={(e) => handleInputChange(question.key, e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  {question.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Précédent</span>
          </button>

          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Calculer mon impact</span>
              </>
            ) : (
              <>
                <span>Suivant</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Steps Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index <= currentStep
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarbonCalculator;