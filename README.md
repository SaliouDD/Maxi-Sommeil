# Maxi Sommeil

Maxi Sommeil est une application React Native légère pour aider à s'endormir avec :

- un exercice de respiration 4-7-8 animé ;
- des histoires courtes de visualisation apaisante ;
- un choix rapide de minuterie 10, 20 ou 30 minutes ;
- une interface sombre et calme adaptée au soir.

## Lancer en développement

```bash
npm install
npm start
```

## Construire un APK sans SDK local

Le dépôt contient un workflow GitHub Actions qui génère un APK Android installable sans avoir besoin d'installer Android Studio ou le SDK localement.

1. Poussez le code sur GitHub.
2. Ouvrez l'onglet **Actions**.
3. Lancez **Build Android APK** avec **Run workflow** ou poussez sur `main`/`master`.
4. Téléchargez l'artefact **maxi-sommeil-apk**.
5. Installez l'APK sur un téléphone Android en autorisant l'installation depuis cette source.

Le workflow installe Node.js, Java et le SDK Android, génère le projet natif Android avec Expo Prebuild, puis exécute `./gradlew assembleRelease`.
