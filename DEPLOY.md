# 🚀 Guide de Déploiement

## Option 1 : Vercel (Recommandé)

### Déploiement automatique via GitHub

1. Push ton code sur GitHub :
```bash
git add .
git commit -m "Initial commit: RideOrNot PWA"
git push origin main
```

2. Va sur [vercel.com](https://vercel.com)
3. Connecte ton compte GitHub
4. Clique sur "New Project"
5. Importe le repo `RideOrNot`
6. Vercel détectera automatiquement Vite
7. Clique sur "Deploy"

### Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

L'app sera disponible sur `https://rideornot.vercel.app` (ou ton domaine custom)

---

## Option 2 : Netlify

### Via GitHub

1. Push sur GitHub
2. Va sur [netlify.com](https://netlify.com)
3. "Add new site" > "Import from Git"
4. Sélectionne le repo
5. Build settings :
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Deploy

### Via CLI

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

---

## Option 3 : GitHub Pages

1. Modifier `vite.config.js` :
```js
export default defineConfig({
  base: '/RideOrNot/', // Nom de ton repo
  // ...
})
```

2. Build :
```bash
npm run build
```

3. Installer `gh-pages` :
```bash
npm install -D gh-pages
```

4. Ajouter script dans `package.json` :
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

5. Déployer :
```bash
npm run deploy
```

---

## ✅ Vérifications post-déploiement

- [ ] L'app charge correctement
- [ ] La géolocalisation fonctionne (HTTPS requis)
- [ ] L'API météo répond
- [ ] Le PWA est installable (icône dans la barre d'adresse)
- [ ] L'app fonctionne en mode avion (cache)
- [ ] Responsive sur mobile

---

## 🔧 Variables d'environnement

Aucune variable d'environnement requise pour le MVP.
L'API Open-Meteo est gratuite et sans clé.

Pour V2 (si tu ajoutes des fonctionnalités) :
```env
VITE_API_KEY=xxx
```

---

## 📱 Tester le PWA

1. Ouvre l'app en production (HTTPS)
2. Chrome DevTools > Application > Manifest
3. Vérifie que le manifest est valide
4. Application > Service Workers
5. Vérifie que le SW est actif
6. Lighthouse > PWA audit

---

## 🐛 Troubleshooting

### La géolocalisation ne marche pas
- Vérifie que l'app est en HTTPS
- Autorise la localisation dans les paramètres du navigateur

### Le PWA n'est pas installable
- Vérifie que les icônes existent (`pwa-192x192.png`, `pwa-512x512.png`)
- Générer les icônes : [favicon.io](https://favicon.io)
- Place-les dans `/public`

### L'API météo ne répond pas
- Vérifie la console (CORS, network errors)
- Open-Meteo a une limite de 10 000 requêtes/jour (gratuit)

---

## 🎨 Personnalisation

### Changer les couleurs
Modifie `tailwind.config.js` et `vite.config.js` (theme_color)

### Ajouter des icônes PWA
1. Génère tes icônes sur [favicon.io](https://favicon.io) ou [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Place-les dans `/public`
3. Update `vite.config.js` manifest.icons

---

Bon déploiement ! 🚴‍♂️
