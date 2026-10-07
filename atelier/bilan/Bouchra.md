# Bilan individuel · Bouchra

## Mon niveau de départ

Mardi, je me sentais déjà à l'aise avec HTML, CSS et le responsive, JavaScript, Git et les tests.
En revanche, je voulais progresser dans la manipulation du DOM et la gestion des événements.

## Deux acquis

- **Mieux tester le code et repérer les problèmes.**
 J'ai appris à partir d'un test qui échoue pour comprendre ce qui ne va pas, puis à vérifier que la correction respecte toujours le contrat. Je l'ai fait pour la validation des messages (`6ba515a`, `8cbda73`) et pour les tests unitaires en deux temps, rouge puis vert (`707464c`).
 Les exercices de revue de code m'ont aussi appris à repérer un changement qui casse un comportement attendu ou qui interprète du texte utilisateur comme du HTML.
 Pour terminer, j'ai vérifié les quatre attaques dans le navigateur (`b460a00`) et corrigé le champ qui empêchait de tester correctement la limite de caractères (`2bdc8a5`).

- **Comprendre comment les différentes parties d'une application web
  travaillent ensemble.** 
  En faisant évoluer Cap Web, j'ai vu comment le formulaire, les règles de réponse, l'affichage et le serveur se relient. J'ai aussi travaillé sur l'affichage sûr du texte saisi, la mémoire de la conversation, le comportement quand le serveur ne répond pas et l'adaptation aux petits écrans (`5a72fa4`, `20b877a`). Enfin, les branches et les pull requests m'ont permis de pratiquer le travail Git en équipe (`780380e`,`4e31009`). J'ai rassemblé les informations utiles pour installer, lancer et tester le projet dans le README (`a0b3390`).

## points à renforcer

- Je veux continuer à pratiquer le DOM et les événements pour être plus à
  l'aise quand je dois construire une interaction de A à Z.

## Mon objectif

Pour le prochain projet, je veux réaliser moi-même une interaction complète :
gérer l'action de l'utilisateur, mettre à jour la page, puis écrire un test navigateur pour vérifier que tout fonctionne.
