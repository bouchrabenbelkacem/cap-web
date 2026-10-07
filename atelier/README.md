# Cap Web

Cap Web est un assistant fictif à règles pour découvrir les films et les séances
d’un cinéma indépendant. Ce n’est pas une IA : les réponses sont déterminées
par les règles de `public/js/brain.js`.

## Prérequis

- Node.js **24.20 ou supérieur** ;
- npm, fourni avec Node.js ;
- un navigateur récent.

Toutes les commandes ci-dessous sont à exécuter dans un terminal PowerShell,
depuis le dossier `atelier` (celui qui contient `package.json`). Si PowerShell
refuse la commande `npm`, utilisez `npm.cmd` à sa place.

## Installer et lancer

```powershell
node --version
npm ci
npm start
```

Ouvrez ensuite [http://127.0.0.1:3000](http://127.0.0.1:3000). Pour arrêter le
serveur, revenez au terminal et appuyez sur `Ctrl+C`.

## Tester

Les tests unitaires et serveur utilisent le lanceur intégré à Node.js :

```powershell
npm test
```

Les tests navigateur automatisent aussi les quatre vérifications de l’étape 11.
Ils démarrent leur propre serveur local : arrêtez d’abord celui lancé par
`npm start`. À la première utilisation, installez Chromium pour Playwright,
puis lancez les tests :

```powershell
npx playwright install chromium
npm run test:browser
```

Une vérification statique du code est également disponible :

```powershell
npm run lint
```

## Les quatre vérifications de l’étape 11

Les scénarios du navigateur sont dans `browser/attaques.spec.js` :

1. La requête de conseil échoue : un message de secours lisible s’affiche.
   Pour reproduire manuellement une panne complète, laissez la page ouverte,
   arrêtez le serveur avec `Ctrl+C`, puis envoyez `conseil`.
2. Un message de 251 caractères (la limite est 250) est refusé avec une erreur
   visible, sans être ajouté à la conversation.
3. `<b>test</b>` apparaît comme du texte littéral ; aucun élément `<b>` n’est
   créé dans la conversation.
4. À 375 px de large, le contenu reste visible sans défilement horizontal.

## Route HTTP

| Méthode | Route | Réponse |
| --- | --- | --- |
| `GET` | `/api/conseil` | Un conseil choisi au hasard, au format JSON : `{"conseil":"…"}`. |

Cette route sert les conseils du serveur au message `conseil`. Si la requête
échoue ou si la réponse n’est pas valide, l’interface affiche un message de
secours au lieu de rester vide.

Le serveur fournit également la page sur `/`, les fichiers de `public/` et
`/version.json`. Les autres chemins sont refusés.

## Organisation du projet

```text
atelier/
├── browser/             # Tests Playwright du parcours et des attaques
├── public/              # Fichiers servis au navigateur
│   ├── index.html       # Structure de la page et formulaire
│   ├── styles.css       # Mise en page, dont l’adaptation mobile
│   └── js/
│       ├── app.js       # Événements, requêtes, statut et historique
│       ├── brain.js     # Validation des messages et réponses à règles
│       └── view.js      # Affichage des messages comme texte
├── scripts/             # Contrôles et génération du déploiement statique
├── server/
│   ├── app.js           # Routes HTTP et fichiers publics autorisés
│   └── start.js         # Démarrage local sur 127.0.0.1:3000
├── tests/               # Tests Node.js : logique, serveur et harnais
├── cahier-personnel.json
├── cahier-personnel.exemple.json
├── package.json         # Scripts npm et versions des outils
└── README.md
```

`cahier-personnel.json` contient les réglages attribués au binôme. Ne remplacez
pas ce fichier par l’exemple sans consigne du formateur.
