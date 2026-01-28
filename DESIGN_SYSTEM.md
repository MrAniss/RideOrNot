# 🎨 RideOrNot - Design System

## Palette de couleurs

### Fonds
- **Primary** : `#046865` - Turquoise foncé (fond principal)
- **Secondary** : `#035553` - Turquoise très foncé (cards, modals)
- **Tertiary** : `#21A0A0` - Turquoise clair (accents)

### Textes
- **Primary** : `#FCFFF7` - Blanc cassé
- **Secondary** : `rgba(252, 255, 247, 0.8)` - Blanc cassé 80%
- **Muted** : `rgba(252, 255, 247, 0.5)` - Blanc cassé 50%

### Accents
- **Primary** : `#21A0A0` - Turquoise clair
- **Secondary** : `#FFE900` - Jaune vif
- **Hover** : `#1a8080` - Turquoise foncé

### Verdicts
- **GO** : `#21A0A0` - Turquoise
- **RISQUÉ** : `#FFE900` - Jaune
- **NO GO** : `#E53D00` - Orange-rouge

### Bordures
- **Default** : `rgba(252, 255, 247, 0.2)` - Blanc 20%
- **Focus** : `#21A0A0` - Turquoise

---

## Typographie

### Fonts
- **Heading** : `Outfit` (titres, verdict, logo)
- **Body** : `Inter` (texte courant, labels, inputs)

### Poids
- **Regular** : 400
- **Medium** : 500/600
- **Bold** : 700

---

## Composants

### Cards / Containers
```css
background: #035553;
border: 1px solid rgba(252, 255, 247, 0.2);
border-radius: 16px;
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
```

### Boutons Principaux
```css
background: #21A0A0;
color: #046865;
border-radius: 12px;
font-weight: 600;

hover:
  background: #1a8080;
```

### Boutons Secondaires
```css
background: transparent;
border: 1px solid rgba(252, 255, 247, 0.2);
color: #FCFFF7;
border-radius: 12px;

hover:
  border-color: #21A0A0;
```

### Inputs
```css
background: #035553;
border: 1px solid rgba(252, 255, 247, 0.2);
border-radius: 10px;
color: #FCFFF7;

placeholder:
  color: rgba(252, 255, 247, 0.5);

focus:
  border-color: #21A0A0;
  outline: none;
```

### Verdict Cards

#### GO
```css
background: rgba(33, 160, 160, 0.15);
border: 3px solid #21A0A0;
color: #21A0A0;
```

#### RISQUÉ
```css
background: rgba(255, 233, 0, 0.15);
border: 3px solid #FFE900;
color: #FFE900;
```

#### NO GO
```css
background: rgba(229, 61, 0, 0.15);
border: 3px solid #E53D00;
color: #E53D00;
```

---

## Classes Tailwind

### Couleurs personnalisées
- `bg-bg-primary` : #046865
- `bg-bg-secondary` : #035553
- `bg-bg-tertiary` : #21A0A0
- `text-text-primary` : #FCFFF7
- `bg-accent` : #21A0A0
- `bg-accent-secondary` : #FFE900
- `bg-accent-hover` : #1a8080
- `bg-verdict-go` : #21A0A0
- `bg-verdict-risky` : #FFE900
- `bg-verdict-nogo` : #E53D00
- `text-verdict-go` : #21A0A0
- `text-verdict-risky` : #FFE900
- `text-verdict-nogo` : #E53D00
- `border-verdict-go` : #21A0A0
- `border-verdict-risky` : #FFE900
- `border-verdict-nogo` : #E53D00

### Fonts
- `font-heading` : Outfit
- `font-body` : Inter

---

## Mapping des anciens styles

### Remplacements à faire

| Ancien | Nouveau |
|--------|---------|
| `bg-white/10` | `bg-bg-secondary border border-text-primary/20` |
| `bg-purple-700` | `bg-bg-secondary` |
| `bg-purple-600` | `bg-bg-primary` |
| `text-purple-700` | `text-bg-primary` |
| `text-white` | `text-text-primary` |
| `text-white/80` | `text-text-primary/80` |
| `text-white/70` | `text-text-primary/70` |
| `text-white/50` | `text-text-primary/50` |
| `bg-green-500` | `bg-verdict-go` |
| `bg-orange-500` | `bg-verdict-risky` |
| `bg-red-500` | `bg-verdict-nogo` |
| `text-green-500` | `text-verdict-go` |
| `text-orange-500` | `text-verdict-risky` |
| `text-red-500` | `text-verdict-nogo` |

---

## Logo SVG

```svg
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Roue de vélo -->
  <circle cx="36" cy="32" r="20" stroke="#21A0A0" stroke-width="4" fill="none"/>
  <circle cx="36" cy="32" r="4" fill="#21A0A0"/>

  <!-- Traits de vent -->
  <line x1="4" y1="24" x2="16" y2="24" stroke="#FFE900" stroke-width="3" stroke-linecap="round"/>
  <line x1="8" y1="32" x2="14" y2="32" stroke="#FFE900" stroke-width="3" stroke-linecap="round"/>
  <line x1="4" y1="40" x2="16" y2="40" stroke="#FFE900" stroke-width="3" stroke-linecap="round"/>
</svg>
```

---

## Checklist design

- [x] Tailwind config avec nouvelles couleurs
- [x] CSS global (fonts + CSS vars)
- [x] DecisionEngine (configs de verdict)
- [ ] App.jsx (container principal)
- [ ] Verdict.jsx (carte de verdict)
- [ ] LocationSearch.jsx (search + display)
- [ ] DateTimePicker.jsx (picker de date)
- [ ] DurationPicker.jsx (slider de durée)
- [ ] WeatherDetails.jsx (cartes de détails)
- [ ] HourlyForecast.jsx (liste horaire)
- [ ] TimelineModal.jsx (modal timeline)
- [ ] SettingsModal.jsx (modal paramètres)
- [ ] WindDirection.jsx (flèche de vent)
- [ ] Logo SVG (remplacer emoji 🚴)

---

Made with ❤️ for cyclists 🚴
