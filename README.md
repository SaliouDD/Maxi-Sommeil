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

## Générer un APK installable avec GitHub Actions

Le dépôt contient un workflow GitHub Actions qui génère un APK Android installable sans SDK Android local.

1. Envoyez la branche sur GitHub.
2. Si vous êtes sur une branche de travail, ouvrez une pull request puis fusionnez-la dans `main`.
3. Ouvrez l'onglet **Actions** du dépôt.
4. Lancez **Build Android APK** avec **Run workflow**, ou poussez directement sur `main`/`master`.
5. Ouvrez l'exécution terminée, puis téléchargez l'artefact **maxi-sommeil-apk**.
6. Décompressez l'artefact et installez le fichier `app-debug.apk` sur Android en autorisant l'installation depuis cette source.

Le workflow installe Node.js, Java et le SDK Android, génère le projet natif Android avec Expo Prebuild, puis exécute `./gradlew assembleDebug`. Le build debug est volontaire : il ne demande aucune clé de signature et produit un APK directement installable pour tester l'application.

## Confirmer les changements dans le projet

```bash
git status
git add .
git commit -m "Create React Native sleep app"
git push origin main
```

Si vous travaillez sur une branche différente de `main`, remplacez la dernière commande par :

```bash
git push origin votre-branche
```

Puis ouvrez une pull request sur GitHub vers `main` et fusionnez-la après validation du workflow.
