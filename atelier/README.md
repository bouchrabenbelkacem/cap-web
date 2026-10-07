# Cap Web

## À quoi ça sert

Cap Web est un assistant à règles pour les spectateurs d’un cinéma indépendant.
Il répond aux questions sur les films disponibles, les horaires et les résumés.
Ce n’est pas une IA : la réponse vient toujours des règles de `brain.js`.

## Installer et lancer

Les commandes se tapent **dans ce dossier** (`atelier`). Il faut Node **24.20 ou plus**. Si PowerShell refuse `npm`, tapez `npm.cmd` à la place.

```powershell
node --version
npm ci
npm start
```

Ouvrez [http://127.0.0.1:3000](http://127.0.0.1:3000). Ctrl+C arrête le serveur.

Les réglages du binôme (limite 250, mots `cerise` et `prairie`) sont dans `cahier-personnel.json`. S’il manque, copiez l’exemple, puis éditez-le à la main :

```powershell
Copy-Item cahier-personnel.exemple.json cahier-personnel.json
```

Pour vérifier les règles :

```powershell
npm test
```

## Les 3 modules de `public/js`

- **`brain.js`** : valide le message (vide, espaces, limite) et choisit la réponse. Aucun accès à la page (`document`, `window`, `localStorage`).
- **`view.js`** : affiche l’historique dans `#messages` avec `textContent`. Il ne décide aucune réponse.
- **`app.js`** : relie le formulaire, le cerveau, l’affichage et la mémoire `capweb.historique`.
## Arborescence

atelier/
├── public/   # page, styles et JavaScript du navigateur
├── server/   # serveur web
├── tests/    # tests automatisés
├── browser/  # tests dans le navigateur
├── scripts/  # scripts du projet
├── package.json
└── README.md