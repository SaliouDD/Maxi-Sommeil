# Maxi Sommeil

Application React Native légère pour aider à s'endormir avec une routine simple : respiration 4-7-8, histoires courtes et minuterie.

## Développement local

```bash
npm install
npm start
```

## APK Android depuis GitHub Actions

Le build Android est prévu pour GitHub Actions afin de ne pas dépendre d'un SDK Android installé localement.

1. Poussez le code sur GitHub.
2. Ouvrez l'onglet **Actions**.
3. Lancez **Build Android APK** avec **Run workflow**, ou poussez sur `main`/`master`.
4. Téléchargez l'artefact **maxi-sommeil-apk** à la fin du workflow.
5. Décompressez l'artefact et installez `app-debug.apk` sur le téléphone Android.

Le workflow génère le dossier Android avec Expo Prebuild puis compile `assembleDebug`. Ce format ne demande pas de clé de signature et produit un APK installable pour validation.

## Mettre le travail sur la branche principale

Si vous êtes déjà sur `main` :

```bash
git add .
git commit -m "Add Maxi Sommeil app"
git push origin main
```

Si vous êtes sur une branche de travail :

```bash
git add .
git commit -m "Add Maxi Sommeil app"
git push origin votre-branche
```

Ouvrez ensuite une pull request vers `main`, attendez que le workflow APK passe, puis fusionnez la pull request.
