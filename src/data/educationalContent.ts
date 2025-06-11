import { EducationalContent } from '../types';

export const educationalContent: EducationalContent[] = [
  // Transport
  {
    id: 'transport-1',
    title: 'L\'impact carbone des différents modes de transport',
    description: 'Découvrez les émissions de CO₂ par kilomètre selon le mode de transport choisi',
    category: 'transport',
    type: 'article',
    content: `
# L'impact carbone des transports

## Émissions par mode de transport (g CO₂/km/personne)

- **Avion (vol domestique)** : 285g CO₂/km
- **Voiture individuelle (essence)** : 210g CO₂/km
- **Voiture individuelle (diesel)** : 190g CO₂/km
- **Bus** : 80g CO₂/km
- **Train régional** : 70g CO₂/km
- **Métro/RER** : 15g CO₂/km
- **TGV** : 14g CO₂/km
- **Vélo électrique** : 8g CO₂/km
- **Vélo** : 0g CO₂/km

## Conseils pratiques

1. **Privilégiez les transports en commun** pour les trajets urbains
2. **Covoiturez** pour diviser l'impact par le nombre de passagers
3. **Choisissez le train** plutôt que l'avion pour les distances moyennes
4. **Adoptez le vélo** pour les trajets courts (moins de 5km)
5. **Télétravaillez** quand c'est possible pour réduire les déplacements

## Le saviez-vous ?

Un aller-retour Paris-New York en avion représente environ 2 tonnes de CO₂, soit l'objectif annuel d'une personne pour respecter l'Accord de Paris !
    `,
    readTime: 5,
    difficulty: 'débutant',
    tags: ['transport', 'émissions', 'mobilité'],
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  
  // Énergie
  {
    id: 'energy-1',
    title: 'Réduire sa consommation énergétique à la maison',
    description: 'Guide pratique pour diminuer votre facture et votre impact environnemental',
    category: 'energy',
    type: 'article',
    content: `
# Réduire sa consommation énergétique

## Les gestes qui comptent le plus

### Chauffage (70% de la consommation)
- **Baissez de 1°C** : -7% de consommation
- **Isolez** : jusqu'à -30% de consommation
- **Programmez** : -10% avec un thermostat intelligent

### Eau chaude (12% de la consommation)
- **Douche vs bain** : 3x moins d'énergie
- **Réduisez la température** : 55°C suffisent
- **Isolez le ballon** : -10% de pertes

### Électroménager (18% de la consommation)
- **Dégivrez** régulièrement le congélateur
- **Lavez à froid** : -60% d'énergie pour le lave-linge
- **Éteignez** les appareils en veille : -10% sur la facture

## Investissements rentables

1. **LED** : -80% de consommation vs ampoules classiques
2. **Électroménager A+++** : -50% vs classe A
3. **Pompe à chaleur** : 3x plus efficace qu'un chauffage électrique
4. **Isolation** : retour sur investissement en 5-10 ans

## Impact environnemental

En France, 1 kWh économisé = 57g de CO₂ évités grâce au mix énergétique bas carbone.
    `,
    readTime: 7,
    difficulty: 'intermédiaire',
    tags: ['énergie', 'économies', 'isolation', 'chauffage'],
    imageUrl: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Alimentation
  {
    id: 'food-1',
    title: 'L\'impact environnemental de notre alimentation',
    description: 'Comment nos choix alimentaires influencent le climat',
    category: 'food',
    type: 'article',
    content: `
# L'impact de notre alimentation sur le climat

## Émissions par type d'aliment (kg CO₂/kg d'aliment)

### Protéines animales
- **Bœuf** : 27 kg CO₂/kg
- **Agneau** : 24 kg CO₂/kg
- **Porc** : 12 kg CO₂/kg
- **Volaille** : 6 kg CO₂/kg
- **Poisson** : 5 kg CO₂/kg

### Protéines végétales
- **Légumineuses** : 1 kg CO₂/kg
- **Céréales** : 1.5 kg CO₂/kg
- **Noix** : 2 kg CO₂/kg

### Produits laitiers
- **Fromage** : 11 kg CO₂/kg
- **Lait** : 3 kg CO₂/kg

## Stratégies pour réduire son impact

1. **Réduisez la viande rouge** : 1 jour sans viande/semaine = -300 kg CO₂/an
2. **Privilégiez le local et de saison** : -20% d'émissions transport
3. **Réduisez le gaspillage** : 1/3 de la nourriture est gaspillée
4. **Choisissez le bio** quand possible : -25% d'émissions en moyenne

## Le régime flexitarien

Réduire sa consommation de viande de 50% tout en maintenant une alimentation équilibrée peut diviser par 2 l'impact alimentaire.
    `,
    readTime: 6,
    difficulty: 'débutant',
    tags: ['alimentation', 'viande', 'local', 'bio'],
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Consommation
  {
    id: 'consumption-1',
    title: 'Consommation responsable : acheter moins, acheter mieux',
    description: 'Guide pour une consommation plus durable et économique',
    category: 'consumption',
    type: 'article',
    content: `
# Vers une consommation plus responsable

## Les 5 R de la consommation durable

1. **Refuser** : ce dont on n'a pas besoin
2. **Réduire** : sa consommation globale
3. **Réutiliser** : donner une seconde vie aux objets
4. **Recycler** : trier et valoriser les déchets
5. **Réparer** : plutôt que jeter

## Impact de nos achats

### Textile
- **1 jean** = 1500L d'eau + 25 kg CO₂
- **Fast fashion** : 10% des émissions mondiales de CO₂
- **Solution** : acheter moins, choisir la qualité, seconde main

### Électronique
- **1 smartphone** = 70 kg CO₂ (fabrication)
- **Obsolescence programmée** : durée de vie réduite artificiellement
- **Solution** : garder plus longtemps, réparer, reconditionné

### Emballages
- **Plastique** : 500 ans pour se dégrader
- **Suremballage** : 30% du poids des déchets ménagers
- **Solution** : vrac, réutilisable, compostable

## Économie circulaire

Passer d'un modèle linéaire (extraire-produire-jeter) à un modèle circulaire (réutiliser-réparer-recycler) peut réduire de 80% l'impact environnemental.

## Conseils pratiques

- **Liste de courses** : éviter les achats impulsifs
- **Seconde main** : 70% d'économies en moyenne
- **Location/partage** : pour les objets peu utilisés
- **Qualité** : coût par utilisation plus faible
    `,
    readTime: 8,
    difficulty: 'intermédiaire',
    tags: ['consommation', 'économie circulaire', 'seconde main', 'réparation'],
    imageUrl: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Général
  {
    id: 'general-1',
    title: 'Comprendre le réchauffement climatique',
    description: 'Les bases scientifiques du changement climatique expliquées simplement',
    category: 'general',
    type: 'article',
    content: `
# Le réchauffement climatique expliqué

## Les faits scientifiques

### L'effet de serre naturel
- **Nécessaire à la vie** : sans lui, la Terre serait à -18°C
- **Gaz à effet de serre naturels** : vapeur d'eau, CO₂, méthane
- **Équilibre fragile** : maintient la température à +15°C

### L'effet de serre renforcé
- **Activités humaines** : +50% de CO₂ depuis 1850
- **Autres gaz** : méthane (agriculture), protoxyde d'azote (engrais)
- **Conséquence** : +1.1°C depuis l'ère préindustrielle

## Les impacts observés

### Climat
- **Températures** : 19 des 20 années les plus chaudes depuis 2000
- **Précipitations** : plus intenses et irrégulières
- **Événements extrêmes** : canicules, sécheresses, inondations

### Environnement
- **Fonte des glaces** : -13% de banquise arctique par décennie
- **Niveau des mers** : +20cm depuis 1900
- **Biodiversité** : 1 million d'espèces menacées

## Les scénarios futurs

### +1.5°C (objectif Accord de Paris)
- **Nécessaire** : -45% d'émissions d'ici 2030
- **Impacts limités** : mais déjà significatifs

### +2°C
- **Impacts doublés** : par rapport à +1.5°C
- **Seuil critique** : pour de nombreux écosystèmes

### +3°C et plus
- **Emballement** : risque de points de non-retour
- **Impacts majeurs** : sur l'agriculture, l'eau, la santé

## Solutions

La limitation du réchauffement nécessite une action à tous les niveaux : individuel, collectif, politique et économique.
    `,
    readTime: 10,
    difficulty: 'débutant',
    tags: ['climat', 'science', 'réchauffement', 'GIEC'],
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];