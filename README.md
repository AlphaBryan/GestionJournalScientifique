# Projet de Session : Gestion de journal scientifique

## Présentation du besoin

Un journal scientifique fait appel à votre équipe pour produire une solution en Java pour la gestion
du processus de soumission et publication d’articles scientifiques soumis par des auteurs.
Les articles sont soumis par catégories pour un numéro spécifique avant la date limite de
soumission.
Les articles soumis entrent dans la phase de relecture par un comité scientifique de 3 évaluateurs.
Les articles peuvent être refusés avec commentaires, acceptés sans commentaires, acceptés avec
commentaires mineurs ou acceptés avec commentaires majeurs.

## Déploiement

Voici un guide afin de déployer le projet en local très facilement.

### Prérequis

- Docker
- Docker compose

### Lancement

Une seule ligne de commande est requise afin de lancer l'ensemble du projet.

```
docker-compose up
```

Pour lancer cette commande, il faut ouvrir un terminal dans le dossier où se situe ce fichier README.md.

C'est tout bon !

Une fois que l'ensemble des conteneurs Docker auront démarré, les services suivants seront exposés :

| Nom du service  | Port | 
| --------------- | ---- |
| Application web | 3000 |
| API             | 7800 |
| Base de données | 3306 |
| Php my admin    | 8081 |

L'application est disponible à l'adresse http://localhost:3000