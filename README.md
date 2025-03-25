# Descriptif du Projet GSBNext

## Vue d'ensemble

GSBNext est une application moderne développée avec Next.js pour la gestion des activités du laboratoire pharmaceutique GSB (Galaxy Swiss Bourdin). L'application permet de gérer les visites médicales, les médicaments, les médecins et les rapports de visite. Ce système facilite le suivi des activités des visiteurs médicaux auprès des professionnels de santé.

## Structure de la base de données

Le projet s'appuie sur une base de données PostgreSQL, gérée via Prisma ORM avec les modèles suivants:

### Entités principales

1. **Visiteur médical** (`visiteur`)

   - Représente les employés de GSB chargés de visiter les médecins
   - Dispose d'informations d'authentification (login, mdp, ticket)
   - Contient des informations personnelles et professionnelles

2. **Médecin** (`medecin`)

   - Professionnel de santé visité par les représentants de GSB
   - Caractérisé par ses coordonnées et sa spécialité
   - Rattaché à un département géographique

3. **Médicament** (`medicament`)

   - Produits pharmaceutiques commercialisés par GSB
   - Organisés par familles thérapeutiques
   - Contient les informations techniques (composition, effets, contre-indications)

4. **Rapport de visite** (`rapport`)

   - Document créé à chaque visite d'un visiteur médical chez un médecin
   - Contient le motif et le bilan de la visite
   - Permet de suivre les échantillons de médicaments offerts

5. **Famille de médicaments** (`famille`)
   - Classification des médicaments par catégorie thérapeutique

### Relations entre les entités

- Un visiteur médical peut rédiger plusieurs rapports de visite
- Un médecin peut être associé à plusieurs rapports de visite
- Un rapport de visite est associé à un seul médecin et un seul visiteur
- Un médicament appartient à une seule famille de médicaments
- Des échantillons de médicaments peuvent être offerts lors d'une visite (relation `offrir`)

## Schéma conceptuel des données

```
+-------------+       +-------------+       +-------------+
|   VISITEUR  |------>|   RAPPORT   |<------|   MEDECIN   |
+-------------+       +-------------+       +-------------+
                            |
                            |
                            v
+-------------+       +-------------+       +-------------+
|   FAMILLE   |<------|  MEDICAMENT |<------|   OFFRIR    |
+-------------+       +-------------+       +-------------+
```

## Fonctionnalités probables du système

1. **Gestion des utilisateurs**

   - Authentification sécurisée des visiteurs médicaux
   - Gestion des profils et informations personnelles

2. **Gestion des médecins**

   - Enregistrement et mise à jour des informations des médecins
   - Recherche et filtrage par département ou spécialité

3. **Gestion des médicaments**

   - Organisation par familles thérapeutiques
   - Documentation des effets et contre-indications

4. **Rapports de visite**

   - Création de rapports après chaque visite médicale
   - Suivi des médicaments présentés et échantillons offerts
   - Analyse des motifs et résultats des visites

5. **Tableau de bord et statistiques**
   - Visualisation de l'activité des visiteurs médicaux
   - Répartition géographique des visites
   - Suivi des médicaments les plus présentés

## Technologies utilisées

- **Frontend**: Next.js (framework React)
- **Backend**: API Routes de Next.js ou serveur séparé
- **ORM**: Prisma avec preview feature "relationJoins"
- **Base de données**: PostgreSQL
- **Authentification**: Système de tokens personnalisé (timespan et ticket)

## Sécurité et conformité

Le système semble prévoir un stockage sécurisé des mots de passe (VARCHAR(100) suffisant pour des hachages) et un mécanisme d'authentification par tickets, conforme aux exigences d'une application médicale manipulant des données sensibles.

## Perspectives d'évolution

1. Implémentation d'un système de géolocalisation pour optimiser les tournées des visiteurs
2. Module d'analyse prédictive pour suggérer les médecins à visiter en priorité
3. Interface mobile pour les visiteurs sur le terrain
4. Intégration avec d'autres systèmes d'information de l'entreprise

# Intallation du projet

1. Cloner le projet via `git clone https://github.com/Ykolo/GSBNext.git`
2. Installer pnpm (`npm install -g pnpm`)
3. Installer les dépendances du projet (`pnpm install`)
4. Créer la base de données (`correspondant à la base données en postgresql dans le fichier .env`)
5. Exécuter les scripts SQL (`gsbrapportspsql.sql`)
6. Lancer le serveur de développement (`pnpm dev`)

## Si il y a des problèmes n'hésitez pas à me contacter
