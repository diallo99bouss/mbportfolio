# Portfolio — Mamadou B. Diallo
> React 18 · TypeScript · Vite · Material UI v5

## 🚀 Lancer le projet

```bash
# Installer les dépendances
npm install

# Démarrer en développement (http://localhost:5173)
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── Navbar.tsx       # AppBar MUI — navigation fixe
│   ├── Hero.tsx         # Page d'accueil avec stats
│   ├── About.tsx        # À propos + terminal animé
│   ├── Experience.tsx   # Parcours professionnel
│   ├── Skills.tsx       # Compétences avec LinearProgress animé
│   └── Contact.tsx      # Formulaire MUI TextField
├── data/
│   └── portfolio.ts     # ← Toutes tes données ici
├── theme/
│   └── index.ts         # Thème MUI custom (dark, typo Syne+SpaceMono)
├── types/
│   └── index.ts         # Types TypeScript
├── App.tsx              # ThemeProvider + routing par état
└── main.tsx             # Entry point
```

## ✏️ Personnaliser

Toutes les données (nom, expériences, compétences, liens) sont dans **`src/data/portfolio.ts`**.  
Le thème MUI (couleurs, typographie, composants) est dans **`src/theme/index.ts`**.

## 🌐 Déployer gratuitement

### Vercel (recommandé — 1 commande)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Drag & drop du dossier dist/ sur app.netlify.com
```

### GitHub Pages
```bash
# Dans vite.config.ts, ajouter : base: '/nom-du-repo/'
npm run build
npx gh-pages -d dist
```

## 🛠 Stack technique
| Outil | Version | Rôle |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 | Typage statique |
| Vite | 5 | Bundler ultra-rapide |
| MUI (Material UI) | 5 | Composants & thème |
| @mui/icons-material | 5 | Icônes |
| @emotion/react | 11 | CSS-in-JS (requis par MUI) |
