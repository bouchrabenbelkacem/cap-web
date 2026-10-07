# Bilan individuel · Bouchra

## Mon niveau de départ

Au positionnement de mardi, j'étais à l'aise en structure HTML, CSS et
responsive, JavaScript, Git et tests. La gestion du DOM et des événements était
à renforcer.

## Deux acquis

- **Écrire, lire et utiliser des tests pour fiabiliser le code.** J'ai appris à
  partir d'un test rouge pour trouver le défaut, puis à vérifier la correction
  sans affaiblir le contrat. Les corrections de validation et de normalisation
  des messages sont dans `6ba515a` et `8cbda73`. J'ai aussi pratiqué l'écriture
  de tests unitaires en deux temps (rouge puis vert), consignée dans le carnet
  avec `707464c`, et la revue de code : repérer les changements qui cassent un
  contrat ou réintroduisent l'injection de HTML. Pour l'étape 11, j'ai ajouté
  des tests navigateur couvrant la panne réseau, la limite, le texte HTML et
  l'affichage mobile (`b460a00`). Enfin, j'ai corrigé le champ qui bloquait
  silencieusement la saisie au lieu de montrer l'erreur attendue (`2bdc8a5`).

- **Construire et faire évoluer une petite application web de bout en bout.**
  J'ai travaillé sur la structure des modules et leurs rôles, l'affichage du
  texte utilisateur sans l'interpréter comme du HTML, les événements du
  formulaire, la mémoire de la conversation et la gestion d'une réponse du
  serveur indisponible. J'ai également pratiqué l'adaptation mobile (`5a72fa4`),
  l'ajout de la route de conseil (`20b877a`), ainsi que le travail Git en
  branches, pull requests, relecture et fusion (`780380e`, `4e31009`). Le
  README final documente l'installation, les commandes, l'arborescence et
  l'API (`a0b3390`).

## Deux points à renforcer

- Continuer à pratiquer la manipulation du DOM et la gestion des événements
  pour gagner en autonomie.
- Approfondir les tests navigateur et le lint, et les exécuter dans un
  environnement conforme aux prérequis du projet.

## Mon objectif

Sur le prochain projet, réaliser de façon autonome une interaction complète
dans la page, de l'événement utilisateur jusqu'à l'affichage du résultat, puis
la couvrir par un test navigateur.
