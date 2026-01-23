# 🤝 Contribution Guide

Merci de contribuer à RideOrNot !

## 🚀 Quick Start

```bash
# Clone le repo
git clone https://github.com/YOUR_USERNAME/RideOrNot.git
cd RideOrNot

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📁 Structure du projet

```
src/
├── components/       # Composants React UI
│   ├── DurationPicker.jsx
│   ├── LocationDisplay.jsx
│   ├── Verdict.jsx
│   └── WeatherDetails.jsx
├── hooks/           # Custom React hooks
│   ├── useGeolocation.js
│   └── useWeather.js
├── utils/           # Logique métier
│   ├── weatherApi.js
│   └── decisionEngine.js
├── App.jsx          # Composant principal
├── main.jsx         # Entry point
└── index.css        # Styles globaux
```

## 🎯 Roadmap V2

Voici les features prioritaires :

### Haute priorité
- [ ] **Paramètres utilisateur** : Ajuster les seuils de décision
- [ ] **Choix de l'heure** : Analyser un créneau futur (pas juste "maintenant")
- [ ] **Mode sombre** : Thème sombre automatique

### Moyenne priorité
- [ ] **Historique** : Logger les sorties passées
- [ ] **Notifications** : Alerte push si conditions optimales
- [ ] **Partage social** : Partager les conditions sur les réseaux

### Basse priorité
- [ ] **Multi-langues** : i18n (EN, FR, ES, etc.)
- [ ] **Tests unitaires** : Vitest + React Testing Library
- [ ] **Accessibilité** : ARIA, keyboard navigation

## 🛠️ Comment contribuer

### 1. Fork & Clone

```bash
# Fork le repo sur GitHub
# Clone ton fork
git clone https://github.com/YOUR_USERNAME/RideOrNot.git
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-super-feature
```

### 3. Développer

- Respecte la structure existante
- Utilise les hooks personnalisés quand possible
- Teste localement avec `npm run dev`

### 4. Commit

```bash
git add .
git commit -m "feat: ajoute le mode sombre"
```

**Convention de commit** :
- `feat:` nouvelle feature
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatting, missing semi colons, etc.
- `refactor:` refactoring code
- `test:` ajout de tests
- `chore:` maintenance

### 5. Push & PR

```bash
git push origin feature/ma-super-feature
```

Ensuite, ouvre une Pull Request sur GitHub !

## 🧪 Tests

(À venir)

```bash
npm run test
```

## 📝 Code Style

- **Indentation** : 2 espaces
- **Quotes** : single quotes `'`
- **Semi-colons** : optionnels (cohérence)
- **Composants** : PascalCase
- **Fichiers** : camelCase pour JS, PascalCase pour JSX
- **Hooks** : préfixe `use`

## 🐛 Signaler un bug

Ouvre une issue avec :
- Description du bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots si applicable
- Environnement (browser, OS, etc.)

## 💡 Proposer une feature

Ouvre une issue avec :
- Description de la feature
- Use case (pourquoi c'est utile)
- Mockups/wireframes si possible

## 📚 Ressources

- [React Docs](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Open-Meteo API](https://open-meteo.com/en/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 🙏 Merci !

Toute contribution, grande ou petite, est appréciée ! 🚴‍♂️
