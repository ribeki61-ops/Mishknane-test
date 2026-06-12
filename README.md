# 🏡 EHPAD Mishkane — Site Web

> *Une maison où l'on se sent chez soi.*  
> Site vitrine pour l'EHPAD Mishkane — maison de retraite privée à but non lucratif, Bois-l'Évêque (76), Normandie.

---

## ✨ Présentation

Site web complet, mono-page, conçu pour présenter l'EHPAD Mishkane à ses futurs résidents et à leurs familles. Le parti pris esthétique est résolument **chaleureux et haut de gamme** : typographie serif élégante (Fraunces), palette crème & prune, animations subtiles au scroll.

---

## 🗂️ Structure du projet

```
mishkane-v2/
├── index.html                  ← Page principale (mono-page)
│
├── assets/
│   ├── css/
│   │   ├── main.css            ← Point d'entrée (@import + tokens)
│   │   ├── preloader.css       ← Écran d'accueil de marque (intro)
│   │   ├── base.css            ← Reset, typographie, boutons, reveal
│   │   ├── header.css          ← Navigation, logo, burger mobile
│   │   ├── hero.css            ← Hero plein écran, stats, grain
│   │   ├── presentation.css    ← Image stack, grille de valeurs
│   │   ├── soins.css           ← 6 cartes de services
│   │   ├── chambres.css        ← Galerie photos + lightbox
│   │   ├── chambre-3d.css      ← Scène CSS 3D interactive
│   │   ├── equipe.css          ← Cartes équipe avec avatars
│   │   ├── temoignages.css     ← Avis familles, étoiles
│   │   ├── vie-quotidienne.css ← Timeline journée type
│   │   ├── tarifs.css          ← Carte tarifaire + accordéon
│   │   ├── journal.css         ← Articles blog
│   │   ├── faq.css             ← FAQ accordéon
│   │   ├── contact.css         ← Formulaire + carte Google Maps
│   │   ├── footer.css          ← Footer plum
│   │   ├── floats.css          ← Cookie RGPD, téléphone flottant, back-to-top
│   │   └── responsive.css      ← Tous les @media centralisés
│   │
│   └── js/
│       ├── main.js             ← Point d'entrée ES module
│       ├── header.js           ← Sticky header, nav active, burger
│       ├── reveal.js           ← Animations scroll (IntersectionObserver)
│       ├── hero.js             ← Parallaxe, compteurs animés, smooth scroll
│       ├── room3d.js           ← Rotation 3D au survol souris
│       ├── lightbox.js         ← Galerie plein écran
│       ├── contact.js          ← Envoi formulaire via Formspree (async)
│       └── floats.js           ← Bannière cookie RGPD, téléphone, back-to-top
│
└── pages/
    ├── mentions-legales.html   ← Page légale complète
    └── confidentialite.html    ← Politique RGPD détaillée
```

---

## 🎨 Design System

### Palette de couleurs

| Token            | Valeur      | Usage                        |
|------------------|-------------|------------------------------|
| `--plum`         | `#5E3144`   | Couleur principale, CTA      |
| `--plum-deep`    | `#3D1F2D`   | Footer, fonds sombres        |
| `--plum-soft`    | `#7B4A5E`   | Hover, nuances               |
| `--honey`        | `#B8835A`   | Accents dorés, icônes        |
| `--honey-light`  | `#D4A47A`   | Dégradés, highlights         |
| `--rose`         | `#D4A6A6`   | Étoiles, détails doux        |
| `--bg-cream`     | `#FAF5EC`   | Fond global                  |
| `--bg-warm`      | `#F4EAD8`   | Sections alternées           |

### Typographie

| Rôle       | Police                      | Graisses       |
|------------|-----------------------------|----------------|
| Display    | **Fraunces** (Google Fonts) | 300, 400, 500  |
| Corps      | **DM Sans** (Google Fonts)  | 300, 400, 500, 600 |

### Tokens utilitaires

```css
--r-sm: 8px   --r-md: 14px   --r-lg: 20px   --r-xl: 32px   --r-pill: 999px
--shadow-xs  --shadow-sm  --shadow-md  --shadow-lg
--ease  --ease-soft  --d-fast: 200ms  --d-base: 350ms  --d-slow: 600ms
```

---

## 🧩 Sections de la page

| # | Section           | ID               | Description                                        |
|---|-------------------|------------------|----------------------------------------------------|
| 1 | Hero              | —                | Plein écran, image parallaxe, compteurs animés     |
| 2 | Présentation      | `#presentation`  | Stack d'images, grille de valeurs                  |
| 3 | Soins & services  | `#soins`         | 6 cartes : médical, kiné, psychologue, animations… |
| 4 | Chambres          | `#chambres`      | Galerie 3 photos + lightbox plein écran            |
| 5 | Visite 3D         | `#chambre3d`     | Scène CSS 3D interactive à la souris               |
| 6 | Équipe            | `#equipe`        | 4 portraits avec bio                               |
| 7 | Témoignages       | `#temoignages`   | 3 avis familles avec étoiles                       |
| 8 | Vie quotidienne   | `#vie`           | Timeline d'une journée type                        |
| 9 | Tarifs            | `#tarifs`        | Carte tarifaire + accordéon aides financières      |
|10 | Journal           | `#journal`       | 3 articles blog avec vignettes                     |
|11 | FAQ               | `#faq`           | Accordéon questions fréquentes                     |
|12 | Contact           | `#contact`       | Formulaire Formspree + carte Maps intégrée         |

---

## ⚙️ Fonctionnalités JavaScript

- **Sticky header** avec changement d'apparence au scroll
- **Navigation active** selon la section visible (IntersectionObserver)
- **Menu burger** animé pour mobile
- **Compteurs animés** dans le hero (46 chambres, 24h/24…)
- **Parallaxe** sur l'image hero
- **Scroll reveal** sur tous les blocs `.reveal`
- **Rotation 3D** de la chambre au survol souris
- **Lightbox** galerie photos avec navigation clavier
- **Formulaire contact** asynchrone via Formspree
- **Bannière cookie RGPD** avec mémorisation `localStorage`
- **Bouton téléphone flottant** + **back-to-top**

---

## 🚀 Déploiement

### En local

Ouvrir `index.html` dans un navigateur. Les modules ES (`type="module"`) nécessitent un serveur local — utiliser par exemple :

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# VS Code
# Extension "Live Server" → clic droit → Open with Live Server
```

### Formulaire de contact

Le formulaire utilise [Formspree](https://formspree.io). Remplacer l'endpoint dans `assets/js/contact.js` :

```js
// Remplacer par votre propre endpoint Formspree
const res = await fetch('https://formspree.io/f/VOTRE_ID', { ... });
```

### Hébergement recommandé

Le site est entièrement statique (HTML/CSS/JS) — compatible avec :
- **Netlify** (glisser-déposer le dossier)
- **Vercel** (`vercel deploy`)
- **GitHub Pages**
- Tout hébergeur web classique (FTP)

---

## ⚠️ Règle CSS critique — `@import` en premier

Les `@import` dans `main.css` **doivent impérativement apparaître avant toute règle CSS** (y compris le bloc `:root`). Le navigateur ignore silencieusement tout `@import` qui suit une règle ordinaire.

```css
/* ✅ Correct */
@import 'base.css';
@import 'header.css';
/* ... tous les imports ... */

:root {
  --plum: #5E3144;
  /* ... */
}
```

---

## 📋 Personnalisation

### Photos
Remplacer les URLs Unsplash dans `index.html` par vos propres photos. Les attributs `src` (aperçu) et `data-src` (HD pour la lightbox) sont distincts.

### Coordonnées
Mettre à jour dans `index.html` :
- Numéro de téléphone (`+33235592800`)
- Email (`accueil@mishkane.fr`)
- Adresse (`3 Rue du Carouge, 76160 Bois-l'Évêque`)
- URL du site (`https://www.maison-retraite-mishkane.com/`)

### SEO & Schema.org
Le balisage `NursingHome` (JSON-LD) est déjà intégré dans le `<head>` — mettre à jour les données avec les vraies informations de l'établissement.

---

## ♿ Accessibilité

- Lien d'évitement (`skip-link`) vers le contenu principal
- Navigation au clavier sur la lightbox et les accordéons
- Attributs `aria-label` sur les éléments interactifs
- Images avec attributs `alt` descriptifs
- Contrastes conformes WCAG AA

---

## 📄 Licence

Site réalisé pour **EHPAD Mishkane** — usage privé. Tous droits réservés.

---