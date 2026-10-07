# Jour 3 · Six étapes bonus, de 13 à 18

Ces étapes sont pour les binômes qui ont fini les 12 étapes : le livrable passe avant. Chaque étape terminée vaut 0,5 point de bonus pour le binôme, soit 3 points au plus. Faites-les dans l'ordre.

Une étape à la fois, sur un seul poste, et changez de clavier à chaque étape. Avant de commencer une étape, tapez `git pull --no-rebase` ; à la fin, faites le commit avec le message indiqué, puis `git push`.

## Comment être sûr d'avoir le bonus

Une étape vaut 0,5 point quand trois choses sont vraies avant votre passage de vendredi. Son commit, avec le message exact indiqué, est sur la branche `main` de GitHub. `npm test` affiche `fail 0`. Et ce que demande l'étape marche devant moi.

Vérifiez vous-même : `git log --oneline` doit afficher le message exact, et la liste des commits de `main` sur GitHub aussi. Sans le commit sur GitHub, pas de bonus, même si le code est là.

Prenez une capture d'écran à la fin de chaque étape (Windows + Maj + S). Elle n'est pas obligatoire, mais elle aide : mettez-la dans vos slides de vendredi, elle prouve votre travail en une image.

## Étape 13 · Un historique abîmé ne casse plus Cap Web

Cap Web ouvert, ouvrez la console (F12), tapez `localStorage.setItem('capweb.historique', '[null]')`, puis rechargez la page. Elle plante, et la console affiche en rouge « Cannot read properties of null ». La fonction `charger()` de `public/js/app.js` vérifie que les données sont un tableau, mais pas que chaque élément est un message.

Dans `public/js/brain.js`, ajoutez et exportez une fonction `estMessage(m)`. Elle renvoie `true` seulement si `m` est un objet non `null`, si `m.role` vaut `'user'` ou `'assistant'`, et si `m.text` est du texte. Dans `app.js`, importez-la, puis remplacez `historique.push(...donnees);` par `historique.push(...donnees.filter(estMessage));`.

C'est fini quand, avec `[null]` dans le stockage, la page s'affiche sans l'erreur rouge, et qu'une vraie conversation revient toujours après un rechargement.

```powershell
npm run lint
npm test
git add -- public/js/brain.js public/js/app.js
git commit -m "fix: historique abîmé ignoré"
git push
```

| L'étape 13 en bref | |
|---|---|
| Pourquoi | ce qui vient de dehors (stockage, réseau, fichier) peut être abîmé : une ancienne version, une extension, un utilisateur. L'application ne doit jamais tomber pour autant. |
| Ce que vous retenez | à la frontière, on vérifie la forme de chaque élément, pas seulement le conteneur. |
| La preuve du 0,5 | le commit `fix: historique abîmé ignoré` sur GitHub, et `npm test` à `fail 0`. |
| La capture | la page affichée avec `[null]` dans le stockage, la console F12 ouverte, sans erreur rouge. |

## Étape 14 · Un test pour estMessage

Créez `tests/messages.test.js`. Importez `test` depuis `node:test`, `assert` depuis `node:assert/strict`, et `estMessage` depuis `../public/js/brain.js`. Écrivez quatre tests, avec un `assert.equal` chacun : un vrai message donne `true`, `null` donne `false`, un rôle `'pirate'` donne `false`, et un texte qui est un nombre donne `false`.

Vérifiez ensuite que vos tests servent à quelque chose. Dans `estMessage`, remplacez un instant tout le corps de la fonction par `return true;`, puis lancez `npm test` : trois de vos tests doivent devenir rouges. Remettez le code avec `git restore public/js/brain.js`.

C'est fini quand `npm test` affiche vos quatre tests en plus, et `fail 0`.

```powershell
npm test
git add -- tests/messages.test.js
git commit -m "test: estMessage"
git push
```

| L'étape 14 en bref | |
|---|---|
| Pourquoi | un bug corrigé sans test peut revenir à la prochaine modification. Le test le bloque pour de bon. |
| Ce que vous retenez | un test qui ne rougit jamais ne prouve rien : on casse exprès le code pour vérifier qu'il sert. C'est le thème 3 des questions de vendredi. |
| La preuve du 0,5 | le commit `test: estMessage` sur GitHub, et `npm test` à `fail 0`, avec vos quatre tests en plus. |
| La capture | deux images : `npm test` rouge avec `return true;`, puis vert une fois le code remis. |

## Étape 15 · Entrée envoie le message

Dans un champ de plusieurs lignes, la touche Entrée va à la ligne : pour envoyer, il faut la souris ou la touche Tab. Faites comme les messageries : Entrée envoie, Maj+Entrée va à la ligne.

Dans `public/js/app.js`, écoutez l'événement `keydown` du champ. Si `event.key` vaut `'Enter'` et que `event.shiftKey` est faux, empêchez le retour à la ligne avec `event.preventDefault()`, puis envoyez le formulaire avec `formulaire.requestSubmit()`. Cette méthode passe par votre écouteur `submit` : la validation reste la même.

C'est fini quand Entrée envoie le message, que Maj+Entrée ajoute une ligne, et que la console n'affiche aucune nouvelle erreur.

```powershell
npm run lint
npm test
git add -- public/js/app.js
git commit -m "feat: Entrée envoie le message"
git push
```

| L'étape 15 en bref | |
|---|---|
| Pourquoi | l'interface suit les habitudes des utilisateurs, et tout se fait au clavier : c'est aussi de l'accessibilité. |
| Ce que vous retenez | `requestSubmit` passe par la même validation que le bouton : un seul chemin pour envoyer, pas de code en double. |
| La preuve du 0,5 | le commit `feat: Entrée envoie le message` sur GitHub ; devant moi, Entrée envoie et Maj+Entrée va à la ligne. |
| La capture | un message de deux lignes, écrit avec Maj+Entrée, puis envoyé avec Entrée. |

## Étape 16 · Le compteur prévient avant la limite

Quand le texte atteint 90 % de votre limite, le compteur change de couleur et passe en gras. Il redevient normal après l'envoi.

Dans la fonction de `app.js` qui met le compteur à jour, ajoutez une ligne `classList.toggle('alerte', condition)` sur l'élément du compteur. La condition : la longueur du texte est supérieure ou égale à `LIMITE * 0.9`. À la fin de `public/styles.css`, donnez à `#compteur.alerte` une couleur bien lisible, par exemple `color: #b00020`, et `font-weight: 700`.

C'est fini quand le compteur change de couleur à 90 % de la limite, qu'il redevient normal après l'envoi, et que le score Lighthouse Accessibilité ne baisse pas.

```powershell
npm run lint
npm test
git add -- public/js/app.js public/styles.css
git commit -m "feat: le compteur prévient avant la limite"
git push
```

| L'étape 16 en bref | |
|---|---|
| Pourquoi | prévenir avant l'erreur vaut mieux que refuser après : l'utilisateur ajuste son message à temps. |
| Ce que vous retenez | JavaScript change l'état (une classe), CSS change l'apparence : chacun son rôle. Et une couleur se vérifie, avec Lighthouse. |
| La preuve du 0,5 | le commit `feat: le compteur prévient avant la limite` sur GitHub ; devant moi, le compteur change de couleur près de la limite. |
| La capture | le compteur en couleur, juste sous la limite, et le score Lighthouse Accessibilité. |

## Étape 17 · Les tests tournent sur GitHub à chaque push

C'est l'intégration continue, la CI. À chaque push et à chaque pull request, GitHub installe le projet sur une machine neuve, puis lance le lint et les tests. Si quelque chose casse, une croix rouge le montre à toute l'équipe.

Le fichier va à la racine du dépôt, c'est-à-dire dans le dossier parent d'`atelier`. Créez le dossier avec `New-Item -ItemType Directory -Force ..\.github\workflows`. Puis, dans VS Code, créez dans ce dossier le fichier `ci.yml`, et collez exactement ceci (les espaces du début de ligne comptent) :

```yaml
name: CI
on: [push, pull_request]

jobs:
  tests:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: atelier
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

C'est fini quand, sur GitHub, l'onglet Actions affiche votre dernier commit avec une coche verte. Une croix rouge ? Cliquez dessus : GitHub montre l'étape qui échoue, avec sa sortie.

```powershell
git add -- ../.github/workflows/ci.yml
git commit -m "ci: lint et tests à chaque push"
git push
```

| L'étape 17 en bref | |
|---|---|
| Pourquoi | les tests ne servent que s'ils tournent. La CI les lance à chaque push, sur une machine neuve, même quand on oublie. |
| Ce que vous retenez | « ça marche chez moi » ne suffit plus : la machine neuve de GitHub juge. C'est la compétence C17 de votre programme, vue dans le cours CI/CD. |
| La preuve du 0,5 | le commit `ci: lint et tests à chaque push` sur GitHub, avec une coche verte dans l'onglet Actions. |
| La capture | l'onglet Actions avec la coche verte sur votre dernier commit. |

## Étape 18 · La version 1.0.0

Le pied de page affiche « version dev », un texte écrit en dur dans `server/start.js`. La vraie version d'un projet Node est dans `package.json`, et une information ne doit être écrite qu'à un seul endroit.

Dans `server/start.js`, sous les autres `import`, ajoutez `import paquet from '../package.json' with { type: 'json' };`, puis remplacez `version: 'dev'` par `version: paquet.version`. Passez ensuite le projet en 1.0.0 avec `npm version 1.0.0 --no-git-tag-version` : cette commande met à jour `package.json` et `package-lock.json`. Enfin, redémarrez le serveur (Ctrl+C, puis `npm start`).

C'est fini quand le pied de page affiche « version 1.0.0 », et que l'étiquette `v1.0.0` apparaît sur GitHub, dans Tags, à côté du menu des branches.

```powershell
npm test
git add -- server/start.js package.json package-lock.json
git commit -m "feat: version 1.0.0"
git tag -a v1.0.0 -m "Cap Web 1.0.0"
git push
git push origin v1.0.0
```

En avance ? Sur GitHub, ouvrez Releases, puis Draft a new release. Choisissez `v1.0.0`, cliquez sur Generate release notes, puis publiez.

| L'étape 18 en bref | |
|---|---|
| Pourquoi | savoir quelle version tourne, et pouvoir revenir à une version précise grâce à son étiquette. |
| Ce que vous retenez | une information s'écrit à un seul endroit ; une version se numérote majeure.mineure.correctif, ici 1.0.0. |
| La preuve du 0,5 | le commit `feat: version 1.0.0` et l'étiquette `v1.0.0` sur GitHub ; le pied de page affiche « version 1.0.0 ». |
| La capture | le pied de page avec la version, et la page Tags de GitHub. |

## Si ça bloque

| Ce qui se passe | Ce qu'on fait |
|---|---|
| « does not provide an export named 'estMessage' » | il manque `export` devant la fonction dans `brain.js` |
| `[null]` plante encore la page | vérifiez que `app.js` est enregistré, puis rechargez avec Ctrl+F5 |
| L'onglet Actions reste vide | le fichier doit être à la racine du dépôt : `.github/workflows/ci.yml` sur GitHub, pas dans `atelier` |
| La CI échoue à `npm ci` | vérifiez la ligne `working-directory: atelier` et ses espaces |
| « needs an import attribute of "type: json" » | il manque `with { type: 'json' }` à la fin de l'import |
