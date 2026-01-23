# 👋 Bienvenue sur RideOrNot !

**La PWA météo pour cyclistes est prête !** 🚴

---

## 🎯 Où commencer ?

### 1️⃣ Tester l'app localement

Lis le **[QUICKSTART.md](./QUICKSTART.md)** pour lancer l'app en 2 minutes.

```bash
npm install
npm run dev
```

### 2️⃣ Comprendre le projet

Lis le **[README.md](./README.md)** pour :
- Découvrir les fonctionnalités
- Comprendre l'algorithme de décision
- Explorer la stack technique

### 3️⃣ Ajouter les icônes PWA

Suis le **[TODO_ICONS.md](./TODO_ICONS.md)** pour générer les icônes et rendre l'app installable.

### 4️⃣ Déployer en production

Lis le **[DEPLOY.md](./DEPLOY.md)** pour déployer sur :
- Vercel (recommandé)
- Netlify
- GitHub Pages

### 5️⃣ Contribuer

Lis le **[CONTRIBUTING.md](./CONTRIBUTING.md)** pour :
- Comprendre la structure du code
- Découvrir la roadmap V2
- Soumettre des pull requests

### 6️⃣ Vérifier le statut

Consulte **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** pour :
- Voir ce qui est fait
- Ce qu'il reste à faire
- Les stats du projet

---

## 🚀 Actions rapides

| Action | Commande |
|--------|----------|
| Installer | `npm install` |
| Dev local | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Deploy (Vercel) | `vercel --prod` |

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| [README.md](./README.md) | Documentation principale |
| [QUICKSTART.md](./QUICKSTART.md) | Guide de démarrage rapide |
| [DEPLOY.md](./DEPLOY.md) | Guide de déploiement |
| [TODO_ICONS.md](./TODO_ICONS.md) | Générer les icônes PWA |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guide de contribution |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | État du projet |

---

## 🎨 Personnalisation

### Changer les couleurs
Modifie `vite.config.js` (theme_color) et `tailwind.config.js`

### Ajuster les seuils de décision
Modifie `src/utils/decisionEngine.js` (THRESHOLDS)

### Ajouter une feature
Consulte la roadmap V2 dans [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🐛 Problème ?

1. Vérifie [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Known Issues
2. Lis la section Troubleshooting dans [DEPLOY.md](./DEPLOY.md)
3. Ouvre une issue sur GitHub

---

## ✅ Checklist Avant Production

- [ ] `npm install` réussi
- [ ] `npm run build` réussi
- [ ] Générer les icônes PWA ([TODO_ICONS.md](./TODO_ICONS.md))
- [ ] Tester sur mobile
- [ ] Tester la géolocalisation (HTTPS requis)
- [ ] Vérifier que l'API météo répond
- [ ] Déployer sur Vercel/Netlify ([DEPLOY.md](./DEPLOY.md))

---

**Enjoy coding ! 🚴‍♂️**

Si tu as des questions, consulte la doc ou ouvre une issue !
