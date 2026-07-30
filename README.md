# Tempo — Web Design Document

Document éditorial interactif en HTML, CSS et JavaScript vanilla. Le contenu est volontairement composé de placeholders à remplacer progressivement.

## Lancement local

Pour ouvrir directement le Web Design Document, sans passer par la liste des dossiers du projet, lancer la commande depuis la racine Tempo :

```bash
python3 -m http.server 8000 --directory "Web document"
```

Ouvrir ensuite `http://localhost:8000/`. Aucun build n’est nécessaire.

## Publication GitHub Pages

Publier la branche contenant le projet puis utiliser `Web document/index.html` comme point d’entrée. Tous les chemins sont relatifs. Si le site doit être publié depuis un dossier sans espace, renommer le dossier et conserver ensemble `index.html`, `style.css`, `script.js` et `assets/`.

## Remplacer les contenus

- Chercher `CONTENT START` dans `index.html` pour les principales zones rédactionnelles.
- Remplacer uniquement le texte entre crochets, sans supprimer les classes structurelles.
- Les composants `.copy-placeholder` distinguent titres, corps, citations et données.
- Ne pas présenter une hypothèse, un proto-persona ou une donnée fictive comme un résultat réel.

## Ajouter les médias

Chaque `.media-placeholder` contient un attribut `data-replacement` et affiche le chemin cible. Ajouter le fichier dans `assets/images/`, puis remplacer le contenu du placeholder par une balise `<img>` utilisant le même chemin et un texte alternatif pertinent.

La vidéo Web du prototype est intégrée depuis `assets/videos/tempo-prototype.m4v` et son poster depuis `assets/images/prototype-poster.png`. Si un navigateur ne prend pas en charge la vidéo, le poster et un message de remplacement restent affichés.

## Couleurs et thèmes

Les tokens sont définis au début de `style.css`. Les valeurs reprennent l’application Tempo. Le thème sombre utilise la logique bleu nuit de l’application, se base sur `prefers-color-scheme` à la première visite et conserve ensuite le choix dans `localStorage` sous la clé `tempo-wdd-theme`.

## Export PDF

Utiliser le bouton d’impression dans la navigation ou la fonction d’impression du navigateur. Les styles `@media print` utilisent un format A4 paysage, masquent la navigation, figent les animations et placent un chapitre par page. Activer l’impression des arrière-plans dans la boîte de dialogue du navigateur.
