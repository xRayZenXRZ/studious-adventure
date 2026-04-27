# World Cup Ticketing API

API REST de réservation de billets pour la Coupe du Monde 2026.

## Objectif du projet

Ce projet a pour objectif de proposer une API permettant de consulter des informations liées à la Coupe du Monde 2026 et de gérer des réservations de billets.

L’API permet de manipuler les ressources suivantes :

- `match`
- `team`
- `country`
- `city`
- `stadium`
- `tickets`

---

## Stack technique

- **Runtime** : Bun
- **Langage** : TypeScript
- **Framework HTTP** : Hono
- **ORM** : TypeORM
- **Validation** : Zod
- **Base de données** : MariaDB
- **Outils** : Docker, Adminer

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/xRayZenXRZ/studious-adventure.git
cd studious-adventure/worldcup-ticketing-api
```

### 2. Installer les dépendances

```bash
bun install
```

---

## Configuration

Créer un fichier `.env` à partir de `.env.example`.

Exemple :

```env
NODE_ENV=development
HOST=localhost
PORT=3000
API_NAME=worldcup-ticketing-api

DB_HOST=localhost
DB_PORT=3306
DB_NAME=worldcup
DB_USER=root
DB_PASSWORD=password
```

> Adapter les valeurs si nécessaire selon votre configuration Docker.

---

## Lancer la base de données

Le projet utilise Docker pour démarrer MariaDB et Adminer.

```bash
docker compose up -d
```

### Services disponibles

- **MariaDB**
- **Adminer**

### Accès Adminer

Une fois les conteneurs démarrés, Adminer est accessible depuis le navigateur à l’adresse configurée dans le `docker-compose.yml`.

Exemple :

```txt
http://localhost:8080
```

### Informations de connexion

À adapter selon le `docker-compose.yml` :

- **Système** : MariaDB
- **Serveur** : `localhost` (nom du service Docker)
- **Utilisateur** : `root`
- **Mot de passe** : `password`
- **Base de données** : `worldcup`

---

## Lancer l’application

### Mode développement

```bash
bun run dev
```

L’API sera disponible sur :

```txt
http://localhost:3000
```

---

## Seed de la base de données

Pour injecter les données initiales :

```bash
bun run seed
```

Cette commande permet de préremplif la base avec des données de démonstration :

- pays
- villes
- stades
- équipes
- matchs
- tickets

---

## Structure du projet

Exemple de structure générale :

```txt
worldcup-ticketing-api/
├── src/
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

l’organisation interne du projet, on retrouve :

- `routes/` : définition des endpoints
- `handlers/` : gestion des requêtes HTTP
- `services/` : logique métier
- `entities/` : entités TypeORM
- `database/` : configuration BDD et seed

---

## Endpoints principaux

### Matchs

- `GET /matches` : récupérer la liste des matchs
- `GET /matches/:id` : récupérer le détail d’un match

### Équipes

- `GET /teams` : récupérer la liste des équipes
- `GET /teams/:id` : récupérer le détail d’une équipe

### Pays

- `GET /countries` : récupérer la liste des pays

### Villes

- `GET /cities` : récupérer la liste des villes

### Stades

- `GET /stadiums` : récupérer la liste des stades

### Tickets

- `GET /tickets` : récupérer la liste des réservatio
- `GET /tickets/:id` : récupérer le détail d’une réservation
- `POST /tickets` : créer une réservation

---

## Exemple de requête

### Créer une réservation

```http
POST /tickets
Content-Type: application/json
```

```json
{
  "matchId": 1,
  "seat": "A12",
  "customer": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@doe.com"
  }
}
```

### Exemple de réponse

```json
{
  "matchId": 1,
  "seat": "A12",
  "customer": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@doe.com"
  }
}
```

---

## Gestion des erreurs

L’API doit retourner des statuts HTTP cohérents selon les cas :

- `200 OK` : requête réussie
- `201 Created` : ressource créée
- `204 No Content` : suppression réussie
- `400 Bad Request` : données invalides
- `404 Not Found` : ressource inexistante
- `409 Conflict` : conflit métier, par exemple plus assez de places
- `500 Internal Server Error` : erreur interne du serveur

Exemple d’erreur :

```json
{"error"}
```

---

## Validation

La validation des entrées est réalisée avec **Zod**.

Elle permet de contrôler :

- les données envoyées dans le body
- les paramètres d’URL
- les champs obligatoires
- les quantités de billets
- les formats invalides

---

## Tests de l’API

Le projet est testé à l’aide :

- de **Bruno**
- d’**Adminer** pour vérifier les données en base

---

## Axes d’amélioration possibles

Plusieurs améliorations peuvent encore être apportées au projet :

- renforcer la logique métier de réservation
- mieux gérer les places restantes
- uniformiser les réponses JSON
- améliorer la gestion centralisée des erreurs
- améliorer les validations Zod

---

## Auteur / Groupe

- ALTANTUYA
- Tsogt-Erdene
- L2 MIASHS

---
