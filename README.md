# 🚴 RideOrNot

> Météo intelligente pour cyclistes - Savoir si c'est le bon moment pour rouler

Une Progressive Web App (PWA) qui analyse les conditions météo pour vous dire si vous devriez sortir faire du vélo.

## ✨ Fonctionnalités

- **Analyse météo intelligente** : verdict clair (GO / RISQUÉ / NO GO)
- **Géolocalisation automatique** : détecte votre position
- **Durée personnalisable** : analysez les conditions sur 1 à 12 heures
- **Détails complets** : température, vent, rafales, probabilité de pluie
- **PWA installable** : fonctionne comme une app native sur mobile
- **Données gratuites** : API Open-Meteo sans clé requise

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

## 🏗️ Stack technique

- **Framework** : React 18 + Vite
- **Style** : Tailwind CSS
- **API Météo** : Open-Meteo
- **PWA** : vite-plugin-pwa (Workbox)
- **Géolocalisation** : Navigator API

## 📱 Installer comme PWA

1. Ouvrez l'app dans votre navigateur
2. Sur mobile : "Ajouter à l'écran d'accueil"
3. Sur desktop : Icône d'installation dans la barre d'adresse

## 🎯 Algorithme de décision

L'app évalue 4 critères pour déterminer le verdict :

| Critère | ✅ GO | ⚠️ RISQUÉ | ❌ NO GO |
|---------|-------|-----------|----------|
| Vent moyen | < 20 km/h | 20-35 km/h | > 35 km/h |
| Rafales | < 35 km/h | 35-50 km/h | > 50 km/h |
| Probabilité pluie | < 20% | 20-50% | > 50% |
| Précipitations | 0 mm | 0-2 mm | > 2 mm |

**Logique** :
- Si **un seul** critère est NO GO → **NO GO**
- Si **au moins un** critère est RISQUÉ (et aucun NO GO) → **RISQUÉ**
- Sinon → **GO**

## 📂 Structure du projet

```
rideornot/
├── public/              # Assets statiques
│   └── bike.svg         # Icône de l'app
├── src/
│   ├── components/      # Composants React
│   │   ├── DurationPicker.jsx
│   │   ├── LocationDisplay.jsx
│   │   ├── Verdict.jsx
│   │   └── WeatherDetails.jsx
│   ├── hooks/           # Custom hooks
│   │   ├── useGeolocation.js
│   │   └── useWeather.js
│   ├── utils/           # Utilitaires
│   │   ├── weatherApi.js
│   │   └── decisionEngine.js
│   ├── App.jsx          # Composant principal
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── index.html
├── vite.config.js       # Config Vite + PWA
├── tailwind.config.js
└── package.json
```

## 🛣️ Roadmap V2

- [ ] Paramètres personnalisables (seuils ajustables)
- [ ] Historique des sorties
- [ ] Notifications push (alerte conditions optimales)
- [ ] Choix de l'heure de départ (prévisions futures)
- [ ] Mode sombre
- [ ] Partage sur les réseaux sociaux

## 📄 License

MIT

## 🙏 Credits

- Données météo : [Open-Meteo](https://open-meteo.com/)
- Made with ❤️ for cyclists
