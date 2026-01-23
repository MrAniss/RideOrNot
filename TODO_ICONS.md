# 📱 TODO: Générer les icônes PWA

Pour que l'app soit complètement installable, tu dois générer les icônes PWA.

## Méthode rapide (recommandée)

1. Va sur **[favicon.io](https://favicon.io)** ou **[realfavicongenerator.net](https://realfavicongenerator.net/)**

2. Upload ton logo/design de vélo (ou utilise le `bike.svg` dans `/public`)

3. Télécharge le package généré

4. Place ces fichiers dans `/public` :
   - `pwa-192x192.png`
   - `pwa-512x512.png`
   - `apple-touch-icon.png` (optionnel)
   - `favicon.ico` (optionnel)

5. Rebuild l'app :
```bash
npm run build
```

## Alternative : Utiliser un outil en ligne de commande

```bash
# Installer pwa-asset-generator
npx pwa-asset-generator public/bike.svg public --background "#10b981" --padding "10%"
```

## Vérifier que ça marche

1. Build et preview :
```bash
npm run build
npm run preview
```

2. Ouvre Chrome DevTools > Application > Manifest
3. Vérifie que les icônes apparaissent
4. Teste l'installation (icône + dans la barre d'adresse)

## Icônes recommandées

- **192x192** : icône de base
- **512x512** : écran de splash
- **apple-touch-icon (180x180)** : pour iOS
- **favicon.ico** : pour les onglets navigateur

---

**Note :** L'app fonctionne sans les icônes, mais elles sont requises pour l'installation PWA sur mobile.
