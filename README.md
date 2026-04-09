# glowing-computing-machine

Projet de Technologie Web Avancée 2025-2026.

## Bienvenue

What the project does ?
> Création d'une **application web Back End** et son **API REST** pour la billetterie en ligne de la Coupe du Monde Football.

Why the project is useful ?
> Un projet de développement permettant d'acquiérir les bases d'un developpement web UX ainsi que son API REST.

How users can get started with the project ?
> Une documentation en PDF sera fourni : <sub> Join here link to documentation (pdf) </sub>

Where user can get help with your project ?
> Vous pouvez me contacter sur Github directement.

Who maintains and contributes to the project ?
> Une fois le project complete celle-ci ne serais plus maintenu. Les contributeurs à ce project son : <sub> Join names of all contributers </sub>

Remarque :

- Projet universitaire, ainsi tous les droits sont réservé à l'université de lorraine ainsi que l'IDMC.
- Structure Github inspirée de la [documentation github](https://github.com/skills/introduction-to-repository-management)

## Spécification fonctionnelles

### Utilisateur et Cas d'utilisation

**Anonymes** :
> création de compte client, consultation du calendrier des matchs
(équipes, localisation, date et horaire), du prix des tickets, du nombre de places restantes…

**Clients authentifiés** :
>fonctionnalités identiques aux internautes anonymes + authentification, commande de tickets et consultation des tickets achetés.

**L'API ne s'adressera pas aux utilisateurs back office**
>(les données seront saisies manuellement dans la base de données ou via des scripts de génération de données).

## Ressources et services exposés

*L'API REST* exposera plusieurs endpoints pour les ressources et services suivants :

- Match
- Team
- Country
- City
- Stadium
- Reservation
- Auth

## Securisation des endspoints

La ressource **reservation** sera associée à des endpoints privés, nécessitant la communication d'un jeton d'authentification ou d'une clé d'API.

L'authentification et l'obtention du jeton s'effectueront via le service Auth.

## Base de données

Dans le cadre du cours de Bases de données enseigné par M. Gilles Halin au semestre 3, vous avez modélisé une base de données relationnelles et intégré des données de test en
lien avec le sujet. Ce travail servira de base pour ce projet (des adaptations seront
nécessaires).

## Specification Techniques

Voir fichier Text `requirement.txt`
